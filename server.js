import express from 'express';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к PostgreSQL
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Настройка Gemini (только на сервере!)
let ai = null;
if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log('✅ Gemini API инициализирован');
} else {
    console.warn('⚠️ GEMINI_API_KEY не задан. ИИ-функции отключены.');
}

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Rate limiting для API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // 100 запросов с одного IP
    message: { error: 'Слишком много запросов. Попробуйте позже.' }
});

const explainLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 минута
    max: 10, // 10 объяснений в минуту
    message: { error: 'Превышен лимит на объяснения. Подождите минуту.' }
});

app.use('/api/', apiLimiter);

// --- API ЭНДПОИНТЫ ---

// 1. Поиск по законодательству
app.get('/api/search', async (req, res) => {
    try {
        const { q, category, limit = 20, offset = 0 } = req.query;
        
        if (!q || q.trim().length < 2) {
            return res.status(400).json({ error: 'Введите поисковый запрос (минимум 2 символа)' });
        }

        const client = await pool.connect();
        try {
            let queryText = '';
            let queryParams = [];
            
            // Поиск по номеру статьи (точное совпадение) или полнотекстовый
            if (/^\d+\.?\d*$/.test(q.trim())) {
                // Похоже на номер статьи
                queryText = `
                    SELECT a.*, d.title as document_title, d.abbreviation, d.status as doc_status
                    FROM legal_articles a
                    JOIN legal_documents d ON a.document_id = d.id
                    WHERE a.article_number = $1
                    ORDER BY a.article_number
                    LIMIT $2 OFFSET $3
                `;
                queryParams = [q.trim(), limit, offset];
            } else {
                // Полнотекстовый поиск с ранжированием
                queryText = `
                    SELECT a.*, d.title as document_title, d.abbreviation, d.status as doc_status,
                           ts_rank(a.content_tsv, plainto_tsquery('russian', $1)) as rank
                    FROM legal_articles a
                    JOIN legal_documents d ON a.document_id = d.id
                    WHERE a.content_tsv @@ plainto_tsquery('russian', $1)
                       OR a.article_title ILIKE '%' || $1 || '%'
                    ORDER BY rank DESC, a.article_number
                    LIMIT $2 OFFSET $3
                `;
                queryParams = [q, limit, offset];
            }

            const result = await client.query(queryText, queryParams);
            
            // Сохраняем историю поиска
            await client.query(
                'INSERT INTO search_history (query, results_count) VALUES ($1, $2)',
                [q, result.rows.length]
            );

            res.json({
                results: result.rows,
                total: result.rows.length,
                query: q
            });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Ошибка поиска. Попробуйте позже.' });
    }
});

// 2. Получение документа и его статей
app.get('/api/documents/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        try {
            const docResult = await client.query(
                'SELECT * FROM legal_documents WHERE id = $1',
                [req.params.id]
            );
            
            if (docResult.rows.length === 0) {
                return res.status(404).json({ error: 'Документ не найден' });
            }

            const articlesResult = await client.query(
                `SELECT id, article_number, article_title, chapter, section, status 
                 FROM legal_articles WHERE document_id = $1 
                 ORDER BY id`,
                [req.params.id]
            );

            res.json({
                document: docResult.rows[0],
                articles: articlesResult.rows
            });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Document error:', err);
        res.status(500).json({ error: 'Ошибка загрузки документа' });
    }
});

// 3. Получение конкретной статьи
app.get('/api/articles/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        try {
            const result = await client.query(
                `SELECT a.*, d.title as document_title, d.abbreviation, d.status as doc_status,
                        d.source_url as document_source_url, d.last_checked
                 FROM legal_articles a
                 JOIN legal_documents d ON a.document_id = d.id
                 WHERE a.id = $1`,
                [req.params.id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Статья не найдена' });
            }

            res.json(result.rows[0]);
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Article error:', err);
        res.status(500).json({ error: 'Ошибка загрузки статьи' });
    }
});

// 4. Объяснение статьи через Gemini (безопасный серверный вызов)
app.post('/api/explain', explainLimiter, async (req, res) => {
    try {
        const { articleId, articleText, articleTitle, documentTitle } = req.body;

        if (!articleText || !articleTitle) {
            return res.status(400).json({ error: 'Не переданы текст и заголовок статьи' });
        }

        if (!ai) {
            return res.status(503).json({ 
                error: 'ИИ временно недоступен. Администратор не настроил GEMINI_API_KEY.' 
            });
        }

        // Ограничиваем размер текста для передачи в Gemini
        const truncatedText = articleText.substring(0, 15000);

        const prompt = `Ты — профессиональный юридический ассистент. Объясни простыми словами следующую статью из законодательства РФ.

Документ: ${documentTitle || 'Неизвестный документ'}
Статья: ${articleTitle}

Оригинальный текст статьи:
"""
${truncatedText}
"""

Твоя задача:
1. Объясни, что регулирует эта статья.
2. Какие условия и исключения предусмотрены.
3. От чего зависит применение нормы.
4. Какие связанные статьи могут иметь значение.
5. Если в тексте есть неопределённости или требуется больше фактов, укажи на это.

ВАЖНО:
- Не выдумывай факты, которых нет в тексте.
- Чётко отделяй оригинальный текст от твоего объяснения.
- В конце добавь: "Это объяснение носит информационный характер и не заменяет профессиональную юридическую консультацию."`;

        const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
            contents: prompt,
        });

        const explanation = response.text;

        res.json({
            explanation,
            disclaimer: 'Это объяснение носит информационный характер и не заменяет профессиональную юридическую консультацию.'
        });
    } catch (err) {
        console.error('Gemini error:', err);
        res.status(500).json({ error: 'Ошибка при обращении к ИИ. Попробуйте позже.' });
    }
});

// 5. Проверка статуса сервера
app.get('/api/health', async (req, res) => {
    try {
        const client = await pool.connect();
        await client.query('SELECT 1');
        client.release();
        res.json({ 
            status: 'ok', 
            database: 'connected',
            gemini: ai ? 'configured' : 'not_configured'
        });
    } catch (err) {
        res.status(500).json({ status: 'error', database: 'disconnected' });
    }
});

// 6. Статистика для дашборда
app.get('/api/stats', async (req, res) => {
    try {
        const client = await pool.connect();
        try {
            const docsCount = await client.query('SELECT COUNT(*) FROM legal_documents');
            const articlesCount = await client.query('SELECT COUNT(*) FROM legal_articles');
            const lastUpdate = await client.query(
                'SELECT MAX(updated_at) as last_update FROM document_updates WHERE status = $1',
                ['success']
            );
            
            res.json({
                documents: parseInt(docsCount.rows[0].count),
                articles: parseInt(articlesCount.rows[0].count),
                lastUpdate: lastUpdate.rows[0].last_update
            });
        } finally {
            client.release();
        }
    } catch (err) {
        res.status(500).json({ error: 'Ошибка получения статистики' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер ПРАВОСФЕРА запущен на http://localhost:${PORT}`);
});

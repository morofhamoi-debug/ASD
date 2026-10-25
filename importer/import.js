import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
});

// ВАЖНО: Этот импортер загружает РЕАЛЬНЫЕ данные из JSON-файла,
// который вы должны предварительно получить из ОФИЦИАЛЬНОГО источника.
// 
// Для УК РФ:
// 1. Скачайте официальный текст с портала pravo.gov.ru или publication.pravo.gov.ru
// 2. Конвертируйте его в структурированный JSON формат (см. пример ниже)
// 3. Поместите файл в importer/ukrf.json
//
// Структура JSON:
// {
//   "title": "Уголовный кодекс Российской Федерации",
//   "abbreviation": "УК РФ",
//   "document_type": "code",
//   "adopted_date": "1996-06-13",
//   "document_number": "63-ФЗ",
//   "source_url": "http://pravo.gov.ru/...",
//   "current_revision": "от 04.08.2026",
//   "articles": [
//     {
//       "article_number": "1",
//       "article_title": "Уголовное законодательство Российской Федерации",
//       "chapter": "Глава 1. Задачи и принципы Уголовного кодекса Российской Федерации",
//       "section": "Раздел I. Уголовный закон",
//       "content": "1. Уголовное законодательство Российской Федерации состоит из настоящего Кодекса...",
//       "status": "active"
//     }
//   ]
// }

async function importData() {
    const jsonPath = path.join(__dirname, 'ukrf.json');
    
    if (!fs.existsSync(jsonPath)) {
        console.error('❌ Файл importer/ukrf.json не найден.');
        console.log('');
        console.log('Для загрузки реального УК РФ:');
        console.log('1. Получите официальный текст с https://pravo.gov.ru/');
        console.log('2. Создайте JSON-файл по структуре из комментария выше');
        console.log('3. Поместите его в importer/ukrf.json');
        console.log('4. Запустите npm run import');
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Создаём источник
        const sourceResult = await client.query(
            `INSERT INTO legal_sources (name, url, description) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (url) DO UPDATE SET last_checked = NOW()
             RETURNING id`,
            ['Официальный интернет-портал правовой информации', 'http://pravo.gov.ru/', 'pravo.gov.ru']
        );
        const sourceId = sourceResult.rows[0].id;

        // 2. Создаём документ
        const docResult = await client.query(
            `INSERT INTO legal_documents 
             (source_id, title, document_type, abbreviation, adopted_date, document_number, 
              source_url, current_revision, status, last_checked)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
             ON CONFLICT (external_id) DO UPDATE SET
                title = EXCLUDED.title,
                current_revision = EXCLUDED.current_revision,
                last_checked = NOW()
             RETURNING id`,
            [
                sourceId,
                data.title,
                data.document_type,
                data.abbreviation,
                data.adopted_date,
                data.document_number,
                data.source_url,
                data.current_revision,
                'active'
            ]
        );
        const documentId = docResult.rows[0].id;

        // 3. Загружаем статьи
        let importedCount = 0;
        for (const article of data.articles) {
            await client.query(
                `INSERT INTO legal_articles 
                 (document_id, article_number, article_title, chapter, section, content, status, revision_date)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    documentId,
                    article.article_number,
                    article.article_title,
                    article.chapter || null,
                    article.section || null,
                    article.content,
                    article.status || 'active',
                    article.revision_date || null
                ]
            );
            importedCount++;
        }

        // 4. Записываем в историю обновлений
        await client.query(
            `INSERT INTO document_updates (document_id, status, message) 
             VALUES ($1, $2, $3)`,
            [documentId, 'success', `Импортировано статей: ${importedCount}`]
        );

        await client.query('COMMIT');

        console.log(`✅ Импорт завершён успешно!`);
        console.log(`   Документ: ${data.title}`);
        console.log(`   Статей загружено: ${importedCount}`);
        console.log(`   Источник: ${data.source_url}`);

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Ошибка импорта:', err.message);
        
        // Логируем ошибку
        try {
            const docResult = await pool.query('SELECT id FROM legal_documents WHERE title LIKE $1 LIMIT 1', [data.title]);
            if (docResult.rows.length > 0) {
                await pool.query(
                    `INSERT INTO document_updates (document_id, status, message) VALUES ($1, $2, $3)`,
                    [docResult.rows[0].id, 'failed', err.message]
                );
            }
        } catch (logErr) {
            console.error('Не удалось записать ошибку в журнал:', logErr.message);
        }
        
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

importData();

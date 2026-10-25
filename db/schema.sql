-- Миграция схемы базы данных для ПРАВОСФЕРА
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS legal_sources (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    description TEXT,
    last_checked TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS legal_documents (
    id SERIAL PRIMARY KEY,
    source_id INTEGER REFERENCES legal_sources(id),
    external_id TEXT UNIQUE,
    title TEXT NOT NULL,
    document_type TEXT NOT NULL, -- 'code', 'federal_law', 'constitution', etc.
    abbreviation TEXT,
    adopted_date DATE,
    document_number TEXT,
    official_published_date DATE,
    effective_date DATE,
    expiration_date DATE,
    status TEXT DEFAULT 'active', -- 'active', 'repealed', 'suspended'
    current_revision TEXT,
    source_url TEXT,
    last_checked TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS legal_articles (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES legal_documents(id) ON DELETE CASCADE,
    article_number TEXT NOT NULL, -- "158.1", "228.1"
    article_title TEXT NOT NULL,
    chapter TEXT,
    section TEXT,
    content TEXT NOT NULL, -- Оригинальный текст
    content_tsv TSVECTOR,
    status TEXT DEFAULT 'active', -- 'active', 'repealed'
    notes TEXT,
    revision_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_updates (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES legal_documents(id) ON DELETE CASCADE,
    status TEXT NOT NULL, -- 'success', 'failed'
    message TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS search_history (
    id SERIAL PRIMARY KEY,
    query TEXT NOT NULL,
    results_count INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы для поиска
CREATE INDEX IF NOT EXISTS idx_legal_documents_title_trgm ON legal_documents USING GIN (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_legal_articles_content_tsv ON legal_articles USING GIN (content_tsv);
CREATE INDEX IF NOT EXISTS idx_legal_articles_number ON legal_articles(article_number);
CREATE INDEX IF NOT EXISTS idx_legal_articles_document_id ON legal_articles(document_id);

-- Триггер для автоматического обновления tsvector
CREATE OR REPLACE FUNCTION update_content_tsv() RETURNS TRIGGER AS $$
BEGIN
    NEW.content_tsv := to_tsvector('russian', NEW.content);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_content_tsv
    BEFORE INSERT OR UPDATE ON legal_articles
    FOR EACH ROW EXECUTE FUNCTION update_content_tsv();

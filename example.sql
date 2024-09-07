-- USER
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONTENT
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    url_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES  users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(255)
);

CREATE TABLE histories (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    historical_context TEXT
);

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    background TEXT,
    role VARCHAR(255)
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    historical_significance TEXT,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6)
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    usage TEXT,
    origin TEXT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE characters_locations (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE items_locations (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE articles_references (
    id SERIAL PRIMARY KEY,
    source_article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    referenced_article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    CONSTRAINT unique_reference UNIQUE (source_article_id, referenced_article_id)
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_article_timestamp
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();


CREATE INDEX idx_article_url_id ON articles(url_id);
CREATE INDEX idx_article_title ON articles(title);
CREATE INDEX idx_article_type ON articles(type);
CREATE INDEX idx_character_location_character_id ON characters_locations(character_id);
CREATE INDEX idx_character_location_location_id ON characters_locations(location_id);
CREATE INDEX idx_item_location_item_id ON items_locations(item_id);
CREATE INDEX idx_item_location_location_id ON items_locations(location_id);
CREATE UNIQUE INDEX idx_article_references_unique ON articles_references(source_article_id, referenced_article_id);
CREATE INDEX idx_history_article_id ON histories(article_id);
CREATE INDEX idx_character_article_id ON characters(article_id);
CREATE INDEX idx_location_article_id ON locations(article_id);
CREATE INDEX idx_item_article_id ON items(article_id);
CREATE INDEX idx_user_username ON users(username);
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_comment_article_id ON comments(article_id);
CREATE INDEX idx_comment_user_id ON comments(user_id);

CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Reset
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO <your_db_username>;
GRANT ALL ON SCHEMA public TO public;
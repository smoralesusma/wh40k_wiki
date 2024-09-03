CREATE TABLE article (
    id SERIAL PRIMARY KEY,
    url_id VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(255)
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES article(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    historical_context TEXT
);

CREATE TABLE character (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES article(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    background TEXT,
    role VARCHAR(255)
);

CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES article(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location_description TEXT,
    historical_significance TEXT,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6)
);

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES article(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    usage TEXT,
    origin TEXT
);

CREATE TABLE character_location (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES character(id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES location(id) ON DELETE CASCADE
);

CREATE TABLE item_location (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES item(id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES location(id) ON DELETE CASCADE
);

CREATE TABLE article_references (
    id SERIAL PRIMARY KEY,
    source_article_id INTEGER REFERENCES article(id) ON DELETE CASCADE,
    referenced_article_id INTEGER REFERENCES article(id) ON DELETE CASCADE,
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
BEFORE UPDATE ON article
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();


CREATE INDEX idx_article_url_id ON article(url_id);
CREATE INDEX idx_article_title ON article(title);
CREATE INDEX idx_article_type ON article(type);
CREATE INDEX idx_character_location_character_id ON character_location(character_id);
CREATE INDEX idx_character_location_location_id ON character_location(location_id);
CREATE INDEX idx_item_location_item_id ON item_location(item_id);
CREATE INDEX idx_item_location_location_id ON item_location(location_id);
CREATE UNIQUE INDEX idx_article_references_unique ON article_references(source_article_id, referenced_article_id);
CREATE INDEX idx_history_article_id ON history(article_id);
CREATE INDEX idx_character_article_id ON character(article_id);
CREATE INDEX idx_location_article_id ON location(article_id);
CREATE INDEX idx_item_article_id ON item(article_id);


-- USERS
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

ALTER TABLE article ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES article(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_comments_article_id ON comments(article_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
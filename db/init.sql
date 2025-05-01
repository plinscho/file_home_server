\c home_server

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username    VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(100) NOT NULL
);

CREATE TABLE data (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(100),
    file_size INT CHECK (file_size >= 0),
    date_upload TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    file_description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_data_user_id ON data(user_id);

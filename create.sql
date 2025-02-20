CREATE TABLE categories (
category_id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL
);
CREATE TABLE authors (
author_id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
birth_date DATE
);
CREATE TABLE books (
book_id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
isbn VARCHAR(13) NOT NULL,
publish_year INTEGER NOT NULL,
available_copies INTEGER NOT NULL,
cover_url VARCHAR(255),
borrow_count INTEGER DEFAULT 0,
author_id BIGINT NOT NULL,
category_id BIGINT NOT NULL,
FOREIGN KEY (author_id) REFERENCES authors(author_id),
FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
username VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role VARCHAR(20) NOT NULL,
phone VARCHAR(20)
);
CREATE TABLE tokens (
id SERIAL PRIMARY KEY,
token VARCHAR(255) NOT NULL,
username VARCHAR(255) NOT NULL,
created_at TIMESTAMP NOT NULL,
expires_at TIMESTAMP NOT NULL,
revoked BOOLEAN DEFAULT FALSE,
expired BOOLEAN DEFAULT FALSE
);
CREATE TABLE borrows (
borrow_id SERIAL PRIMARY KEY,
borrow_date DATE NOT NULL,
return_date DATE,
due_date DATE,
user_id BIGINT NOT NULL,
book_id BIGINT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (book_id) REFERENCES books(book_id)
);
INSERT INTO users (name, email, username, password, role, phone) VALUES
('Admin User', 'admin@library.com', 'admin', '$2a$10$eQn6/xL195vSuCOuQuejquCejtVP3gRXdXiHWO40taQxdD0OzhfYS', 'ADMIN', '1234567890')

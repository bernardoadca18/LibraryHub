CREATE TABLE categories (
    category_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE authors (
    author_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    birth_date DATE
);

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(255)
);

CREATE TABLE books (
    book_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(255) NOT NULL,
    publish_year INTEGER NOT NULL,
    available_copies INTEGER NOT NULL,
    cover_url VARCHAR(255),
    borrow_count INTEGER,
    author_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(author_id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255),
    username VARCHAR(255),
    created_at TIMESTAMP,
    expires_at TIMESTAMP,
    revoked BOOLEAN NOT NULL,
    expired BOOLEAN NOT NULL
);

CREATE TABLE borrows (
    borrow_id BIGSERIAL PRIMARY KEY,
    borrow_date DATE NOT NULL,
    due_date DATE,
    return_date DATE,
    book_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES books(book_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (name, email, username, password, role, phone) VALUES 
('Admin User', 'admin@library.com', 'admin', '$2a$10$eQn6/xL195vSuCOuQuejquCejtVP3gRXdXiHWO40taQxdD0OzhfYS', 'ADMIN', '1234567890')
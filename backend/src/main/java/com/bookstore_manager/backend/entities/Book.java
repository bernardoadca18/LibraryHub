package com.bookstore_manager.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long bookId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "isbn", nullable = false)
    private String isbn;

    @Column(name = "publish_year", nullable = false)
    private Integer publishYear;

    @Column(name = "available_copies", nullable = false)
    private Integer availableCopies;

    @Column(name = "cover_url")
    private String coverUrl;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private Author author;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "borrow_count")
    private Integer borrowCount;

    public Book() {
    }

    public Book(Long bookId, String title, String isbn, Integer publishYear, Integer availableCopies, String coverUrl, Author author, Category category) {
        this.bookId = bookId;
        this.title = title;
        this.isbn = isbn;
        this.publishYear = publishYear;
        this.availableCopies = availableCopies;
        this.coverUrl = coverUrl;
        this.author = author;
        this.category = category;
        this.borrowCount = 0;
    }

    public Book(String title, String isbn, Integer publishYear, Integer availableCopies, String coverUrl, Author author, Category category) {
        this.title = title;
        this.isbn = isbn;
        this.publishYear = publishYear;
        this.availableCopies = availableCopies;
        this.coverUrl = coverUrl;
        this.author = author;
        this.category = category;
        this.borrowCount = 0;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getPublishYear() {
        return publishYear;
    }

    public void setPublishYear(Integer publishYear) {
        this.publishYear = publishYear;
    }

    public Integer getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(Integer availableCopies) {
        this.availableCopies = availableCopies;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    // Getters e Setters
    public Integer getBorrowCount() {
        return borrowCount;
    }

    public void setBorrowCount(Integer borrowCount) {
        this.borrowCount = borrowCount;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((isbn == null) ? 0 : isbn.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        Book other = (Book) obj;
        if (isbn == null) {
            if (other.isbn != null) {
                return false;
            }
        } else if (!isbn.equals(other.isbn)) {
            return false;
        }
        return true;
    }

}

package com.bookstore_manager.backend.dto;

import com.bookstore_manager.backend.entities.Book;
import com.bookstore_manager.backend.projections.BookMinProjection;

public class BookDTO {

    private Long bookId;
    private String title;
    private String isbn;
    private Integer publishYear;
    private Integer availableCopies;
    private String coverUrl;
    private Long authorId;
    private Long categoryId;
    private String authorName;
    private String categoryName;

    public BookDTO() {
    }

    public BookDTO(Book entity) {
        this.bookId = entity.getBookId();
        this.title = entity.getTitle();
        this.isbn = entity.getIsbn();
        this.publishYear = entity.getPublishYear();
        this.availableCopies = entity.getAvailableCopies();
        this.coverUrl = entity.getCoverUrl();
        this.authorId = entity.getAuthor().getAuthorId();
        this.categoryId = entity.getCategory().getCategoryId();
        this.authorName = entity.getAuthor().getName();
        this.categoryName = entity.getCategory().getName();
    }

    public BookDTO(BookMinProjection projection) {
        this.bookId = projection.getId();
        this.title = projection.getTitle();
        this.isbn = projection.getIsbn();
        this.publishYear = projection.getPublishYear();
        this.availableCopies = projection.getAvailableCopies();
        this.coverUrl = projection.getCoverUrl();
        this.authorId = projection.getAuthorId();
        this.categoryId = projection.getCategoryId();
        this.authorName = projection.getAuthorName();
        this.categoryName = projection.getCategoryName();

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

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

}

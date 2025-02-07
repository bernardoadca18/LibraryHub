package com.bookstore_manager.backend.dto;

import java.time.LocalDateTime;

import com.bookstore_manager.backend.entities.Rating;

public class RatingDTO {

    private Long id;
    private Long userId;
    private Long bookId;
    private Integer rating;
    private String createdAt;

    public RatingDTO() {
    }

    public RatingDTO(Long id, Long userId, Long bookId, Integer rating, String createdAt) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.rating = rating;
        this.createdAt = createdAt;
    }

    public RatingDTO(Long userId, Long bookId, Integer rating) {
        if (userId == null || bookId == null || rating == null) {
            throw new IllegalArgumentException("Todos os campos são obrigatórios");
        }
        this.userId = userId;
        this.bookId = bookId;
        this.rating = rating;
        this.createdAt = LocalDateTime.now().toString();
    }

    public RatingDTO(Rating entity) {
        this.id = entity.getId();
        this.userId = entity.getUser().getUserId();
        this.bookId = entity.getBook().getBookId();
        this.rating = entity.getRating();
        this.createdAt = entity.getCreatedAt().toString();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}

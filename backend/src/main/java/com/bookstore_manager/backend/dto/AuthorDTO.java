package com.bookstore_manager.backend.dto;

import java.time.LocalDate;

import com.bookstore_manager.backend.entities.Author;

public class AuthorDTO {

    private Long authorId;
    private String name;
    private LocalDate birthDate;

    public AuthorDTO() {
    }

    public AuthorDTO(Author entity) {
        this.authorId = entity.getAuthorId();
        this.name = entity.getName();
        this.birthDate = entity.getBirthDate();
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

}

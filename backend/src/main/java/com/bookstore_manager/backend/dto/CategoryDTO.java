package com.bookstore_manager.backend.dto;

import com.bookstore_manager.backend.entities.Category;

public class CategoryDTO {

    private Long categoryId;
    private String name;

    public CategoryDTO() {
    }

    public CategoryDTO(Category entity) {
        this.categoryId = entity.getCategoryId();
        this.name = entity.getName();
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

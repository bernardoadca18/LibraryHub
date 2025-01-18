package com.bookstore_manager.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore_manager.backend.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}

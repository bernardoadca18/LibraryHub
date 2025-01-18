package com.bookstore_manager.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore_manager.backend.entities.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

}

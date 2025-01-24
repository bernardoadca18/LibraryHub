package com.bookstore_manager.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.bookstore_manager.backend.entities.Author;

public interface AuthorRepository extends JpaRepository<Author, Long>, JpaSpecificationExecutor<Author> {

    @Query("SELECT COUNT(a) FROM Author a")
    Long getAuthorCount();
}

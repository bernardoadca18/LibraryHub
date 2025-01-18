package com.bookstore_manager.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookstore_manager.backend.entities.Book;
import com.bookstore_manager.backend.projections.BookMinProjection;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(nativeQuery = true, value = """
    SELECT b.book_id AS id, 
           b.title AS title, 
           b.isbn AS isbn, 
           b.publish_year AS publishYear, 
           b.available_copies AS availableCopies, 
           b.cover_url AS coverUrl, 
           b.category_id AS categoryId, 
           b.author_id AS authorId, 
           a.name AS authorName,
           c.name AS categoryName
    FROM books AS b
    LEFT JOIN authors AS a ON b.author_id = a.author_id
    LEFT JOIN categories AS c ON b.category_id = c.category_id
    WHERE b.category_id = :categoryId
    ORDER BY b.title
""")
    List<BookMinProjection> findByCategoryId(Long categoryId);

    @Query(nativeQuery = true, value = """
    SELECT b.book_id AS id, 
           b.title AS title, 
           b.isbn AS isbn, 
           b.publish_year AS publishYear, 
           b.available_copies AS availableCopies, 
           b.cover_url AS coverUrl, 
           b.category_id AS categoryId, 
           b.author_id AS authorId, 
           a.name AS authorName,
           c.name AS categoryName
    FROM books AS b
    LEFT JOIN authors AS a ON b.author_id = a.author_id
    LEFT JOIN categories AS c ON b.category_id = c.category_id
    WHERE b.author_id = :authorId
    ORDER BY b.title
""")
    List<BookMinProjection> findByAuthorId(Long authorId);

    //
    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<BookMinProjection> searchByTitle(String searchTerm);

    @Query("SELECT b FROM Book b WHERE b.availableCopies > 0")
    List<BookMinProjection> findAvailableBooks();

    @Query("SELECT b FROM Book b ORDER BY b.publishYear DESC")
    List<BookMinProjection> findLatestBooks();

    @Query("SELECT DISTINCT b.publishYear FROM Book b ORDER BY b.publishYear DESC")
    List<Integer> findAllPublishYears();
}

package com.bookstore_manager.backend.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.bookstore_manager.backend.entities.Book;
import com.bookstore_manager.backend.projections.BookMinProjection;
import com.bookstore_manager.backend.projections.CategoryCountProjection;

public interface BookRepository extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {

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
           c.name AS categoryName,
           AVG(r.rating) AS averageRating,
           COUNT(r.rating) AS ratingCount
    FROM books AS b
    LEFT JOIN authors AS a ON b.author_id = a.author_id
    LEFT JOIN categories AS c ON b.category_id = c.category_id
    LEFT JOIN ratings AS r ON b.book_id = r.book_id
    WHERE b.category_id = :categoryId
    GROUP BY b.book_id
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
           c.name AS categoryName,
           AVG(r.rating) AS averageRating,
           COUNT(r.rating) AS ratingCount
    FROM books AS b
    LEFT JOIN authors AS a ON b.author_id = a.author_id
    LEFT JOIN categories AS c ON b.category_id = c.category_id
    LEFT JOIN ratings AS r ON b.book_id = r.book_id
    WHERE b.author_id = :authorId
    GROUP BY b.book_id
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

    //
    @Query("SELECT COUNT(b) FROM Book b WHERE b.availableCopies > :copies")
    Long countByAvailableCopiesGreaterThan(int copies);

    @Query("SELECT b.category.name as category, COUNT(b) as count FROM Book b GROUP BY b.category.name")
    List<CategoryCountProjection> countByCategory();

    @Query("SELECT COUNT(b) FROM Book b")
    Long getBookCount();

    @Query("SELECT b FROM Book b ORDER BY b.averageRating DESC")
    Page<Book> findAllByOrderByAverageRatingDesc(Pageable pageable);

    @Override
    Page<Book> findAll(Pageable pageable);

    @Override
    Page<Book> findAll(Specification<Book> spec, Pageable pageable);
}

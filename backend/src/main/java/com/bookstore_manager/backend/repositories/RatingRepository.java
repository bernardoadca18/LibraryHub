package com.bookstore_manager.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bookstore_manager.backend.entities.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    // ... existing code ...
    @Query("SELECT r FROM Rating r WHERE r.book.bookId = :bookId")
    Page<Rating> findByBookId(Long bookId, Pageable pageable);

    // Busca avaliações por usuário
    @Query("SELECT r FROM Rating r WHERE r.user.userId = :userId")
    Page<Rating> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT COUNT(r) FROM Rating r WHERE r.user.userId = :userId")
    Long countByUserId(Long userId);

    // Verifica se usuário já avaliou o livro
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Rating r WHERE r.book.bookId = :bookId AND r.user.userId = :userId")
    boolean existsByBookIdAndUserId(Long bookId, Long userId);

    // Média de avaliações por livro (alternativa ao cálculo em memória)
    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.book.bookId = :bookId")
    Double findAverageRatingByBookId(Long bookId);

    @Query("SELECT COUNT(r) FROM Rating r WHERE r.book.bookId = :bookId")
    Long countByBookId(Long bookId);
}

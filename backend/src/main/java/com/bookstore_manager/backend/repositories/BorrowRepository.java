package com.bookstore_manager.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookstore_manager.backend.entities.Borrow;
import com.bookstore_manager.backend.projections.BorrowMinProjection;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {

    @Query("SELECT b FROM Borrow b WHERE b.user.userId = :userId")
    List<BorrowMinProjection> findAllByUserId(Long userId);

    @Query("SELECT b FROM Borrow b WHERE b.book.bookId = :bookId")
    List<BorrowMinProjection> findAllByBookId(Long bookId);

    @Query("SELECT b FROM Borrow b WHERE b.returnDate IS NULL")
    List<BorrowMinProjection> findActiveLoans();

    @Query("SELECT b FROM Borrow b WHERE b.user.id = :userId AND b.returnDate IS NULL")
    List<BorrowMinProjection> findActiveUserLoans(Long userId);

    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.user.id = :userId AND b.returnDate IS NULL")
    int countActiveUserLoans(Long userId);

    @Query("SELECT b FROM Borrow b WHERE b.dueDate < CURRENT_DATE AND b.returnDate IS NULL")
    List<BorrowMinProjection> findOverdueLoans();
}

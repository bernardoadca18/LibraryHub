package com.bookstore_manager.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookstore_manager.backend.entities.Borrow;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {

    @Query("SELECT b FROM Borrow b WHERE b.user.userId = :userId")
    List<Borrow> findAllByUserId(Long userId);

    @Query("SELECT b FROM Borrow b WHERE b.book.bookId = :bookId")
    List<Borrow> findAllByBookId(Long bookId);

    //
    @Query("SELECT b FROM Borrow b WHERE b.returnDate IS NULL")
    List<Borrow> findActiveLoans();

    @Query("SELECT b FROM Borrow b WHERE b.user.id = :userId AND b.returnDate IS NULL")
    List<Borrow> findActiveUserLoans(Long userId);

    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.user.id = :userId AND b.returnDate IS NULL")
    int countActiveUserLoans(Long userId);

    @Query("SELECT b FROM Borrow b WHERE b.dueDate < CURRENT_DATE AND b.returnDate IS NULL")
    List<Borrow> findOverdueLoans();

    //
    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.returnDate IS NULL")
    Long countByReturnDateIsNull();

    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.dueDate < CURRENT_DATE AND b.returnDate IS NULL")
    Long countLateReturns();

    @Query("SELECT b FROM Borrow b WHERE b.dueDate < CURRENT_DATE AND b.returnDate IS NULL")
    List<Borrow> findLateReturns();

    @Query("SELECT COUNT(b) FROM Borrow b")
    Long getBorrowCount();
}

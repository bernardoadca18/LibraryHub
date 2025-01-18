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
}

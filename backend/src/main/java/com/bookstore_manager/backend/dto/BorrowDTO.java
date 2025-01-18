package com.bookstore_manager.backend.dto;

import java.time.LocalDate;

import com.bookstore_manager.backend.entities.Borrow;

public class BorrowDTO {

    private Integer borrowId;
    private LocalDate borrowDate;
    private LocalDate returnDate;
    private Long userId;
    private Long bookId;

    public BorrowDTO() {
    }

    public BorrowDTO(Borrow entity) {
        this.borrowId = entity.getBorrowId();
        this.borrowDate = entity.getBorrowDate();
        this.returnDate = entity.getReturnDate();
        this.userId = entity.getUser().getUserId();
        this.bookId = entity.getBook().getBookId();
    }

    public Integer getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(Integer borrowId) {
        this.borrowId = borrowId;
    }

    public LocalDate getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(LocalDate borrowDate) {
        this.borrowDate = borrowDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

}

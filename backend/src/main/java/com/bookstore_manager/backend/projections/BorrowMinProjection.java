package com.bookstore_manager.backend.projections;

import java.time.LocalDate;

public interface BorrowMinProjection {

    Long getBorrowId();

    LocalDate getBorrowDate();

    LocalDate getReturnDate();

    Long getBookId();

    Long getUserId();
}

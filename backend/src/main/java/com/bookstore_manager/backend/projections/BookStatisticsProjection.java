package com.bookstore_manager.backend.projections;

public interface BookStatisticsProjection {

    Long getTotalBooks();

    Long getAvailableBooks();

    Long getBorrowedBooks();
}

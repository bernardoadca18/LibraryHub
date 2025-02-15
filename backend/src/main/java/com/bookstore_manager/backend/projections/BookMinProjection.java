package com.bookstore_manager.backend.projections;

public interface BookMinProjection {

    Long getId();

    String getTitle();

    String getIsbn();

    Integer getPublishYear();

    Integer getAvailableCopies();

    String getCoverUrl();

    Long getAuthorId();

    Long getCategoryId();

    String getAuthorName();

    String getCategoryName();

}

package com.bookstore_manager.backend.projections;

import com.bookstore_manager.backend.entities.UserRole;

public interface UserMinProjection {

    Long getUserId();

    String getEmail();

    String getName();

    String getPhone();

    String getUsername();

    String getPassword();

    UserRole getRole();
}

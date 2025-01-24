package com.bookstore_manager.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.projections.UserMinProjection;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    @Query("SELECT u FROM User u WHERE u.email = :email")
    UserMinProjection findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.name = :username")
    UserMinProjection findByUsername(String username);

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email")
    boolean existsByEmail(String email);

    @Query("SELECT COUNT(u) FROM User u")
    Long getUserCount();
}

package com.bookstore_manager.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.projections.UserMinProjection;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    @Query("SELECT u FROM User u WHERE u.email = :email")
    UserDetails findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    UserDetails findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.name = :name")
    UserMinProjection findByName(String name);

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email")
    boolean existsByEmail(String email);

    @Query("SELECT COUNT(u) FROM User u")
    Long getUserCount();

    @Query("SELECT u FROM User u WHERE u.email = :email")
    UserMinProjection findProjectionByEmail(String email);
}

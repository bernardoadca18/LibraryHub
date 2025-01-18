package com.bookstore_manager.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore_manager.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}

package com.bookstore_manager.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookstore_manager.backend.entities.Token;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("""
        select t from Token t inner join User u on t.username = u.username
        where u.username = :username and (t.expired = false or t.revoked = false)
        """)
    List<Token> findAllValidTokenByUser(String username);

    Optional<Token> findByToken(String token);
}

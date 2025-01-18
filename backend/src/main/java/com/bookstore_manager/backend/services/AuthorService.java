package com.bookstore_manager.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.AuthorDTO;
import com.bookstore_manager.backend.entities.Author;
import com.bookstore_manager.backend.repositories.AuthorRepository;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Transactional(readOnly = true)
    public List<AuthorDTO> findAll() {
        List<Author> result = this.authorRepository.findAll();
        List<AuthorDTO> dto = result.stream().map(x -> new AuthorDTO(x)).toList();

        return dto;
    }

    @Transactional(readOnly = true)
    public AuthorDTO findById(Long id) {
        Author result = authorRepository.findById(id).get();
        AuthorDTO dto = new AuthorDTO(result);

        return dto;
    }
}

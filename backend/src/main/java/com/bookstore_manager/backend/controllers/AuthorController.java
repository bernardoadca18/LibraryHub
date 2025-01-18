package com.bookstore_manager.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore_manager.backend.dto.AuthorDTO;
import com.bookstore_manager.backend.dto.BookDTO;
import com.bookstore_manager.backend.services.AuthorService;
import com.bookstore_manager.backend.services.BookService;

@RestController
@RequestMapping(value = "/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @Autowired
    private BookService bookService;

    @GetMapping(value = "/{id}")
    public AuthorDTO findById(@PathVariable Long id) {
        AuthorDTO result = authorService.findById(id);
        return result;
    }

    @GetMapping
    public List<AuthorDTO> findAll() {
        return authorService.findAll();
    }

    @GetMapping(value = "/{authorId}/books")
    public List<BookDTO> findBooksByAuthor(@PathVariable Long authorId) {
        List<BookDTO> result = bookService.findByAuthor(authorId);
        return result;
    }
}

package com.bookstore_manager.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping(value = "/id/{id}")
    public AuthorDTO findById(@PathVariable Long id) {
        AuthorDTO result = authorService.findById(id);
        return result;
    }

    @GetMapping
    public List<AuthorDTO> findAll() {
        return authorService.findAll();
    }

    @GetMapping(value = "/id/{authorId}/books")
    public List<BookDTO> findBooksByAuthor(@PathVariable Long authorId) {
        List<BookDTO> result = bookService.findByAuthor(authorId);
        return result;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<AuthorDTO> create(@RequestBody AuthorDTO authorDTO) {
        AuthorDTO result = authorService.create(authorDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // UPDATE
    @PutMapping(value = "/id/{id}")
    public ResponseEntity<AuthorDTO> update(@PathVariable Long id, @RequestBody AuthorDTO authorDTO) {
        AuthorDTO result = authorService.update(id, authorDTO);
        return ResponseEntity.ok(result);
    }

    // DELETE
    @DeleteMapping(value = "/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        authorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

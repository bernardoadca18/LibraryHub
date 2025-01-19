package com.bookstore_manager.backend.controllers;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore_manager.backend.dto.BookDTO;
import com.bookstore_manager.backend.dto.BorrowDTO;
import com.bookstore_manager.backend.services.BookService;
import com.bookstore_manager.backend.services.BorrowService;

@RestController
@RequestMapping(value = "/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BorrowService borrowService;

    @GetMapping(value = "/id/{id}")
    public BookDTO findById(@PathVariable Long id) {
        BookDTO result = bookService.findById(id);
        return result;
    }

    @GetMapping
    public List<BookDTO> findAll() {
        List<BookDTO> result = bookService.findAll();
        return result;
    }

    @GetMapping(value = "/category/{categoryId}")
    public List<BookDTO> findBooksByCategory(@PathVariable Long categoryId) {
        List<BookDTO> result = bookService.findByCategory(categoryId);
        return result;
    }

    @GetMapping(value = "/author/{authorId}")
    public List<BookDTO> findBooksByAuthor(@PathVariable Long authorId) {
        List<BookDTO> result = bookService.findByAuthor(authorId);
        return result;
    }

    @GetMapping(value = "/id/{bookId}/borrows")
    public List<BorrowDTO> findAllByBookId(@PathVariable Long bookId) {
        return borrowService.findAllByBookId(bookId);
    }

    //
    // CREATE
    @PostMapping
    public ResponseEntity<BookDTO> create(@RequestBody BookDTO bookDTO) {
        BookDTO result = bookService.create(bookDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // UPDATE
    @PutMapping(value = "/id/{id}")
    public ResponseEntity<BookDTO> update(@PathVariable Long id, @RequestBody BookDTO dto) {
        BookDTO result = bookService.update(id, dto);
        return ResponseEntity.ok(result);
    }

    // DELETE
    @DeleteMapping(value = "/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }

    //
    @GetMapping("/search")
    public ResponseEntity<List<BookDTO>> searchBooks(@RequestParam(required = true) String searchString) {
        if (searchString == null || searchString.trim().isEmpty()) {
            throw new IllegalArgumentException("Search string cannot be empty");
        }

        List<BookDTO> result = bookService.searchByTitle(searchString);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getBookStatistics() {
        return ResponseEntity.ok(bookService.getBookStatistics());
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<BookDTO>> getRecommendedBooks(@RequestParam Long userId) {
        return ResponseEntity.ok(bookService.getRecommendedBooks(userId));
    }
}

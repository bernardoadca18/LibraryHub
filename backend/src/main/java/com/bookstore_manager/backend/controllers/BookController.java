package com.bookstore_manager.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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
import com.bookstore_manager.backend.dto.RatingDTO;
import com.bookstore_manager.backend.services.BookService;
import com.bookstore_manager.backend.services.BorrowService;
import com.bookstore_manager.backend.services.RatingService;

@RestController
@RequestMapping(value = "/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BorrowService borrowService;

    @Autowired
    private RatingService ratingService;

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

    @GetMapping(value = "/count")
    public Long getBookCount() {
        return bookService.getBookCount();
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
    public ResponseEntity<List<BookDTO>> searchBooks(@RequestParam(required = false) String title) {
        List<BookDTO> result = bookService.searchBooks(title);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getBookStatistics() {
        return ResponseEntity.ok(bookService.getBookStatistics());
    }

    @PostMapping("/id/{bookId}/ratings")
    public ResponseEntity<BookDTO> addRating(@PathVariable Long bookId, @RequestBody RatingDTO ratingDTO) {
        BookDTO result = bookService.addRating(bookId, ratingDTO);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/id/{bookId}/ratings")
    public ResponseEntity<Page<RatingDTO>> getBookRatings(
            @PathVariable Long bookId,
            @PageableDefault(size = 10, sort = "createdAt", direction = Direction.DESC) Pageable pageable) {

        Page<RatingDTO> ratings = ratingService.findByBookId(bookId, pageable);
        return ResponseEntity.ok(ratings);
    }

    @GetMapping(value = "/id/{bookId}/average-rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long bookId) {
        Double average = ratingService.getAverageRatingForBook(bookId);
        return ResponseEntity.ok(average != null ? average : 0.0);
    }

    @GetMapping(value = "/id/{bookId}/rating-count")
    public ResponseEntity<Long> getRatingCount(@PathVariable Long bookId) {
        Long count = ratingService.getRatingCountForBook(bookId);
        return ResponseEntity.ok(count != null ? count : 0L);
    }

    @GetMapping(value = "/id/{bookId}/user/{userId}/has-rated")
    public ResponseEntity<Boolean> checkUserRating(
            @PathVariable Long bookId,
            @PathVariable Long userId) {
        boolean hasRated = ratingService.userAlreadyRated(bookId, userId);
        return ResponseEntity.ok(hasRated);
    }

    @GetMapping("/top-rated")
    public ResponseEntity<Page<BookDTO>> getTopRatedBooks(
            @PageableDefault(page = 0, size = 10, sort = "averageRating", direction = Direction.DESC) Pageable pageable) {
        Page<BookDTO> result = bookService.findTopRatedBooks(pageable);
        return ResponseEntity.ok(result);
    }

}

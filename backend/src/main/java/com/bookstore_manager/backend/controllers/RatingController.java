package com.bookstore_manager.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import org.springframework.web.bind.annotation.RestController;

import com.bookstore_manager.backend.dto.RatingDTO;
import com.bookstore_manager.backend.services.RatingService;

@RestController
@RequestMapping(value = "/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // GET paginado
    @GetMapping
    public ResponseEntity<Page<RatingDTO>> findAll(
            @PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<RatingDTO> page = ratingService.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    // GET por ID
    @GetMapping("/id/{id}")
    public ResponseEntity<RatingDTO> findById(@PathVariable Long id) {
        RatingDTO dto = ratingService.findById(id);
        return ResponseEntity.ok(dto);
    }

    // CREATE
    @PostMapping
    public ResponseEntity<RatingDTO> create(@RequestBody RatingDTO dto) {
        RatingDTO createdRating = ratingService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRating);
    }

    // UPDATE
    @PutMapping("/id/{id}")
    public ResponseEntity<RatingDTO> update(@PathVariable Long id, @RequestBody RatingDTO dto) {
        RatingDTO updatedRating = ratingService.update(id, dto);
        return ResponseEntity.ok(updatedRating);
    }

    // DELETE
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ratingService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Filtros adicionais
    @GetMapping("/book/{bookId}")
    public ResponseEntity<Page<RatingDTO>> findByBookId(
            @PathVariable Long bookId,
            @PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<RatingDTO> page = ratingService.findByBookId(bookId, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<RatingDTO>> findByUserId(
            @PathVariable Long userId,
            @PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<RatingDTO> page = ratingService.findByUserId(userId, pageable);
        return ResponseEntity.ok(page);
    }
}

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

import com.bookstore_manager.backend.dto.BorrowDTO;
import com.bookstore_manager.backend.services.BorrowService;

@RestController
@RequestMapping(value = "/api/borrows")
public class BorrowController {

    @Autowired
    private BorrowService borrowService;

    @GetMapping(value = "/id/{id}")
    public BorrowDTO findById(@PathVariable Long id) {
        BorrowDTO result = borrowService.findById(id);

        return result;
    }

    @GetMapping
    public List<BorrowDTO> findAll() {
        return borrowService.findAll();
    }

    @GetMapping(value = "/user/{userId}")
    public List<BorrowDTO> findAllByUserId(@PathVariable Long userId) {
        return borrowService.findAllByUserId(userId);
    }

    @GetMapping(value = "/book/{bookId}")
    public List<BorrowDTO> findAllByBookId(@PathVariable Long bookId) {
        return borrowService.findAllByBookId(bookId);
    }

    @GetMapping(value = "/active")
    public List<BorrowDTO> findActiveLoans() {
        return borrowService.findActiveLoans();
    }

    @GetMapping(value = "/user/{userId}/active")
    public List<BorrowDTO> findActiveUserLoans(@PathVariable Long userId) {
        return borrowService.findActiveUserLoans(userId);
    }

    @GetMapping(value = "/overdue")
    public List<BorrowDTO> findOverdueLoans() {
        return borrowService.findOverdueLoans();
    }

    @GetMapping(value = "user/{userId}/count")
    public int countActiveUserLoans(@PathVariable Long userId) {
        return borrowService.countActiveUserLoans(userId);
    }

    //
    // CREATE
    @PostMapping
    public ResponseEntity<BorrowDTO> create(@RequestBody BorrowDTO borrowDTO) {
        BorrowDTO result = borrowService.create(borrowDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // UPDATE
    @PutMapping(value = "/id/{id}")
    public ResponseEntity<BorrowDTO> update(@PathVariable Long id, @RequestBody BorrowDTO dto) {
        BorrowDTO result = borrowService.update(id, dto);
        return ResponseEntity.ok(result);
    }

    // DELETE
    @DeleteMapping(value = "/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        borrowService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.bookstore_manager.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore_manager.backend.dto.BorrowDTO;
import com.bookstore_manager.backend.services.BorrowService;

@RestController
@RequestMapping(value = "/api/borrows")
public class BorrowController {

    @Autowired
    private BorrowService borrowService;

    @GetMapping(value = "/{id}")
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

}

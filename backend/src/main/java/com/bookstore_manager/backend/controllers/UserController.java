package com.bookstore_manager.backend.controllers;

import java.util.List;

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

import com.bookstore_manager.backend.dto.BorrowDTO;
import com.bookstore_manager.backend.dto.UserDTO;
import com.bookstore_manager.backend.dto.UserUpdateDTO;
import com.bookstore_manager.backend.services.BorrowService;
import com.bookstore_manager.backend.services.UserService;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BorrowService borrowService;

    // CREATE
    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO) {
        UserDTO result = userService.create(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // READ
    @GetMapping(value = "/id/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
        UserDTO result = userService.findById(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/username/{username}")
    public ResponseEntity<UserDTO> findByUsername_(@PathVariable String username) {
        UserDTO result = userService.findByUsername(username);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public List<UserDTO> findAll() {
        List<UserDTO> result = userService.findAll();
        return result;
    }

    @GetMapping(value = "/name/{name}")
    public UserDTO findByUsername(@PathVariable String name) {
        return userService.findByName(name);
    }

    @GetMapping(value = "/email/{email}")
    public UserDTO findByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @GetMapping(value = "/id/{userId}/borrows")
    public List<BorrowDTO> findAllByUserId(@PathVariable Long userId) {
        return borrowService.findAllByUserId(userId);
    }

    @GetMapping(value = "/count")
    public Long getUserCount() {
        return userService.getUserCount();
    }

    // UPDATE
    @PutMapping(value = "/id/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserUpdateDTO userDTO) {
        UserDTO result = userService.update(id, userDTO);
        return ResponseEntity.ok(result);
    }

    // DELETE
    @DeleteMapping(value = "/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<UserDTO>> searchUsers(
            @RequestParam(required = false) String name,
            @PageableDefault(page = 0, size = 10, sort = "name", direction = Direction.ASC) Pageable pageable) {
        Page<UserDTO> result = userService.searchUsers(name, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<UserDTO>> findAllPag(
            @PageableDefault(page = 0, size = 10, sort = "name", direction = Direction.ASC) Pageable pageable) {
        Page<UserDTO> result = userService.findAllPag(pageable);
        return ResponseEntity.ok(result);
    }
}

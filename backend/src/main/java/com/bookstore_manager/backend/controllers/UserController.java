package com.bookstore_manager.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore_manager.backend.dto.UserDTO;
import com.bookstore_manager.backend.services.UserService;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/{id}")
    public UserDTO findById(@PathVariable Long id) {
        UserDTO result = userService.findById(id);

        return result;
    }

    @GetMapping
    public List<UserDTO> findAll() {
        List<UserDTO> result = userService.findAll();
        return result;
    }
}

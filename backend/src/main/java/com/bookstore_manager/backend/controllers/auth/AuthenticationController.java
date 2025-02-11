package com.bookstore_manager.backend.controllers.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore_manager.backend.dto.auth.AuthenticationDTO;
import com.bookstore_manager.backend.dto.auth.LoginResponseDTO;
import com.bookstore_manager.backend.dto.auth.RegisterDTO;
import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.infra.security.TokenService;
import com.bookstore_manager.backend.repositories.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) throws AuthenticationException {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            User user = (User) auth.getPrincipal();

            var token = tokenService.generateToken(user);

            logger.info("User {} logged in successfully.", user.getUsername());

            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (AuthenticationException e) {
            logger.warn("Failed login attempt.");
            throw new BadCredentialsException("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if (this.userRepository.findByUsername(data.username()) != null) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }
        if (this.userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        User newUser = new User(data.name(), data.email(), data.username(), data.password(), "ADMIN", data.phone());

        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register-user")
    public ResponseEntity registerUser(@RequestBody @Valid RegisterDTO data) {
        {
            if (this.userRepository.findByUsername(data.username()) != null) {
                return ResponseEntity.badRequest().body("Username already exists.");
            }
            if (this.userRepository.findByEmail(data.email()) != null) {
                return ResponseEntity.badRequest().body("Email already exists.");
            }

            User newUser = new User(data.name(), data.email(), data.username(), data.password(), "USER", data.phone());

            this.userRepository.save(newUser);
            return ResponseEntity.ok().build();
        }

    }
}

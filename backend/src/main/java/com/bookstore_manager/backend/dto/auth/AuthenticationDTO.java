package com.bookstore_manager.backend.dto.auth;

public record AuthenticationDTO(String username, String password) {

    public String username() {
        return username;
    }

    public String password() {
        return password;
    }

}

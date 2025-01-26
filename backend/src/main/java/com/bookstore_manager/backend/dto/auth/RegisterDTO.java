package com.bookstore_manager.backend.dto.auth;

public record RegisterDTO(String name, String email, String username, String password, String role, String phone) {

    public String name() {
        return name;
    }

    public String email() {
        return email;
    }

    public String username() {
        return username;
    }

    public String password() {
        return password;
    }

    public String role() {
        return role;
    }

    public String phone() {
        return phone;
    }

}

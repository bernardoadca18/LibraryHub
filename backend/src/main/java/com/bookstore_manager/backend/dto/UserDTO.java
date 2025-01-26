package com.bookstore_manager.backend.dto;

import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.entities.UserRole;
import com.bookstore_manager.backend.projections.UserMinProjection;

public class UserDTO {

    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String username;
    private String hashPassword;
    private UserRole role;

    public UserDTO() {
    }

    public UserDTO(User entity) {
        this.userId = entity.getUserId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.phone = entity.getPhone();
        this.username = entity.getUsername();
        this.hashPassword = entity.getPassword();
        this.role = entity.getRole();
    }

    public UserDTO(UserMinProjection projection) {
        this.userId = projection.getUserId();
        this.name = projection.getName();
        this.email = projection.getEmail();
        this.phone = projection.getPhone();
        this.username = projection.getUsername();
        this.hashPassword = projection.getPassword();
        this.role = projection.getRole();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

}

package com.bookstore_manager.backend.infra.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.bookstore_manager.backend.entities.User;

@Component
public class SecurityUtils {

    public boolean isOwnerOrAdmin(Authentication authentication, Long userId) {
        User user = (User) authentication.getPrincipal();
        return user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))
                || user.getUserId().equals(userId);
    }

    public boolean isOwnerByUsernameOrAdmin(Authentication authentication, String username) {
        User user = (User) authentication.getPrincipal();
        return user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))
                || user.getUsername().equals(username);
    }
}

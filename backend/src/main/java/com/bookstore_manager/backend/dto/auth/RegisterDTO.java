package com.bookstore_manager.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterDTO(String name, String email, String username, String password, String role, String phone) {

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    public String name() {
        return name;
    }

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    public String email() {
        return email;
    }

    @NotBlank(message = "Username é obrigatório")
    @Pattern(regexp = "^[a-zA-Z0-9]{3,20}$", message = "Username deve conter apenas letras e números")
    public String username() {
        return username;
    }

    @NotBlank(message = "Senha é obrigatória")

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "Senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais")
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

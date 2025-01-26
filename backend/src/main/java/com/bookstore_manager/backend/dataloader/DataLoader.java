package com.bookstore_manager.backend.dataloader;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.repositories.UserRepository;

@Component

public class DataLoader {

    @Bean
    public CommandLineRunner loadData(UserRepository userRepository) {

        return args -> {
            List<User> users = userRepository.saveAll(List.of(
                    new User("Bernardo Alves", "bernardo.alves@example.com", "b_2002", "02040638", "ADMIN", "(61) 9 6161-6161")
            ));
        };
    }
}

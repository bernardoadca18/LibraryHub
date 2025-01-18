package com.bookstore_manager.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.UserDTO;
import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.projections.UserMinProjection;
import com.bookstore_manager.backend.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        List<User> result = this.userRepository.findAll();
        List<UserDTO> dto = result.stream().map(x -> new UserDTO(x)).toList();

        return dto;
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        User result = userRepository.findById(id).get();
        UserDTO dto = new UserDTO(result);

        return dto;
    }

    @Transactional(readOnly = true)
    public UserDTO findByEmail(String email) {
        UserMinProjection projection = userRepository.findByEmail(email);
        UserDTO dto = new UserDTO(projection);
        return dto;
    }

    @Transactional(readOnly = true)
    public UserDTO findByUsername(String username) {
        UserMinProjection projection = userRepository.findByUsername(username);
        UserDTO dto = new UserDTO(projection);
        return dto;
    }

}

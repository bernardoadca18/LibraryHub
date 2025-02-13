package com.bookstore_manager.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.UserDTO;
import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.exception.DatabaseException;
import com.bookstore_manager.backend.exception.ResourceNotFoundException;
import com.bookstore_manager.backend.projections.UserMinProjection;
import com.bookstore_manager.backend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

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
    public UserDTO findByName(String name) {
        UserMinProjection projection = userRepository.findByName(name);
        UserDTO dto = new UserDTO(projection);
        return dto;
    }

    @Transactional(readOnly = true)
    public UserDTO findByUsername(String username) {
        UserMinProjection projection = userRepository.findByUsernameWithProjection(username);
        UserDTO dto = new UserDTO(projection);
        return dto;
    }

    @Transactional(readOnly = true)
    public UserDTO findByEmail(String email) {
        UserMinProjection projection = userRepository.findProjectionByEmail(email);
        UserDTO dto = new UserDTO(projection);
        return dto;
    }

    @Transactional(readOnly = true)
    public Long getUserCount() {
        return userRepository.getUserCount();
    }

    // CREATE
    @Transactional
    public UserDTO create(UserDTO dto) {
        User entity = new User();
        copyDtoToEntity(dto, entity);
        entity = userRepository.save(entity);
        return new UserDTO(entity);
    }

    // UPDATE
    @Transactional
    public UserDTO update(Long id, UserDTO dto) {
        try {
            User entity = userRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = userRepository.save(entity);
            return new UserDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("User not found");
        }
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found");
        }
        try {
            userRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(UserDTO dto, User entity) {
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getHashPassword());
        entity.setRole(dto.getRole());
    }

    // SEARCH
    public List<UserDTO> searchUsers(String name) {
        Specification<User> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }

        return userRepository.findAll(spec).stream().map(UserDTO::new).collect(Collectors.toList());
    }

}

package com.bookstore_manager.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.AuthorDTO;
import com.bookstore_manager.backend.entities.Author;
import com.bookstore_manager.backend.exception.DatabaseException;
import com.bookstore_manager.backend.exception.ResourceNotFoundException;
import com.bookstore_manager.backend.repositories.AuthorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Transactional(readOnly = true)
    public List<AuthorDTO> findAll() {
        List<Author> result = this.authorRepository.findAll();
        List<AuthorDTO> dto = result.stream().map(x -> new AuthorDTO(x)).toList();

        return dto;
    }

    @Transactional(readOnly = true)
    public AuthorDTO findById(Long id) {
        Author result = authorRepository.findById(id).get();
        AuthorDTO dto = new AuthorDTO(result);

        return dto;
    }

    @Transactional(readOnly = true)
    public Long getAuthorCount() {
        return authorRepository.getAuthorCount();
    }

    @Transactional(readOnly = true)
    public Page<AuthorDTO> searchAuthors(String name, Pageable pageable) {
        Specification<Author> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and((root, query, cb)
                    -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }

        return authorRepository.findAll(spec, pageable).map(AuthorDTO::new);
    }

    // CREATE   
    @Transactional
    public AuthorDTO create(AuthorDTO dto) {
        Author entity = new Author();
        copyDtoToEntity(dto, entity);
        entity = authorRepository.save(entity);
        return new AuthorDTO(entity);
    }

    // UPDATE
    @Transactional
    public AuthorDTO update(Long id, AuthorDTO dto) {
        try {
            Author entity = authorRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = authorRepository.save(entity);
            return new AuthorDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Author not found");
        }
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!authorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Author not found");
        }
        try {
            authorRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(AuthorDTO dto, Author entity) {
        entity.setName(dto.getName());
        entity.setBirthDate(dto.getBirthDate());
    }

    // SEARCH
    public List<AuthorDTO> searchAuthors(String name) {
        Specification<Author> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }

        return authorRepository.findAll(spec).stream().map(AuthorDTO::new).collect(Collectors.toList());
    }
}

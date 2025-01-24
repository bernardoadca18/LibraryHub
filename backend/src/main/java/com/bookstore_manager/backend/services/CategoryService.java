package com.bookstore_manager.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.CategoryDTO;
import com.bookstore_manager.backend.entities.Category;
import com.bookstore_manager.backend.exception.DatabaseException;
import com.bookstore_manager.backend.exception.ResourceNotFoundException;
import com.bookstore_manager.backend.repositories.CategoryRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // READ
    @Transactional(readOnly = true)
    public List<CategoryDTO> findAll() {
        List<Category> result = this.categoryRepository.findAll();
        List<CategoryDTO> dto = result.stream().map(x -> new CategoryDTO(x)).toList();

        return dto;
    }

    @Transactional(readOnly = true)
    public CategoryDTO findById(Long id) {
        Category result = categoryRepository.findById(id).get();
        CategoryDTO dto = new CategoryDTO(result);

        return dto;
    }

    @Transactional(readOnly = true)
    public Long getCategoryCount() {
        return categoryRepository.getCategoryCount();
    }

    // CREATE   
    @Transactional
    public CategoryDTO create(CategoryDTO dto) {
        Category entity = new Category();
        copyDtoToEntity(dto, entity);
        entity = categoryRepository.save(entity);
        return new CategoryDTO(entity);
    }

    // UPDATE
    @Transactional
    public CategoryDTO update(Long id, CategoryDTO dto) {
        try {
            Category entity = categoryRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = categoryRepository.save(entity);
            return new CategoryDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Category not found");
        }
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found");
        }
        try {
            categoryRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(CategoryDTO dto, Category entity) {
        entity.setName(dto.getName());
    }

    // SEARCH
    public List<CategoryDTO> searchCategories(String name) {
        Specification<Category> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }

        return categoryRepository.findAll(spec).stream().map(CategoryDTO::new).collect(Collectors.toList());
    }
}

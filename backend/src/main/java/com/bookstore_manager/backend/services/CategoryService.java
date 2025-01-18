package com.bookstore_manager.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.CategoryDTO;
import com.bookstore_manager.backend.entities.Category;
import com.bookstore_manager.backend.repositories.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

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
}

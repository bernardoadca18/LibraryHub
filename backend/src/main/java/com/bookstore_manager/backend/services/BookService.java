package com.bookstore_manager.backend.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.BookDTO;
import com.bookstore_manager.backend.entities.Book;
import com.bookstore_manager.backend.exception.DatabaseException;
import com.bookstore_manager.backend.exception.ResourceNotFoundException;
import com.bookstore_manager.backend.projections.BookMinProjection;
import com.bookstore_manager.backend.repositories.AuthorRepository;
import com.bookstore_manager.backend.repositories.BookRepository;
import com.bookstore_manager.backend.repositories.CategoryRepository;
import com.bookstore_manager.backend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
@CacheConfig(cacheNames = {"books"})
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    @Cacheable(key = "#root.method.name")
    public Page<BookDTO> findAll(Pageable pageable) {
        Page<Book> result = bookRepository.findAll(pageable);
        return result.map(BookDTO::new);
    }

    public Page<BookDTO> searchBooks(String title, Pageable pageable) {
        Specification<Book> spec = Specification.where(null);

        if (title != null) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
        }

        return bookRepository.findAll(spec, pageable).map(BookDTO::new);
    }

    @Transactional(readOnly = true)
    @Cacheable(key = "#id")
    public BookDTO findById(Long id) {
        Book result = bookRepository.findById(id).get();
        BookDTO dto = new BookDTO(result);

        return dto;
    }

    @Transactional(readOnly = true)
    public List<BookDTO> findByCategory(Long categoryId) {
        List<BookMinProjection> result = bookRepository.findByCategoryId(categoryId);
        List<BookDTO> dto = result.stream().map(x -> new BookDTO(x)).toList();

        return dto;
    }

    @Transactional(readOnly = true)
    public List<BookDTO> findByAuthor(Long authorId) {
        List<BookMinProjection> result = bookRepository.findByAuthorId(authorId);
        List<BookDTO> dto = result.stream().map(x -> new BookDTO(x)).toList();

        return dto;
    }

    @Transactional
    public List<BookDTO> findAvailableBooks() {
        return bookRepository.findAvailableBooks().stream().map((x) -> new BookDTO(x)).toList();
    }

    @Transactional
    public List<BookDTO> findLatestBooks() {
        return bookRepository.findLatestBooks().stream().map((x) -> new BookDTO(x)).toList();
    }

    public List<Integer> findAllPublishYears() {
        return bookRepository.findAllPublishYears();
    }

    @Transactional(readOnly = true)
    public Long getBookCount() {
        return bookRepository.getBookCount();
    }

    // CREATE
    @Transactional
    @CacheEvict(value = "books", allEntries = true)
    public BookDTO create(BookDTO dto) {
        Book entity = new Book();

        copyDtoToEntity(dto, entity);
        entity.setAvailableCopies(dto.getAvailableCopies());
        entity.setBorrowCount(0);
        entity = bookRepository.save(entity);
        return new BookDTO(entity);
    }

    // UPDATE
    @Transactional
    public BookDTO update(Long id, BookDTO dto) {
        try {
            Book entity = bookRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = bookRepository.save(entity);
            return new BookDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Book not found");
        }
    }

    //DELETE
    @Transactional
    public void delete(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResourceNotFoundException("Book not found");
        }
        try {
            bookRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(BookDTO dto, Book entity) {
        entity.setTitle(dto.getTitle());
        entity.setIsbn(dto.getIsbn());
        entity.setPublishYear(dto.getPublishYear());
        entity.setAvailableCopies(dto.getAvailableCopies());
        entity.setCoverUrl(dto.getCoverUrl());
        entity.setAuthor(authorRepository.findById(dto.getAuthorId()).get());
        entity.setCategory(categoryRepository.findById(dto.getCategoryId()).get());
    }

    //
    public List<BookDTO> searchBooks(String title) {
        Specification<Book> spec = Specification.where(null);

        if (title != null) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
        }

        return bookRepository.findAll(spec).stream().map(BookDTO::new).collect(Collectors.toList());
    }

    public Map<String, Object> getBookStatistics() {

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBooks", bookRepository.count());
        stats.put("availableBooks", bookRepository.countByAvailableCopiesGreaterThan(0));
        stats.put("categoriesCount", bookRepository.countByCategory());
        return stats;
    }

    @Transactional(readOnly = true)
    public Page<BookDTO> findMostBorrowedBooks(Pageable pageable) {
        Page<Book> result = bookRepository.findMostBorrowedBooks(pageable);
        return result.map(BookDTO::new);
    }
}

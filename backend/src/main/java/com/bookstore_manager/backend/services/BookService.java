package com.bookstore_manager.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

import jakarta.persistence.EntityNotFoundException;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<BookDTO> findAll() {
        List<Book> result = bookRepository.findAll();
        List<BookDTO> dto = result.stream().map(x -> new BookDTO(x)).toList();

        return dto;
    }

    @Transactional(readOnly = true)
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
    public List<BookDTO> searchByTitle(String searchTerm) {
        List<BookMinProjection> result = bookRepository.searchByTitle(searchTerm);
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

    // CREATE
    @Transactional
    public BookDTO create(BookDTO dto) {
        Book entity = new Book();
        copyDtoToEntity(dto, entity);
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
}

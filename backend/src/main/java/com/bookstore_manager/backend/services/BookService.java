package com.bookstore_manager.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.BookDTO;
import com.bookstore_manager.backend.entities.Book;
import com.bookstore_manager.backend.projections.BookMinProjection;
import com.bookstore_manager.backend.repositories.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

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
}

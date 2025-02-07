package com.bookstore_manager.backend.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.RatingDTO;
import com.bookstore_manager.backend.entities.Book;
import com.bookstore_manager.backend.entities.Rating;
import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.exception.ResourceNotFoundException;
import com.bookstore_manager.backend.repositories.BookRepository;
import com.bookstore_manager.backend.repositories.RatingRepository;
import com.bookstore_manager.backend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    // CRUD básico
    @Transactional(readOnly = true)
    public RatingDTO findById(Long id) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avaliação não encontrada"));
        return new RatingDTO(rating);
    }

    @Transactional(readOnly = true)
    public Page<RatingDTO> findAll(Pageable pageable) {
        Page<Rating> page = ratingRepository.findAll(pageable);
        return page.map(RatingDTO::new);
    }

    @Transactional
    public RatingDTO create(RatingDTO dto) {
        try {
            Rating rating = new Rating();
            copyDtoToEntity(dto, rating);
            rating = ratingRepository.save(rating);
            return new RatingDTO(rating);
        } catch (Exception e) {
            e.printStackTrace(); // Log do erro
            throw new RuntimeException("Erro ao criar avaliação: " + e.getMessage(), e);
        }
    }

    @Transactional
    public RatingDTO update(Long id, RatingDTO dto) {
        try {
            Rating rating = ratingRepository.getReferenceById(id);
            copyDtoToEntity(dto, rating);
            rating = ratingRepository.save(rating);
            return new RatingDTO(rating);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Avaliação não encontrada");
        }
    }

    @Transactional
    public void delete(Long id) {
        if (!ratingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Avaliação não encontrada");
        }
        ratingRepository.deleteById(id);
    }

    // Métodos customizados do repositório
    @Transactional(readOnly = true)
    public Page<RatingDTO> findByBookId(Long bookId, Pageable pageable) {
        Page<Rating> page = ratingRepository.findByBookId(bookId, pageable);
        return page.map(RatingDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<RatingDTO> findByUserId(Long userId, Pageable pageable) {
        Page<Rating> page = ratingRepository.findByUserId(userId, pageable);
        return page.map(RatingDTO::new);
    }

    @Transactional(readOnly = true)
    public boolean userAlreadyRated(Long bookId, Long userId) {
        return ratingRepository.existsByBookIdAndUserId(bookId, userId);
    }

    @Transactional(readOnly = true)
    public Double getAverageRatingForBook(Long bookId) {
        return ratingRepository.findAverageRatingByBookId(bookId);
    }

    private void copyDtoToEntity(RatingDTO dto, Rating entity) {
        try {
            // Validação do rating
            if (dto.getRating() == null || dto.getRating() < 1 || dto.getRating() > 5) {
                throw new IllegalArgumentException("A avaliação deve estar entre 1 e 5");
            }

            // Busca o usuário
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + dto.getUserId()));

            // Busca o livro
            Book book = bookRepository.findById(dto.getBookId())
                    .orElseThrow(() -> new ResourceNotFoundException("Livro não encontrado com ID: " + dto.getBookId()));

            // Atribui os valores à entidade
            entity.setRating(dto.getRating());
            entity.setCreatedAt(LocalDateTime.now()); // Usa a data atual
            entity.setUser(user);
            entity.setBook(book);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao copiar DTO para entidade: " + e.getMessage(), e);
        }
    }

    @Transactional(readOnly = true)
    public Long getRatingCountForBook(Long bookId) {
        return ratingRepository.countByBookId(bookId);
    }

    @Transactional(readOnly = true)
    public Page<RatingDTO> findByUserIdPaged(Long userId, Pageable pageable) {
        Page<Rating> page = ratingRepository.findByUserId(userId, pageable);
        return page.map(RatingDTO::new);
    }

    @Transactional(readOnly = true)
    public Long countByUserId(Long userId) {
        return ratingRepository.countByUserId(userId);
    }
}

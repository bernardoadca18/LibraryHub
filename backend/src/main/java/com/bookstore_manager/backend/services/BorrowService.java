package com.bookstore_manager.backend.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.BorrowDTO;
import com.bookstore_manager.backend.entities.Borrow;
import com.bookstore_manager.backend.exception.BusinessException;
import com.bookstore_manager.backend.exception.DatabaseException;
import com.bookstore_manager.backend.exception.ResourceNotFoundException;
import com.bookstore_manager.backend.repositories.BookRepository;
import com.bookstore_manager.backend.repositories.BorrowRepository;
import com.bookstore_manager.backend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BorrowService {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Transactional(readOnly = true)
    public List<BorrowDTO> findAll() {
        List<Borrow> result = borrowRepository.findAll();
        List<BorrowDTO> dto = result.stream().map(x -> new BorrowDTO(x)).toList();

        return dto;
    }

    @Transactional(readOnly = true)
    public BorrowDTO findById(Long id) {
        Borrow result = borrowRepository.findById(id).get();
        BorrowDTO dto = new BorrowDTO(result);

        return dto;
    }

    @Transactional(readOnly = true)
    public List<BorrowDTO> findAllByUserId(Long userId) {
        List<Borrow> result = borrowRepository.findAllByUserId(userId);
        return result.stream().map(x -> new BorrowDTO(x)).toList();
    }

    @Transactional(readOnly = true)
    public List<BorrowDTO> findAllByBookId(Long bookId) {
        List<Borrow> result = borrowRepository.findAllByBookId(bookId);
        return result.stream().map(x -> new BorrowDTO(x)).toList();
    }

    //
    @Transactional
    public List<BorrowDTO> findActiveLoans() {
        return borrowRepository.findActiveLoans().stream().map(x -> new BorrowDTO(x)).toList();
    }

    @Transactional
    public List<BorrowDTO> findActiveUserLoans(Long userId) {
        return borrowRepository.findActiveUserLoans(userId).stream().map(x -> new BorrowDTO(x)).toList();
    }

    @Transactional
    public List<BorrowDTO> findOverdueLoans() {
        return borrowRepository.findOverdueLoans().stream().map(x -> new BorrowDTO(x)).toList();
    }

    public int countActiveUserLoans(Long userId) {
        return borrowRepository.countActiveUserLoans(userId);
    }

    // CREATE
    @Transactional
    public BorrowDTO create(BorrowDTO dto) {
        Borrow entity = new Borrow();
        copyDtoToEntity(dto, entity);
        entity = borrowRepository.save(entity);
        return new BorrowDTO(entity);
    }

    // UPDATE
    @Transactional
    public BorrowDTO update(Long id, BorrowDTO dto) {
        try {
            Borrow entity = borrowRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = borrowRepository.save(entity);
            return new BorrowDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Borrow not found");
        }
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!borrowRepository.existsById(id)) {
            throw new ResourceNotFoundException("Borrow not found");
        }
        try {
            borrowRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(BorrowDTO dto, Borrow entity) {
        entity.setBorrowDate(dto.getBorrowDate());
        entity.setDueDate(dto.getDueDate());
        entity.setReturnDate(dto.getReturnDate());
        entity.setUser(userRepository.findById(dto.getUserId()).get());
        entity.setBook(bookRepository.findById(dto.getBookId()).get());
    }

    //
    public Map<String, Object> getBorrowStatistics() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalBorrows", borrowRepository.count());
        stats.put("activeBorrows", borrowRepository.countByReturnDateIsNull());
        stats.put("lateBorrows", borrowRepository.countLateReturns());

        return stats;
    }

    public List<BorrowDTO> getLateReturns() {
        return borrowRepository.findLateReturns().stream().map(BorrowDTO::new).collect(Collectors.toList());
    }

    public BorrowDTO extendBorrowPeriod(Long borrowId, Integer additionalDays) {
        Borrow borrow = borrowRepository.findById(borrowId).orElseThrow(() -> new ResourceNotFoundException("Borrow not found"));

        if (borrow.getReturnDate() != null) {
            throw new BusinessException("Cannot extend already returned borrow");
        }
        borrow.setDueDate(borrow.getDueDate().plusDays(additionalDays));
        return new BorrowDTO(borrowRepository.save(borrow));
    }
}

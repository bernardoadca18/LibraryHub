package com.bookstore_manager.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore_manager.backend.dto.BorrowDTO;
import com.bookstore_manager.backend.entities.Borrow;
import com.bookstore_manager.backend.repositories.BorrowRepository;

@Service
public class BorrowService {

    @Autowired
    private BorrowRepository borrowRepository;

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

}

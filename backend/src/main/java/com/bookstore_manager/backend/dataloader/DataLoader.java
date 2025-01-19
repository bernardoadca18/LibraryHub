package com.bookstore_manager.backend.dataloader;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.bookstore_manager.backend.entities.Author;
import com.bookstore_manager.backend.entities.Book;
import com.bookstore_manager.backend.entities.Borrow;
import com.bookstore_manager.backend.entities.Category;
import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.repositories.AuthorRepository;
import com.bookstore_manager.backend.repositories.BookRepository;
import com.bookstore_manager.backend.repositories.BorrowRepository;
import com.bookstore_manager.backend.repositories.CategoryRepository;
import com.bookstore_manager.backend.repositories.UserRepository;

@Component

public class DataLoader {

    @Bean
    public CommandLineRunner loadData(CategoryRepository categoryRepository,
            AuthorRepository authorRepository,
            BookRepository bookRepository, UserRepository userRepository,
            BorrowRepository borrowRepository) {

        return args -> {

            List<Category> categories = categoryRepository.saveAll(List.of(
                    new Category("Fiction"),
                    new Category("Non-Fiction"),
                    new Category("Science Fiction"),
                    new Category("Fantasy"),
                    new Category("Biography"),
                    new Category("History"),
                    new Category("Mystery"),
                    new Category("Self-Help"),
                    new Category("Romance"),
                    new Category("Horror"),
                    new Category("Poetry"),
                    new Category("Drama")
            ));

            List<Author> authors = authorRepository.saveAll(List.of(
                    new Author("J.K. Rowling", LocalDate.of(1965, 7, 31)),
                    new Author("Isaac Asimov", LocalDate.of(1920, 1, 2)),
                    new Author("George Orwell", LocalDate.of(1903, 6, 25)),
                    new Author("Agatha Christie", LocalDate.of(1890, 9, 15)),
                    new Author("J.R.R. Tolkien", LocalDate.of(1892, 1, 3)),
                    new Author("Stephen King", LocalDate.of(1947, 9, 21)),
                    new Author("Yuval Noah Harari", LocalDate.of(1976, 2, 24)),
                    new Author("Jane Austen", LocalDate.of(1775, 12, 16)),
                    new Author("Gabriel García Márquez", LocalDate.of(1927, 3, 6)),
                    new Author("Virginia Woolf", LocalDate.of(1882, 1, 25)),
                    new Author("Ernest Hemingway", LocalDate.of(1899, 7, 21)),
                    new Author("Paulo Coelho", LocalDate.of(1947, 8, 24))
            ));

            List<Book> books = bookRepository.saveAll(List.of(
                    new Book("Harry Potter and the Philosopher's Stone", "9780747532699", 1997, 5, "url1", authors.get(0), categories.get(3)),
                    new Book("Foundation", "9780553293357", 1951, 3, "url2", authors.get(1), categories.get(2)),
                    new Book("1984", "9780451524935", 1949, 6, "url3", authors.get(2), categories.get(0)),
                    new Book("One Hundred Years of Solitude", "9780060883287", 1967, 4, "url4", authors.get(8), categories.get(0)),
                    new Book("Mrs. Dalloway", "9780156628709", 1925, 3, "url5", authors.get(9), categories.get(0)),
                    new Book("The Old Man and the Sea", "9780684801223", 1952, 5, "url6", authors.get(10), categories.get(0)),
                    new Book("The Alchemist", "9780062315007", 1988, 7, "url7", authors.get(11), categories.get(8))
            ));

            List<User> users = userRepository.saveAll(List.of(
                    new User("John Doe", "john.doe@example.com", "123-456-7890"),
                    new User("Jane Smith", "jane.smith@example.com", "987-654-3210"),
                    new User("Alice Johnson", "alice@example.com", "555-0123"),
                    new User("Bob Wilson", "bob@example.com", "555-4567"),
                    new User("Carol Brown", "carol@example.com", "555-8901")
            ));

            // Empréstimos - Criando diferentes cenários
            LocalDate today = LocalDate.now();

            List<Borrow> borrows = new ArrayList<>();

            // Empréstimos ativos (ainda não devolvidos)
            Borrow borrow1 = new Borrow();
            borrow1.setBorrowDate(today.minusDays(5));
            borrow1.setDueDate(today.plusDays(10));
            borrow1.setUser(users.get(0));
            borrow1.setBook(books.get(0));
            borrows.add(borrow1);

            Borrow borrow2 = new Borrow();
            borrow2.setBorrowDate(today.minusDays(3));
            borrow2.setDueDate(today.plusDays(12));
            borrow2.setUser(users.get(1));
            borrow2.setBook(books.get(1));
            borrows.add(borrow2);

            // Empréstimos atrasados
            Borrow borrow3 = new Borrow();

            borrow3.setBorrowDate(today.minusDays(20));

            borrow3.setDueDate(today.minusDays(5));

            borrow3.setUser(users.get(0));

            borrow3.setBook(books.get(2));

            borrows.add(borrow3);

            Borrow borrow4 = new Borrow();

            borrow4.setBorrowDate(today.minusDays(15));

            borrow4.setDueDate(today.minusDays(1));

            borrow4.setUser(users.get(1));

            borrow4.setBook(books.get(3));

            borrows.add(borrow4);

            // Empréstimos concluídos
            Borrow borrow5 = new Borrow();

            borrow5.setBorrowDate(today.minusDays(30));

            borrow5.setDueDate(today.minusDays(15));

            borrow5.setReturnDate(today.minusDays(14));

            borrow5.setUser(users.get(0));

            borrow5.setBook(books.get(4));

            borrows.add(borrow5);

            Borrow borrow6 = new Borrow();

            borrow6.setBorrowDate(today.minusDays(25));

            borrow6.setDueDate(today.minusDays(10));

            borrow6.setReturnDate(today.minusDays(11));

            borrow6.setUser(users.get(1));

            borrow6.setBook(books.get(5));

            borrows.add(borrow6);

            // Múltiplos empréstimos por usuário
            Borrow borrow7 = new Borrow();

            borrow7.setBorrowDate(today.minusDays(2));

            borrow7.setDueDate(today.plusDays(13));

            borrow7.setUser(users.get(0));

            borrow7.setBook(books.get(6));

            borrows.add(borrow7);

            Borrow borrow8 = new Borrow();

            borrow8.setBorrowDate(today.minusDays(1));

            borrow8.setDueDate(today.plusDays(14));

            borrow8.setUser(users.get(1));

            borrow8.setBook(books.get(0));

            borrows.add(borrow8);

            borrowRepository.saveAll(borrows);

        };

    }

}

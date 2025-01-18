package com.bookstore_manager.backend.dataloader;

import java.time.LocalDate;
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
                    new Category("Self-Help")
            ));

            List<Author> authors = authorRepository.saveAll(List.of(
                    new Author("J.K. Rowling", LocalDate.of(1965, 7, 31)),
                    new Author("Isaac Asimov", LocalDate.of(1920, 1, 2)),
                    new Author("George Orwell", LocalDate.of(1903, 6, 25)),
                    new Author("Agatha Christie", LocalDate.of(1890, 9, 15)),
                    new Author("J.R.R. Tolkien", LocalDate.of(1892, 1, 3)),
                    new Author("Stephen King", LocalDate.of(1947, 9, 21)),
                    new Author("Yuval Noah Harari", LocalDate.of(1976, 2, 24)),
                    new Author("Jane Austen", LocalDate.of(1775, 12, 16))
            ));

            List<Book> books = bookRepository.saveAll(List.of(
                    new Book("Harry Potter and the Philosopher's Stone", "9780747532699", 1997, 5, null, authors.get(0), categories.get(3)),
                    new Book("Foundation", "9780553293357", 1951, 3, null, authors.get(1), categories.get(2)),
                    new Book("1984", "9780451524935", 1949, 6, null, authors.get(2), categories.get(0)),
                    new Book("Murder on the Orient Express", "9780062073501", 1934, 4, null, authors.get(3), categories.get(6)),
                    new Book("The Hobbit", "9780547928227", 1937, 5, null, authors.get(4), categories.get(3)),
                    new Book("The Shining", "9780307743657", 1977, 3, null, authors.get(5), categories.get(0)),
                    new Book("Sapiens: A Brief History of Humankind", "9780099590088", 2011, 7, null, authors.get(6), categories.get(4)),
                    new Book("Pride and Prejudice", "9781503290563", 1813, 8, null, authors.get(7), categories.get(0)),
                    new Book("Animal Farm", "9780451526342", 1945, 6, null, authors.get(2), categories.get(0)),
                    new Book("The Fellowship of the Ring", "9780261102354", 1954, 5, null, authors.get(4), categories.get(3)),
                    new Book("It", "9780450411432", 1986, 4, null, authors.get(5), categories.get(0)),
                    new Book("The Murder of Roger Ackroyd", "9780007527526", 1926, 3, null, authors.get(3), categories.get(6)),
                    new Book("I, Robot", "9780553382563", 1950, 6, null, authors.get(1), categories.get(2)),
                    new Book("Homo Deus: A Brief History of Tomorrow", "9780062464316", 2015, 5, null, authors.get(6), categories.get(4)),
                    new Book("Emma", "9781503290488", 1815, 7, null, authors.get(7), categories.get(0)),
                    new Book("The Two Towers", "9780261102361", 1954, 4, null, authors.get(4), categories.get(3)),
                    new Book("Carrie", "9780385086950", 1974, 3, null, authors.get(5), categories.get(0)),
                    new Book("Sense and Sensibility", "9781503290310", 1811, 8, null, authors.get(7), categories.get(0)),
                    new Book("Harry Potter and the Chamber of Secrets", "9780747538493", 1998, 5, null, authors.get(0), categories.get(3)),
                    new Book("The Return of the King", "9780261102378", 1955, 5, null, authors.get(4), categories.get(3))
            ));

            List<User> users = userRepository.saveAll(List.of(
                    new User("John Doe", "john.doe@example.com", "123-456-7890"),
                    new User("Jane Smith", "jane.smith@example.com", "987-654-3210")
            ));

            List<Borrow> borrows = borrowRepository.saveAll(List.of(
                    new Borrow(LocalDate.of(2025, 1, 1), LocalDate.of(2025, 1, 15), users.get(0), books.get(0)),
                    new Borrow(LocalDate.of(2025, 1, 5), LocalDate.of(2025, 1, 20), users.get(1), books.get(1)),
                    new Borrow(LocalDate.of(2025, 1, 10), LocalDate.of(2025, 1, 25), users.get(0), books.get(2))
            ));
        };
    }
}

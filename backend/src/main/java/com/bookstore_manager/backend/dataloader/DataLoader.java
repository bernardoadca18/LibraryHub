package com.bookstore_manager.backend.dataloader;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.bookstore_manager.backend.entities.Author;
import com.bookstore_manager.backend.entities.Book;
import com.bookstore_manager.backend.entities.Borrow;
import com.bookstore_manager.backend.entities.Category;
import com.bookstore_manager.backend.entities.Rating;
import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.repositories.AuthorRepository;
import com.bookstore_manager.backend.repositories.BookRepository;
import com.bookstore_manager.backend.repositories.BorrowRepository;
import com.bookstore_manager.backend.repositories.CategoryRepository;
import com.bookstore_manager.backend.repositories.RatingRepository;
import com.bookstore_manager.backend.repositories.UserRepository;

@Component
public class DataLoader {

    @Bean
    public CommandLineRunner loadData(UserRepository userRepository,
            BookRepository bookRepository,
            AuthorRepository authorRepository,
            CategoryRepository categoryRepository,
            RatingRepository ratingRepository,
            BorrowRepository borrowRepository) {

        return args -> {
            // Criando autores
            List<Author> authors = authorRepository.saveAll(List.of(
                    new Author("João Silva", LocalDate.of(1980, 5, 15)),
                    new Author("Maria Oliveira", LocalDate.of(1975, 8, 22)),
                    new Author("Carlos Souza", LocalDate.of(1990, 3, 10)),
                    new Author("Ana Costa", LocalDate.of(1985, 11, 30)),
                    new Author("Pedro Santos", LocalDate.of(1970, 7, 5))
            ));

            // Criando categorias
            List<Category> categories = categoryRepository.saveAll(List.of(
                    new Category("Ficção Científica"),
                    new Category("Fantasia"),
                    new Category("Romance"),
                    new Category("Terror"),
                    new Category("Biografia")
            ));

            // Criando 50 livros
            Random random = new Random();
            List<Book> books = bookRepository.saveAll(List.of(
                    new Book("A Jornada do Herói", "9780000000001", 2020, 5, null, authors.get(0), categories.get(0)),
                    new Book("O Segredo das Estrelas", "9780000000002", 2018, 3, null, authors.get(1), categories.get(1)),
                    new Book("Crônicas do Amanhã", "9780000000003", 2021, 7, null, authors.get(2), categories.get(2)),
                    new Book("Sombras do Passado", "9780000000004", 2019, 2, null, authors.get(3), categories.get(3)),
                    new Book("Reinos de Cristal", "9780000000005", 2022, 9, null, authors.get(4), categories.get(4)),
                    new Book("Labirinto Estelar", "9780000000006", 2020, 4, null, authors.get(0), categories.get(0)),
                    new Book("Herdeiros da Luz", "9780000000007", 2018, 6, null, authors.get(1), categories.get(1)),
                    new Book("Abismo Ancestral", "9780000000008", 2021, 1, null, authors.get(2), categories.get(2)),
                    new Book("Cidade dos Sonhos", "9780000000009", 2019, 8, null, authors.get(3), categories.get(3)),
                    new Book("Legado Flamejante", "9780000000010", 2022, 10, null, authors.get(4), categories.get(4)),
                    new Book("Ecos do Universo", "9780000000011", 2020, 2, null, authors.get(0), categories.get(0)),
                    new Book("Máscara da Eternidade", "9780000000012", 2018, 5, null, authors.get(1), categories.get(1)),
                    new Book("Templo das Almas", "9780000000013", 2021, 3, null, authors.get(2), categories.get(2)),
                    new Book("Mar de Incógnitas", "9780000000014", 2019, 7, null, authors.get(3), categories.get(3)),
                    new Book("Profecia de Aço", "9780000000015", 2022, 4, null, authors.get(4), categories.get(4)),
                    new Book("Portal Dimensional", "9780000000016", 2020, 6, null, authors.get(0), categories.get(0)),
                    new Book("Lendas do Abismo", "9780000000017", 2018, 9, null, authors.get(1), categories.get(1)),
                    new Book("Guardiões Celestiais", "9780000000018", 2021, 1, null, authors.get(2), categories.get(2)),
                    new Book("Fronteira Final", "9780000000019", 2019, 8, null, authors.get(3), categories.get(3)),
                    new Book("Espíritos da Noite", "9780000000020", 2022, 10, null, authors.get(4), categories.get(4)),
                    new Book("Alquimia das Eras", "9780000000021", 2020, 3, null, authors.get(0), categories.get(0)),
                    new Book("Torre do Destino", "9780000000022", 2018, 5, null, authors.get(1), categories.get(1)),
                    new Book("Selva de Neve", "9780000000023", 2021, 7, null, authors.get(2), categories.get(2)),
                    new Book("Código da Immortalidade", "9780000000024", 2019, 2, null, authors.get(3), categories.get(3)),
                    new Book("Dinastia Lunar", "9780000000025", 2022, 4, null, authors.get(4), categories.get(4)),
                    new Book("Vórtice Temporal", "9780000000026", 2020, 6, null, authors.get(0), categories.get(0)),
                    new Book("Filhos da Aurora", "9780000000027", 2018, 8, null, authors.get(1), categories.get(1)),
                    new Book("Coração do Vulcão", "9780000000028", 2021, 9, null, authors.get(2), categories.get(2)),
                    new Book("Jardim das Ilusões", "9780000000029", 2019, 1, null, authors.get(3), categories.get(3)),
                    new Book("Pacto Estelar", "9780000000030", 2022, 10, null, authors.get(4), categories.get(4)),
                    new Book("Sussurros da Escuridão", "9780000000031", 2020, 2, null, authors.get(0), categories.get(0)),
                    new Book("Império Submerso", "9780000000032", 2018, 4, null, authors.get(1), categories.get(1)),
                    new Book("Fuga Dimensional", "9780000000033", 2021, 6, null, authors.get(2), categories.get(2)),
                    new Book("Memórias Perdidas", "9780000000034", 2019, 8, null, authors.get(3), categories.get(3)),
                    new Book("Trono de Ébano", "9780000000035", 2022, 3, null, authors.get(4), categories.get(4)),
                    new Book("Nômades Estelares", "9780000000036", 2020, 5, null, authors.get(0), categories.get(0)),
                    new Book("Círculo Secreto", "9780000000037", 2018, 7, null, authors.get(1), categories.get(1)),
                    new Book("Ruínas Ancestrais", "9780000000038", 2021, 9, null, authors.get(2), categories.get(2)),
                    new Book("Faroeste Cósmico", "9780000000039", 2019, 1, null, authors.get(3), categories.get(3)),
                    new Book("Espirais do Tempo", "9780000000040", 2022, 10, null, authors.get(4), categories.get(4)),
                    new Book("Sinfonia do Caos", "9780000000041", 2020, 2, null, authors.get(0), categories.get(0)),
                    new Book("Muralha do Infinito", "9780000000042", 2018, 4, null, authors.get(1), categories.get(1)),
                    new Book("Gêmeos Estelares", "9780000000043", 2021, 6, null, authors.get(2), categories.get(2)),
                    new Book("Códice Proibido", "9780000000044", 2019, 8, null, authors.get(3), categories.get(3)),
                    new Book("Navegantes do Abismo", "9780000000045", 2022, 3, null, authors.get(4), categories.get(4)),
                    new Book("Estandarte Solar", "9780000000046", 2020, 5, null, authors.get(0), categories.get(0)),
                    new Book("Réquiem das Esferas", "9780000000047", 2018, 7, null, authors.get(1), categories.get(1)),
                    new Book("Cicatrizes do Espaço", "9780000000048", 2021, 9, null, authors.get(2), categories.get(2)),
                    new Book("Fênix Digital", "9780000000049", 2019, 1, null, authors.get(3), categories.get(3)),
                    new Book("O Último Desafio", "9780000000050", 2022, 7, null, authors.get(4), categories.get(4))
            ));

            // Criando 10 usuários
            List<User> users = userRepository.saveAll(List.of(
                    new User("João Silva", "joao.silva@example.com", "joao123", "12345678", "USER", "(11) 99999-9999"),
                    new User("Maria Oliveira", "maria.oliveira@example.com", "maria123", "87654321", "USER", "(11) 88888-8888"),
                    new User("Carlos Souza", "carlos.souza@example.com", "carlos123", "11223344", "USER", "(11) 77777-7777"),
                    new User("Ana Costa", "ana.costa@example.com", "ana123", "55667788", "USER", "(11) 66666-6666"),
                    new User("Pedro Santos", "pedro.santos@example.com", "pedro123", "99887766", "USER", "(11) 55555-5555"),
                    new User("Luiza Pereira", "luiza.pereira@example.com", "luiza123", "44332211", "USER", "(11) 44444-4444"),
                    new User("Fernando Almeida", "fernando.almeida@example.com", "fernando123", "00998877", "USER", "(11) 33333-3333"),
                    new User("Juliana Ribeiro", "juliana.ribeiro@example.com", "juliana123", "65432100", "USER", "(11) 22222-2222"),
                    new User("Rodrigo Martins", "rodrigo.martins@example.com", "rodrigo123", "12121212", "USER", "(11) 11111-1111"),
                    new User("Admin", "admin@example.com", "admin", "00000000", "ADMIN", "(11) 00000-0000")
            ));

            // Criação de empréstimos
            LocalDate baseDate = LocalDate.now().minusMonths(6);
            random = new Random();

            List<Borrow> borrows = new ArrayList<>();
            for (int i = 0; i < 50; i++) { // 50 empréstimos
                User user = users.get(random.nextInt(users.size() - 1)); // Exclui admin
                Book book = books.get(random.nextInt(books.size()));

                LocalDate borrowDate = baseDate.plusDays(random.nextInt(60));
                LocalDate dueDate = borrowDate.plusDays(14);
                LocalDate returnDate = random.nextBoolean() ? dueDate.minusDays(random.nextInt(5)) : null;

                borrows.add(new Borrow(
                        borrowDate,
                        returnDate,
                        user,
                        book,
                        dueDate
                ));
            }
            borrowRepository.saveAll(borrows);

            // Criação de avaliações
            List<Rating> ratings = new ArrayList<>();
            for (int i = 0; i < 1000; i++) { // 1000 avaliações
                User user = users.get(random.nextInt(users.size() - 1)); // Exclui admin
                Book book = books.get(random.nextInt(books.size()));

                Rating rating = new Rating(
                        user,
                        book,
                        random.nextInt(4) + 2 // Notas entre 2-5
                );

                // Ajuste manual do createdAt para coincidir com datas realistas
                rating.setCreatedAt(LocalDateTime.now().minusDays(random.nextInt(180)));

                ratings.add(rating);
            }
            ratingRepository.saveAll(ratings);
        };
    }
}

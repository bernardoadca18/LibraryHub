import requests

BASE_URL = "http://localhost:8080"

# Variáveis para IDs e outras informações
user_id = 1
username = "johndoe"
email = "johndoe@example.com"

book_id = 1
category_id = 1
author_id = 1

borrow_id = 1

# UserController
print("=== UserController ===")
print(requests.get(f"{BASE_URL}/api/users").json())  # Listar todos os usuários
print(requests.get(f"{BASE_URL}/api/users/id/{user_id}").json())  # Buscar usuário por ID
print(requests.get(f"{BASE_URL}/api/users/name/{username}").json())  # Buscar usuário por nome
print(requests.get(f"{BASE_URL}/api/users/email/{email}").json())  # Buscar usuário por email
print(requests.get(f"{BASE_URL}/api/users/{user_id}/borrows").json())  # Listar empréstimos do usuário
new_user = {"name": "Jane Doe", "email": "janedoe@example.com"}  # Dados para criação
print(requests.post(f"{BASE_URL}/api/users", json=new_user).json())  # Criar novo usuário
update_user = {"name": "Jane Smith", "email": "janesmith@example.com"}  # Dados para atualização
print(requests.put(f"{BASE_URL}/api/users/{user_id}", json=update_user).json())  # Atualizar usuário
print(requests.delete(f"{BASE_URL}/api/users/{user_id}").status_code)  # Deletar usuário

# BookController
print("\n=== BookController ===")
print(requests.get(f"{BASE_URL}/api/books").json())  # Listar todos os livros
print(requests.get(f"{BASE_URL}/api/books/id/{book_id}").json())  # Buscar livro por ID
print(requests.get(f"{BASE_URL}/api/books/category/{category_id}").json())  # Buscar livros por categoria
print(requests.get(f"{BASE_URL}/api/books/author/{author_id}").json())  # Buscar livros por autor
print(requests.get(f"{BASE_URL}/api/books/id/{book_id}/borrows").json())  # Listar empréstimos do livro
new_book = {"title": "New Book", "authorId": author_id, "categoryId": category_id}  # Dados para criação
print(requests.post(f"{BASE_URL}/api/books", json=new_book).json())  # Criar novo livro
update_book = {"title": "Updated Book"}  # Dados para atualização
print(requests.put(f"{BASE_URL}/api/books/id/{book_id}", json=update_book).json())  # Atualizar livro
print(requests.delete(f"{BASE_URL}/api/books/id/{book_id}").status_code)  # Deletar livro

# AuthorController
print("\n=== AuthorController ===")
print(requests.get(f"{BASE_URL}/api/authors").json())  # Listar todos os autores
print(requests.get(f"{BASE_URL}/api/authors/id/{author_id}").json())  # Buscar autor por ID
print(requests.get(f"{BASE_URL}/api/authors/id/{author_id}/books").json())  # Listar livros do autor
new_author = {"name": "New Author"}  # Dados para criação
print(requests.post(f"{BASE_URL}/api/authors", json=new_author).json())  # Criar novo autor
update_author = {"name": "Updated Author"}  # Dados para atualização
print(requests.put(f"{BASE_URL}/api/authors/id/{author_id}", json=update_author).json())  # Atualizar autor
print(requests.delete(f"{BASE_URL}/api/authors/id/{author_id}").status_code)  # Deletar autor

# CategoryController
print("\n=== CategoryController ===")
print(requests.get(f"{BASE_URL}/api/categories").json())  # Listar todas as categorias
print(requests.get(f"{BASE_URL}/api/categories/id/{category_id}").json())  # Buscar categoria por ID
print(requests.get(f"{BASE_URL}/api/categories/id/{category_id}/books").json())  # Listar livros da categoria
new_category = {"name": "New Category"}  # Dados para criação
print(requests.post(f"{BASE_URL}/api/categories", json=new_category).json())  # Criar nova categoria
update_category = {"name": "Updated Category"}  # Dados para atualização
print(requests.put(f"{BASE_URL}/api/categories/id/{category_id}", json=update_category).json())  # Atualizar categoria
print(requests.delete(f"{BASE_URL}/api/categories/id/{category_id}").status_code)  # Deletar categoria

# BorrowController
print("\n=== BorrowController ===")
print(requests.get(f"{BASE_URL}/api/borrows").json())  # Listar todos os empréstimos
print(requests.get(f"{BASE_URL}/api/borrows/id/{borrow_id}").json())  # Buscar empréstimo por ID
print(requests.get(f"{BASE_URL}/api/borrows/user/{user_id}").json())  # Listar empréstimos do usuário
print(requests.get(f"{BASE_URL}/api/borrows/book/{book_id}").json())  # Listar empréstimos do livro
print(requests.get(f"{BASE_URL}/api/borrows/active").json())  # Listar empréstimos ativos
print(requests.get(f"{BASE_URL}/api/borrows/user/{user_id}/active").json())  # Listar empréstimos ativos do usuário
print(requests.get(f"{BASE_URL}/api/borrows/overdue").json())  # Listar empréstimos atrasados
print(requests.get(f"{BASE_URL}/api/borrows/user/{user_id}/count").json())  # Contar empréstimos ativos do usuário
new_borrow = {"userId": user_id, "bookId": book_id}  # Dados para criação
print(requests.post(f"{BASE_URL}/api/borrows", json=new_borrow).json())  # Criar novo empréstimo
update_borrow = {"status": "Returned"}  # Dados para atualização
print(requests.put(f"{BASE_URL}/api/borrows/id/{borrow_id}", json=update_borrow).json())  # Atualizar empréstimo
print(requests.delete(f"{BASE_URL}/api/borrows/id/{borrow_id}").status_code)  # Deletar empréstimo

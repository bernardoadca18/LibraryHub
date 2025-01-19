import requests
import json
from typing import Dict, Any, Optional
from datetime import datetime

class LibraryHubTester:
    def __init__(self, base_url: str = "http://localhost:8080/api"):
        self.base_url = base_url
        self.total_tests = 0
        self.successful_tests = 0

    def make_request(self, endpoint: str, method: str = "GET", data: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
        """Função genérica para fazer requisições HTTP."""
        url = f"{self.base_url}{endpoint}"
        self.total_tests += 1
        try:
            response = {
                "GET": lambda: requests.get(url),
                "POST": lambda: requests.post(url, json=data),
                "PUT": lambda: requests.put(url, json=data),
                "DELETE": lambda: requests.delete(url)
            }.get(method.upper(), lambda: None)()

            if response is None:
                print(f"Invalid HTTP method: {method}")
                return None

            print(f"\n{'='*50}")
            print(f"Request: {method.upper()} {url}")
            print(f"Status Code: {response.status_code}")

            if response.ok:
                response_data = response.json()
                print("\nFormatted Response:")
                print(json.dumps(response_data, indent=2))
                self.successful_tests += 1
                return response_data
            else:
                print("\nError Response:")
                print(f"Message: {response.text}")
                return None

        except requests.exceptions.RequestException as e:
            print("\nRequest Error:")
            print(f"Type: {type(e).__name__}")
            print(f"Message: {str(e)}")
            return None

    def print_progress(self):
        """Exibe o progresso dos testes."""
        print(f"\nProgress: {self.successful_tests}/{self.total_tests} tests passed.")

    def test_authors_endpoints(self):
        """Testa todos os endpoints relacionados a autores."""
        print("\n=== Testing Authors Endpoints ===")
        authors = self.make_request("/authors")
        self.print_progress()

        if authors:
            first_author_id = authors[0].get("id")
            self.make_request(f"/authors/{first_author_id}")
            self.print_progress()
            self.make_request(f"/authors/{first_author_id}/books")
            self.print_progress()

    def test_books_endpoints(self):
        """Testa todos os endpoints relacionados a livros."""
        print("\n=== Testing Books Endpoints ===")
        books = self.make_request("/books")
        self.print_progress()

        if books:
            first_book_id = books[0].get("id")
            self.make_request(f"/books/{first_book_id}")
            self.print_progress()
            self.make_request("/books/category/1")
            self.print_progress()
            self.make_request("/books/author/1")
            self.print_progress()

    def test_borrows_endpoints(self):
        """Testa todos os endpoints relacionados a empréstimos."""
        print("\n=== Testing Borrows Endpoints ===")
        borrows = self.make_request("/borrows")
        self.print_progress()

        if borrows:
            first_borrow_id = borrows[0].get("id")
            self.make_request(f"/borrows/{first_borrow_id}")
            self.print_progress()
            self.make_request("/borrows/user/1")
            self.print_progress()
            self.make_request("/borrows/book/1")
            self.print_progress()

    def test_categories_endpoints(self):
        """Testa todos os endpoints relacionados a categorias."""
        print("\n=== Testing Categories Endpoints ===")
        categories = self.make_request("/categories")
        self.print_progress()

        if categories:
            first_category_id = categories[0].get("id")
            self.make_request(f"/categories/{first_category_id}")
            self.print_progress()
            self.make_request(f"/categories/{first_category_id}/books")
            self.print_progress()

    def test_users_endpoints(self):
        """Testa todos os endpoints relacionados a usuários."""
        print("\n=== Testing Users Endpoints ===")
        users = self.make_request("/users")
        self.print_progress()

        if users:
            first_user_id = users[0].get("id")
            self.make_request(f"/users/{first_user_id}")
            self.print_progress()

    def run_all_tests(self):
        """Executa todos os testes disponíveis."""
        print("\n=== Starting LibraryHub API Tests ===")
        print(f"Base URL: {self.base_url}")
        print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

        self.test_authors_endpoints()
        self.test_books_endpoints()
        self.test_borrows_endpoints()
        self.test_categories_endpoints()
        self.test_users_endpoints()

        print("\n=== Tests Completed ===")
        print(f"\nFinal Results: {self.successful_tests}/{self.total_tests} tests passed.")

if __name__ == "__main__":
    tester = LibraryHubTester()
    tester.run_all_tests()

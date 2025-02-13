import axios from 'axios'
import { getToken, isTokenValid } from './Auth.ts';

const API_BASE_URL = 'http://localhost:8080/api/books';

export interface BookData {
    bookId: number;
    title: string;
    isbn: string;
    publishYear: number;
    availableCopies: number;
    coverUrl: string;
    authorId: number;
    categoryId: number;
    authorName: string;
    categoryName: string;
    averageRating: number;
    ratingCount: number;
}

export interface RatingData {
    id: number;
    userId: number;
    bookId: number;
    rating: number;
    createdAt: string;
}

// Buscar os livros com parâmetros de paginação
export const fetchBooks = async (page: number = 0, size: number = 20)  => {
    try
    {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}`, {
            params: { page, size },
            headers: headers
        });
        return response.data;
    }
    catch(error)
    {
        console.error("Erro ao buscar livros: ", error);
        throw error;
    }
};


// Buscar quantidade de livros
// NÃO PRECISA DE AUTENTICAÇÃO | NO NEED FOR AUTHENTICATION
export const fetchBooksCount = async () => {
    const endpoint = '/count';

    try
    {
        const response = await axios.get(`${API_BASE_URL + endpoint}`, {
            headers: { 'Content-Type': 'application/json', }
        });
        return response.data;
    }
    catch (error)
    {
        console.error('Erro ao buscar contagem de livros:', error);
        throw error;
    }
}

// Buscar livro por ID
// PRECISA DE AUTENTICAÇÃO
export const fetchBookById = async (id: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/id/${id}`, 
            {
                headers: headers
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livro por ID:', error);
        throw error;
    }
};

// Buscar livros por categoria
// PRECISA DE AUTENTICAÇÃO
export const fetchBooksByCategory = async (categoryId: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`, {
            headers:headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros por categoria:', error);
        throw error;
    }
};

// Buscar livros por autor
export const fetchBooksByAuthor = async (authorId: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/author/${authorId}`, {
            headers:headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros por autor:', error);
        throw error;
    }
};

// Criar novo livro
export const createBook = async (bookData: BookData) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.post(API_BASE_URL, bookData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        throw error;
    }
};

// Atualizar livro
export const updateBook = async (id: number, bookData: Partial<BookData>) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.put(`${API_BASE_URL}/id/${id}`, bookData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        throw error;
    }
};

// Deletar livro
export const deleteBook = async (id: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        await axios.delete(`${API_BASE_URL}/id/${id}`, {
            headers: headers
        });
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        throw error;
    }
};

// Buscar livros por título
export const searchBooks = async (title: string) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { title },
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros por título:', error);
        throw error;
    }
};

// Buscar estatísticas dos livros
export const fetchBookStatistics = async () => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/stats`,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas dos livros:', error);
        throw error;
    }
};

// Adicionar avaliação a um livro
export const addBookRating = async (bookId: number, ratingData: RatingData) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.post(`${API_BASE_URL}/id/${bookId}/ratings`, ratingData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar avaliação:', error);
        throw error;
    }
};

// Não precisa de autenticação
export async function fetchTopRatedBooks(page: number, size: number) {
    try {
        const response = await axios.get('http://localhost:8080/api/books/top-rated', {
            params: {
                page: page,
                size: size
            }
        });
        return response.data["content"];
    } catch (error) {
        console.error('Error fetching top rated books:', error);

        throw error;
    }
}
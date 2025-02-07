import axios from 'axios'

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
    userI: number;
    bookId: number;
    ratin: number;
    createdAt: string;
}

// Buscar os livros com parâmetros de paginação

export const fetchBooks = async (page: number = 0, size: number = 20) => {
    try 
    {
        const response = await axios.get(`${API_BASE_URL}`, {
            params: { page, size }
        });
        return response.data;
    } 
    catch (error) {
        console.error('Erro ao buscar livros:', error);
        throw error;
    }
};

// Buscar quantidade de livros

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
export const fetchBookById = async (id: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/id/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livro por ID:', error);
        throw error;
    }
};

// Buscar livros por categoria
export const fetchBooksByCategory = async (categoryId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros por categoria:', error);
        throw error;
    }
};

// Buscar livros por autor
export const fetchBooksByAuthor = async (authorId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/author/${authorId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros por autor:', error);
        throw error;
    }
};

// Criar novo livro
export const createBook = async (bookData: BookData) => {
    try {
        const response = await axios.post(API_BASE_URL, bookData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        throw error;
    }
};

// Atualizar livro
export const updateBook = async (id: number, bookData: Partial<BookData>) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/id/${id}`, bookData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        throw error;
    }
};

// Deletar livro
export const deleteBook = async (id: number) => {
    try {
        await axios.delete(`${API_BASE_URL}/id/${id}`);
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        throw error;
    }
};

// Buscar livros por título
export const searchBooks = async (title: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { title }
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
        const response = await axios.get(`${API_BASE_URL}/stats`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas dos livros:', error);
        throw error;
    }
};

// Adicionar avaliação a um livro
export const addBookRating = async (bookId: number, ratingData: RatingData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/id/${bookId}/ratings`, ratingData);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar avaliação:', error);
        throw error;
    }
};

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
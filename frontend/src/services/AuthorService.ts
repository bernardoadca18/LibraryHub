import axios from 'axios';
import { getToken, isTokenValid } from './Auth.ts';

const API_BASE_URL = 'http://localhost:8080/api/authors';

export interface AuthorDTO {
    authorId?: number;
    name: string;
    birthDate: string;
}

// Buscar autor por ID
export const fetchAuthorById = async (id: number) => {
    try {
        const token = getToken();
        const headers = token ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/id/${id}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar autor por ID:', error);
        throw error;
    }
};

// Buscar todos os autores
export const fetchAllAuthors = async () => {
    try {
        const token = getToken();
        const headers = token ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(API_BASE_URL, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os autores:', error);
        throw error;
    }
};

// Buscar livros por autor
export const fetchBooksByAuthor = async (authorId: number) => {
    try {
        const token = getToken();
        const headers = token ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/id/${authorId}/books`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros por autor:', error);
        throw error;
    }
};

// Buscar contagem de autores
export const fetchAuthorCount = async () => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/count`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar contagem de autores:', error);
        throw error;
    }
};

// Criar novo autor
export const createAuthor = async (authorData: AuthorDTO) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.post(API_BASE_URL, authorData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar autor:', error);
        throw error;
    }
};

// Atualizar autor
export const updateAuthor = async (id: number, authorData: Partial<AuthorDTO>) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.put(`${API_BASE_URL}/id/${id}`, authorData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar autor:', error);
        throw error;
    }
};

// Deletar autor
export const deleteAuthor = async (id: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        await axios.delete(`${API_BASE_URL}/id/${id}`, {
            headers: headers
        });
    } catch (error) {
        console.error('Erro ao deletar autor:', error);
        throw error;
    }
};

// Buscar autores por título
export const searchAuthors = async (name: string, page: number = 0, size: number = 20) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { name, page, size },
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar autores por nome:', error);
        throw error;
    }
};
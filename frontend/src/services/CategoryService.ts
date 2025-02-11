import axios from 'axios';
import { getToken, isTokenValid } from './Auth.ts';

const API_BASE_URL = 'http://localhost:8080/api/categories';

interface CategoryData {
    name: string;
}

// Buscar categoria por ID
export const fetchCategoryById = async (id: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/id/${id}`, {
            headers:headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar categoria por ID:', error);
        throw error;
    }
};

// Buscar todas as categorias
export const fetchAllCategories = async () => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(API_BASE_URL, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todas as categorias:', error);
        throw error;
    }
};

// Buscar livros por categoria
export const fetchBooksByCategory = async (categoryId: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/id/${categoryId}/books`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros por categoria:', error);
        throw error;
    }
};

// Buscar contagem de categorias
export const fetchCategoryCount = async () => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/count`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar contagem de categorias:', error);
        throw error;
    }
};

// Criar nova categoria
export const createCategory = async (categoryData: CategoryData) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.post(API_BASE_URL, categoryData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        throw error;
    }
};

// Atualizar categoria
export const updateCategory = async (id: number, categoryData: Partial<CategoryData>) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.put(`${API_BASE_URL}/id/${id}`, categoryData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        throw error;
    }
};

// Deletar categoria
export const deleteCategory = async (id: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ?  {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        await axios.delete(`${API_BASE_URL}/id/${id}`, {
            headers: headers
        });
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        throw error;
    }
};
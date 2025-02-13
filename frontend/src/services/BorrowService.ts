import axios from 'axios';
import { getToken, isTokenValid } from './Auth.ts';

const API_BASE_URL = 'http://localhost:8080/api/borrows';

export interface BorrowDTO {
    userId: number;
    bookId: number;
    borrowDate: string;
    returnDate: string;
    dueDate: string
}

// Buscar empréstimo por ID
export const fetchBorrowById = async (id: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/id/${id}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar empréstimo por ID:', error);
        throw error;
    }
};

// Buscar todos os empréstimos
export const fetchAllBorrows = async () => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(API_BASE_URL, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os empréstimos:', error);
        throw error;
    }
};

// Buscar empréstimos por usuário
export const fetchBorrowsByUser = async (userId: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar empréstimos por usuário:', error);
        throw error;
    }
};

// Buscar empréstimos por livro
export const fetchBorrowsByBook = async (bookId: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/book/${bookId}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar empréstimos por livro:', error);
        throw error;
    }
};

// Buscar empréstimos ativos
export const fetchActiveBorrows = async () => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/active`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar empréstimos ativos:', error);
        throw error;
    }
};

// Criar novo empréstimo
export const createBorrow = async (borrowData: BorrowDTO) => {
    try {
        const token = getToken();
        if (!token || !isTokenValid(token)) {
            throw new Error('Token inválido ou expirado');
        }
        
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.post(API_BASE_URL, borrowData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar empréstimo:', error);
        throw error;
    }
};

// Atualizar empréstimo
export const updateBorrow = async (id: number, borrowData: Partial<BorrowDTO>) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.put(`${API_BASE_URL}/id/${id}`, borrowData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar empréstimo:', error);
        throw error;
    }
};

// Deletar empréstimo
export const deleteBorrow = async (id: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        await axios.delete(`${API_BASE_URL}/id/${id}`, {
            headers: headers
        });
    } catch (error) {
        console.error('Erro ao deletar empréstimo:', error);
        throw error;
    }
};

// Buscar estatísticas de empréstimos
export const fetchBorrowStatistics = async () => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/statistics`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas de empréstimos:', error);
        throw error;
    }
};

// Extender período de empréstimo
export const extendBorrowPeriod = async (borrowId: number, additionalDays: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.post(`${API_BASE_URL}/extend`, null, {
            params: { borrowId, additionalDays },
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao extender período de empréstimo:', error);
        throw error;
    }
};
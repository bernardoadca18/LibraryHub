import axios from 'axios';
import { getToken, isTokenValid } from './Auth.ts';
import { API_BASE_URL } from './Api.ts';

export interface BorrowDTO {
    borrowId?: number;
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
        const response = await axios.get(`${API_BASE_URL}/borrows/id/${id}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar empréstimo por ID:', error);
        throw error;
    }
};

// Buscar todos os empréstimos
export const fetchAllBorrows = async (page: number = 0, size: number = 20) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'} : {};
        const response = await axios.get(`${API_BASE_URL}/borrows/all`, {
            headers: headers,
            params: { page, size },
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
        const response = await axios.get(`${API_BASE_URL}/borrows/user/${userId}`, {
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
        const response = await axios.get(`${API_BASE_URL}/borrows/book/${bookId}`, {
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
        const response = await axios.get(`${API_BASE_URL}/borrows/active`, {
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
        const response = await axios.post(`${API_BASE_URL}/borrows`, borrowData, {
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
        const response = await axios.put(`${API_BASE_URL}/borrows/id/${id}`, borrowData, {
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
        await axios.delete(`${API_BASE_URL}/borrows/id/${id}`, {
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
        const response = await axios.get(`${API_BASE_URL}/borrows/statistics`, {
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
        const response = await axios.post(`${API_BASE_URL}/borrows/extend`, null, {
            params: { borrowId, additionalDays },
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao extender período de empréstimo:', error);
        throw error;
    }
};


export const checkActiveBorrow = async (userId: number, bookId: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`} : {};
        const response = await axios.get(`${API_BASE_URL}/borrows/check`, {
            params: { userId, bookId },
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao verificar empréstimo:', error);
        throw error;
    }
};

export const returnBorrow = async (borrowId: number) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`} : {};
        const response = await axios.put(`${API_BASE_URL}/borrows/return/id/${borrowId}`, null, { headers });
        return response.data;
    } catch (error) {
        console.error('Erro ao devolver livro:', error);
        throw error;
    }
};

export const fetchActiveUserBorrows = async (userId: number)  => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) ? {Authorization: `Bearer ${token}`} : {};
        const response = await axios.get(`${API_BASE_URL}/borrows/user/${userId}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar empréstimos ativos:', error);
        throw error;
    }
};
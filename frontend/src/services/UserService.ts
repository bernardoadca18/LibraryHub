import { getToken, isTokenValid } from "./Auth.ts";
import axios from "axios";
import { API_BASE_URL } from "./Api.ts";

export interface UserDTO {
    userId?: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    password?: string;
    role: string;
}

export const fetchUserByUsername = async (username: string) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) 
            ? { Authorization: `Bearer ${token}` } 
            : {};
        
        const response = await axios.get(`${API_BASE_URL}/users/username/${username}`, {
            headers
        });
        
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
};

export const updateUser = async (id: number, userData: UserDTO) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) 
            ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } 
            : {};

        const response = await axios.put(`${API_BASE_URL}/users/id/${id}`, userData, { headers });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};

export const fetchAllUsers = async (page: number = 0, size: number = 20) => {
    try {
        const token = getToken();
        const headers = token && isTokenValid(token) 
            ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } 
            : {};

        const response = await axios.get(`${API_BASE_URL}/users/all`, {
            params: { page, size },
            headers
        });
        
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};
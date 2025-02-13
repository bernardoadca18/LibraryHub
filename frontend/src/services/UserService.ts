import { getToken, isTokenValid } from "./Auth.ts";
import axios from "axios";
import { API_BASE_URL } from "./Api.ts";

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
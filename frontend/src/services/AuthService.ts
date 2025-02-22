import axios from 'axios';
import api from './Api.ts';
import { storeToken } from './Auth.ts';

const API_BASE_URL = 'http://localhost:8080/api/auth';

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    username: string;
    password: string;
    role?: "USER";
    phone: string;
}

export interface LoginResponse {
    token: string;
}

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
    try {
        const response = await api.post(`${API_BASE_URL}/login`, loginData, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (response.data.token) {
            storeToken(response.data.token);
            console.log('Token armazenado:', response.data.token);
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverMessage = error.response?.data?.message || 'Erro desconhecido no servidor';
            throw new Error(`Erro no login: ${serverMessage}`);
        }
        console.error('Erro no login:', error);
        throw error;
    }
};

// Registro de novo administrador
export const register = async (registerData: RegisterData): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/register`, registerData, {
            headers : {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverMessage = error.response?.data?.message || 'Erro desconhecido no servidor';
            throw new Error(`Erro no registro: ${serverMessage}`);
        }
        console.error('Erro no registro:', error);
        throw error;
    }
};

export const registerUser = async (registerData: RegisterData): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/register-user`, registerData, {
            headers : {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverMessage = error.response?.data?.message || 'Erro desconhecido no servidor';
            throw new Error(`Erro no registro: ${serverMessage}`);
        }
        console.error('Erro no registro:', error);
        throw error;
    }
};


axios.interceptors.request.use(request => {
    console.log('Request:', request);
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    console.error('Response Error:', error.response);
    return Promise.reject(error);
});
import axios from 'axios';
import { getToken, isTokenValid, removeToken } from './Auth.ts';

export const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
    'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    response => response,
    error => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
        removeToken();
        window.location.href = '/login';
    }
    return Promise.reject(error);
    }
);

api.interceptors.request.use(config => {
    const token = getToken();
    if (token && !isTokenValid(token)) {
        removeToken();
        window.location.href = '/login';
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        // Verifica se o token é válido com o backend
        try {
            const response = await axios.get(`${API_BASE_URL}/token/validate`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.data) {
                // Token inválido, remove o token e redireciona para o login
                removeToken();
                window.location.href = '/login';
                return config;
            }
        } catch (error) {
            // Erro na validação do token, remove o token e redireciona para o login
            console.log(error);
            removeToken();
            window.location.href = '/login';
            return config;
        }

        // Token válido, adiciona o token ao cabeçalho da requisição
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
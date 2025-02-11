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

export default api;
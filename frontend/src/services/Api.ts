import axios from 'axios';
import { getToken, isTokenValid, removeToken } from './Auth.ts';

export const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
import { fetchUserByUsername } from "./UserService.ts";

export const storeToken = (token: string): void => {
    localStorage.setItem('authToken', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

export const removeToken = (): void => {
    localStorage.removeItem('authToken');
};

export const isTokenValid = (token: string): boolean => {
try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
} catch {
    return false;
}
};

export const getUsernameFromToken = (): string => {
    try {
        const token = getToken();
        if (!token) return 'Conta';
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || 'Usuário';
    } catch {
        return 'Conta';
    }
};

export const getUserIdFromToken = async (): Promise<number> => {
    try {
        const token = getToken();
        if (!token || !isTokenValid(token)) return -1;
        
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload.sub;
        
        const user = await fetchUserByUsername(username);
        return user.userId;
        
    } catch (error) {
        console.error('Erro ao obter ID do usuário:', error);
        return -1;
    }
};
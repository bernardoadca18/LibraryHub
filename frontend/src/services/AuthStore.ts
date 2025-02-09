import { create } from 'zustand';
import { getToken, removeToken, storeToken } from './Auth';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    initialize: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,

    login: (token) => {
        storeToken(token);
        set({ token, isAuthenticated: true })
    },

    logout: () => {
        removeToken();
        set({ token: null, isAuthenticated: false })
    },

    initialize: () => {
        const token = getToken();
        set({ token, isAuthenticated: !!token })
    }
}));


export default useAuthStore;
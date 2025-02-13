import { create } from 'zustand';
import { getToken, removeToken, storeToken } from './Auth';
import axios from 'axios';
import { API_BASE_URL } from './Api.ts';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    darkTheme: boolean;
    login: (token: string) => void;
    logout: () => void;
    initialize: () => void;
    toggleTheme: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,
    darkTheme : true,
    login: (token) => {
        storeToken(token);
        set({ token, isAuthenticated: true })
    },

    logout: () => {
        removeToken();
        set({ token: null, isAuthenticated: false })
    },

    initialize: async () => {
        const token = getToken();
        if (token) {
            try {
                const response = await axios.get(`${API_BASE_URL}/token/validate`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                if (response.data) {
                    set({ token, isAuthenticated: true });
                } else {
                    removeToken();
                    set({ token: null, isAuthenticated: false });
                }
            } catch {
                removeToken();
                set({ token: null, isAuthenticated: false });
            }
        } else {
            removeToken();
            set({ token: null, isAuthenticated: false });
        }
    },
    toggleTheme: () => set((state) => ({ darkTheme: !state.darkTheme })),
}));


export default useAuthStore;
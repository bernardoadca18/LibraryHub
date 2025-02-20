import { useEffect, useState } from 'react';
import { getUsernameFromToken } from '../services/Auth.ts';
import { fetchUserByUsername } from '../services/UserService.ts';
import useAuthStore from '../services/AuthStore.ts';

const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (isAuthenticated) {
                try {
                    const username = getUsernameFromToken();
                    const user = await fetchUserByUsername(username);
                    setIsAdmin(user.role === 'ADMIN');
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                }
            }
        };
        
        checkAdminStatus();
        window.addEventListener('storage', checkAdminStatus);
        return () => window.removeEventListener('storage', checkAdminStatus);
    }, [isAuthenticated]);

    return isAdmin;
};

export default useIsAdmin;
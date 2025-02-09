import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from './AuthStore'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
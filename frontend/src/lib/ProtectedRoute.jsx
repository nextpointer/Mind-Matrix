import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore';
import Loader from '../Components/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, checkAuth, error } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <Loader barcolor="var(--primary-color)" bg="white" />;
  }

  if (error) {
    console.error('Auth error:', error);
  }

  return isAuthenticated ? children : <Navigate to="/user/login" />;
};

export default ProtectedRoute;
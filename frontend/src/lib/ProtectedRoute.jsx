import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore.js';
import Loader from '../Components/Loader';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <Loader barcolor="var(--primary-color)" bg="white" />;
  }

  return currentUser ? children : <Navigate to="/user/login" />;
};

export default ProtectedRoute;
/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authContext'; // Assuming you will create this context

const ProtectedRoute = ({ children }) => {
  console.log(useAuth());
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/user/login" />;
  }

  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import Loader from "../Components/Loader";

const ProtectedRoute = ({ children }) => {
  const currentUser = useAuthStore((s) => s.currentUser);
  const loading = useAuthStore((s) => s.loading);
  if (!children && currentUser) {
    <Navigate to="/user/dashboard" />;
  }

  if (loading) {
    return <Loader barcolor="var(--primary-color)" bg="white" />;
  }

  const isAuthenticated = !!currentUser;
  return isAuthenticated ? children : <Navigate to="/user/login" />;
};

export default ProtectedRoute;

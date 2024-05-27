/* eslint-disable react/prop-types */
// src/components/PrivateRoute.js

import { Navigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const token = Cookies.get('AccessToken');

  return currentUser && token ? children : <Navigate to="/user/login" />;
};

export default ProtectedRoute;

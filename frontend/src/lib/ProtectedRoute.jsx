/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.js

import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useAuth } from './userContext';
import Loader from '../Components/Loader';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('AccessToken');
  const { currentUser, loading } = useAuth();


  console.log("from protec",token);

  if (loading) {
    // If loading, return null or a loading screen
    return (
      <Loader barcolor='var(--primary-color)' bg='white'/>
    );
  }
  

  return token ? children : <Navigate to="/user/login" />;
};

export default ProtectedRoute;

/* eslint-disable react/prop-types */
// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('AccessToken');
      console.log(token);
      if (!token) {
        setCurrentUser(null);
        return;
      }

      try {
          const response = await axios.get('http://localhost:8000/api/v1/user/', {
              headers: { Authorization: `Bearer ${token}` },
            });

        setCurrentUser(response.data.user);
      } catch (error) {
        setCurrentUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

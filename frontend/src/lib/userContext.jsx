// src/context/AuthContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '../Components/Loader';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    console.log("called.. auth");
    
    const checkAuth = async () => {
      const token = Cookies.get('AccessToken'); // Get the token from cookies
      console.log("Token:", token);

      if (!token) {
        setCurrentUser(null); // No token, user is not authenticated
        setLoading(false); // Done checking, stop loading
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/v1/user/', {
          headers: { Authorization: `Bearer ${token}` }, // Correct Authorization header format
        });
        console.log("User:", response.data.user);
        setCurrentUser(response.data.user); // Set the user data
      } catch (error) {
        console.error('Error fetching user:', error);
        setCurrentUser(null); // If the request fails, reset currentUser
      } finally {
        setLoading(false); // Done fetching, stop loading
      }
    };

    checkAuth(); // Run the auth check when the component mounts
  }, []);

  // While loading, show a loading spinner or message
  if (loading) {
    return (
      <Loader barcolor='var(--primary-color)' bg='white'/>
    ); // You can replace this with a loading spinner
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser ,loading}}>
      {children} {/* This will pass down the context to child components */}
    </AuthContext.Provider>
  );
};

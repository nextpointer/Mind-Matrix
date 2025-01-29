import { create } from 'zustand';
import Cookies from 'js-cookie';
import { api } from '../lib/axios.config';

export const useAuthStore = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: (userData, token) => {
    
    Cookies.set('AccessToken', token, { 
      secure: true, 
      sameSite: 'strict',
    });

    set({ 
      currentUser: userData, 
      isAuthenticated: true,
      error: null
    });
  },

  logout: () => {
    Cookies.remove('AccessToken');
    set({ 
      currentUser: null, 
      isAuthenticated: false,
      error: null
    });
  },

  checkAuth: async () => {
    set({ loading: true, error: null });
    const token = Cookies.get('AccessToken');
    
    if (!token) {
      set({ loading: false, isAuthenticated: false });
      return false;
    }

    try {
      const response = await api.get('/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      set({
        currentUser: response.data.user,
        isAuthenticated: true,
        loading: false
      });
      return true;

    } catch (error) {
      Cookies.remove('AccessToken');
      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: error.response?.data?.message || 'Session expired'
      });
      return false;
    }
  }
}));
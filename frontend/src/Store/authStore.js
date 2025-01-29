import { create } from 'zustand';
import Cookies from 'js-cookie';
import { api } from '../lib/axios.config';

export const useAuthStore = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: (userData, token) => {
    console.log("zus",token);
    
    Cookies.set('AccessToken', token, { 
      secure: true, 
      sameSite: 'strict',
      expires: 7 // 7 days
    });
    console.log("done");
    
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
      const response = await api.get('/auth/verify', {
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
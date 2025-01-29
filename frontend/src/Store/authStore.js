import { create } from 'zustand';
import { api } from '../lib/axios.config.js';
import Cookies from 'js-cookie';

export const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,
  
  checkAuth: async () => {
    try {
      const token = Cookies.get('AccessToken');
      if (!token) {
        set({ currentUser: null, loading: false });
        return;
      }
      
      const response = await api.get('/user');
      set({ currentUser: response.data.user, loading: false });
    } catch (error) {
      Cookies.remove('AccessToken');
      set({ currentUser: null, loading: false });
    }
  },

  login: (userData, token) => {
    Cookies.set('AccessToken', token, { secure: true, sameSite: 'strict' });
    set({ currentUser: userData });
  },

  logout: () => {
    Cookies.remove('AccessToken');
    set({ currentUser: null });
  }
}));
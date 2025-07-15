import { create } from 'zustand';
import Cookies from 'js-cookie';
import { api } from '../lib/axios.config';

export const useAuthStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  loading: false,
  error: null,

  login: (userData, token) => {
    Cookies.set('AccessToken', token, { secure: true, sameSite: 'strict' });
    localStorage.setItem('currentUser', JSON.stringify(userData));
    set({ currentUser: userData, error: null });
  },

  logout: () => {
    Cookies.remove('AccessToken');
    localStorage.removeItem('currentUser');
    set({ currentUser: null, error: null });
  },

  checkAuth: async () => {
    set({ loading: true, error: null });
    const token = Cookies.get('AccessToken');

    if (!token) {
      set({ loading: false, currentUser: null });
      return false;
    }

    try {
      const response = await api.get('/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      set({ currentUser: response.data.user, loading: false });
      return true;

    } catch (error) {
      Cookies.remove('AccessToken');
      localStorage.removeItem('currentUser');
      set({
        currentUser: null,
        loading: false,
        error: error.response?.data?.message || 'Session expired',
      });
      return false;
    }
  },
}));
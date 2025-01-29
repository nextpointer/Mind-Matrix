import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useAuthStore = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: (userData, token) => {
    Cookies.set('AccessToken', token, { secure: true, sameSite: 'strict' });
    set({ currentUser: userData, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove('AccessToken');
    set({ currentUser: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = Cookies.get('AccessToken');
    set({ isAuthenticated: !!token });
    return !!token;
  }
}));
import { create } from "zustand";

export const useAlert = create((set) => ({
  alert: {
    type: 'info',
    message: '',
    visible: false,
  },
  
  setAlert: (newAlert) => set({ 
    alert: { 
      ...newAlert, 
      visible: true
    } 
  }),
  
  hideAlert: () => set((state) => ({ 
    alert: { 
      ...state.alert, 
      visible: false 
    } 
  })),
}));

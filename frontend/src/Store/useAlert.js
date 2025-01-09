import { create } from "zustand";

export const useAlert = create((set) => ({
    alert: { type: "", message: "", visible: false },
    setAlert: (alert) => set({ alert }),
}));
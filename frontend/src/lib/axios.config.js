import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_DEV,
  withCredentials: true, // This is crucial for cookies
  headers: {
    "Content-Type": "application/json",
  },
});


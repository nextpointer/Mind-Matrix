import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // This is crucial for cookies
  headers: {
    "Content-Type": "application/json",
  },
});


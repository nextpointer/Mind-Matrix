import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // This is crucial for cookies
  headers: {
    "Content-Type": "application/json",
  },
});


// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = Cookies.get('AccessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {api};
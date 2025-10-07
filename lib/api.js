import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan token jika tersedia
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default api;

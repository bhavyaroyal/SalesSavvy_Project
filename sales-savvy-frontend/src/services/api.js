import axios from "axios";

const API = axios.create({
  baseURL: "https://sales-savvy-backend-ejlo.onrender.com/api"
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {

    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);


export default api;

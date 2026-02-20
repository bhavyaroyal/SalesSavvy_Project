import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};

// src/services/auth.js

export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
  };
  

// src/services/auth.js
import axios from 'axios';

// Cấu hình API
const API_URL = "http://127.0.0.1:8000/api/v1"; // Đổi thành URL của API của bạn

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  return response; 
};

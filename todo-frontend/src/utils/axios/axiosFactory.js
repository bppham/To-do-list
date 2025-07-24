// src/utils/axiosFactory.js
import axios from "axios";

const API_URL = "http://localhost:8000/api";

/**
 * Factory tạo ra instance axios tùy có token hay không.
 * @param {boolean} withAuth - true nếu muốn tự động thêm token
 * @returns {AxiosInstance}
 */
export function createAxiosInstance(withAuth = false) {
  const instance = axios.create({
    baseURL: API_URL,
  });

  if (withAuth) {
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  return instance;
}

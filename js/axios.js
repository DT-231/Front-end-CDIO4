// file: ./js/axios.js
import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm";

const request = axios.create({
  baseURL: "http://20.2.234.37:8000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const { response } = error;

    return Promise.reject({
      status: response?.status,
      data: response?.data,
      message: response?.data?.detail || error.message,
    });
  }
);



export default request;

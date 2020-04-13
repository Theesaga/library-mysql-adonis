import axios from "axios";

// Create instance of axios to point to the correct ip+port
export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  timeout: 1000,
});
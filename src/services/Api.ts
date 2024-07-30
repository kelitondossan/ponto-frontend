// src/services/Api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL base do seu backend
});

export default api;

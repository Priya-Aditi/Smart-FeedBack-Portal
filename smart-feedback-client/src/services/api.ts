import axios from 'axios';

const API_BASE = 'https://localhost:5237/api'; // Use your backend port

const api = axios.create({
  baseURL: API_BASE,
});

export const register = (data: any) => api.post('/auth/register', data);
export const login = (data: any) => api.post('/auth/login', data);
export const submitFeedback = (data: any, token: string) =>
  api.post('/feedback', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyFeedback = (token: string) =>
  api.get('/feedback/my', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllFeedback = (token: string) =>
  api.get('/feedback', {
    headers: { Authorization: `Bearer ${token}` },
  });

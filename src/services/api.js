import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  const response = await API.post('/login', { email, password });
  return response.data.token;
};

export const fetchUsers = async (token) => {
  const response = await API.get('/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://bebleet-auth-back.onrender.com';

export const axiosInstance = axios.create({
  baseURL,
});

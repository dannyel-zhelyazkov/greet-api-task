import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_GREET_API_BASE_URL,
});

import axios from 'axios';

export const http = (token?: string) => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true
  });
};

import axios from 'axios';

export const createHttpClient = (token?: string) => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

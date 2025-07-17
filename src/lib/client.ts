import axios from 'axios';


// const API_BASE_URL = 'https://booking-com15.p.rapidapi.com';
const NEXT_BASE_URL = process.env.NEXT_BASE_URL || "https://booking-com15.p.rapidapi.com/api/v1";

export const apiClient = axios.create({
  baseURL: NEXT_BASE_URL,
  headers: {
    'x-rapidapi-key':'6272bd8fa2msh774c335bbaadf31p175a37jsna6255257b6e5',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
});



apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
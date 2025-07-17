import axios from 'axios';


const API_BASE_URL = 'https://booking-com15.p.rapidapi.com';
// const NEXT_BASE_URL = process.env.NEXT_BASE_URL || API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
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
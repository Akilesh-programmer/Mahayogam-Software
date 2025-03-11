// import axios from 'axios';

// const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const API = axios.create({
//   baseURL: VITE_API_BASE_URL,
// });

// // Add a response interceptor
// API.interceptors.response.use(
//   (response) => response, // Pass valid responses
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Token expired: Clear storage & redirect to login only once
//       localStorage.removeItem('jwtToken');

//       if (window.location.pathname !== '/') {
//         window.location.replace('/'); // Redirect to login
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: VITE_API_BASE_URL,
});

// Attach token automatically for all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Token might be expired. Redirecting to login...');

      // Clear token
      localStorage.removeItem('jwtToken');

      // Redirect only if not already on the login page
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default API;

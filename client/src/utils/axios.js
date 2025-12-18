import axios from 'axios';

// L'adresse de votre Backend HTTPS
const instance = axios.create({
  baseURL: 'https://localhost:5000/api'
});

// Intercepteur : Ajoute le token automatiquement s'il existe
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
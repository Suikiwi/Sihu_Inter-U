import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adjuntar el token de acceso en cada petición
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;

/* Ejemplo de uso:
   import api from './api';

   api.get('publicaciones/mias/')
     .then(res => console.log(res.data))
     .catch(err => console.error(err));
*/

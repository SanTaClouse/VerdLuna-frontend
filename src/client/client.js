import axios from 'axios';
import API_CONFIG from '../config/config'

// Crear instancia de Axios configurada
const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.DEFAULT_HEADERS,
});

// Interceptor de REQUEST - Agregar token automáticamente
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de RESPONSE - Manejar errores globalmente
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Manejar errores comunes
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Token expirado o inválido
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                    // Redirigir a login si no estamos ya ahí
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    break;
                case 403:
                    console.error('No tienes permisos para esta acción');
                    break;
                case 404:
                    console.error('Recurso no encontrado');
                    break;
                case 500:
                    console.error('Error del servidor');
                    break;
                default:
                    console.error('Error de red:', error.message);
            }
        } else if (error.request) {
            // La petición se hizo pero no hubo respuesta
            console.error('No se pudo conectar con el servidor');
        }

        return Promise.reject(error);
    }
);

export default apiClient;
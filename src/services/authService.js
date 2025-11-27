import apiClient from '../client/client'
import { ENDPOINTS } from '../config/config'

const authService = {
    /**
     * Iniciar sesión
     * @param {string} usuario 
     * @param {string} password 
     * @returns {Promise<{user: object, token: string}>}
     */
    async login(usuario, password) {
        try {
            const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, {
                usuario,
                password
            });

            const { user, token } = response.data;

            // Guardar en localStorage
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return { success: true, user, token };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al iniciar sesión';
            return { success: false, error: message };
        }
    },

    /**
     * Cerrar sesión
     */
    async logout() {
        try {
            await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            // Ignorar errores de logout
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        }
    },

    /**
     * Obtener usuario actual del localStorage
     * @returns {object|null}
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    /**
     * Verificar si hay sesión activa
     * @returns {boolean}
     */
    isAuthenticated() {
        return !!localStorage.getItem('auth_token');
    },

    /**
     * Obtener token actual
     * @returns {string|null}
     */
    getToken() {
        return localStorage.getItem('auth_token');
    },

    /**
     * Verificar token con el servidor
     * @returns {Promise<object>}
     */
    async verifyToken() {
        try {
            const response = await apiClient.get(ENDPOINTS.AUTH.ME);
            return { valid: true, user: response.data };
        } catch (error) {
            return { valid: false, user: null };
        }
    }
};

export default authService;
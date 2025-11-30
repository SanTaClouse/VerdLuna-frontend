import apiClient from '../client/client';
import { ENDPOINTS } from '../config/config';
import { User, LoginResult, VerifyTokenResult } from '../types';

const authService = {
  /**
   * Iniciar sesión
   */
  async login(usuario: string, password: string): Promise<LoginResult> {
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
    } catch (error: any) {
      console.error('Error en login:', error);

      // Intentar extraer el mensaje de error del backend
      let message = 'Error al iniciar sesión';

      if (error.response) {
        // El servidor respondió con un código de error
        if (error.response.status === 401) {
          message = 'Usuario o contraseña incorrectos';
        } else if (error.response.data?.message) {
          message = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          message = error.response.data;
        }
      } else if (error.request) {
        // La solicitud se envió pero no hubo respuesta
        message = 'No se pudo conectar con el servidor. Verifica tu conexión.';
      } else {
        // Error al configurar la solicitud
        message = error.message || 'Error inesperado al iniciar sesión';
      }

      return { success: false, error: message };
    }
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
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
   */
  getCurrentUser(): User | null {
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
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Obtener token actual
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  /**
   * Verificar token con el servidor
   */
  async verifyToken(): Promise<VerifyTokenResult> {
    try {
      const response = await apiClient.get(ENDPOINTS.AUTH.ME);
      return { valid: true, user: response.data.user };
    } catch (error) {
      return { valid: false, user: undefined };
    }
  }
};

export default authService;

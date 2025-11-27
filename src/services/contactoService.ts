import apiClient from '../client/client';
import { ENDPOINTS } from '../config/config';
import { ApiResponse } from '../types';

interface ContactoData {
  nombre: string;
  telefono: string;
  email: string;
  asunto: string;
  mensaje: string;
}

interface SolicitudMayoristaData {
  nombre: string;
  comercio: string;
  telefono: string;
  email: string;
  productos: string;
  mensaje: string;
}

const contactoService = {
  /**
   * Enviar formulario de contacto general
   */
  async enviarContacto(data: ContactoData): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(ENDPOINTS.CONTACTO.GENERAL, data);
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al enviar mensaje';
      return { success: false, error: message };
    }
  },

  /**
   * Enviar solicitud de cotización mayorista
   */
  async enviarSolicitudMayorista(data: SolicitudMayoristaData): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(ENDPOINTS.CONTACTO.MAYORISTA, data);
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al enviar solicitud';
      return { success: false, error: message };
    }
  }
};

export default contactoService;

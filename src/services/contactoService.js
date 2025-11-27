import apiClient from '../client/client'
import { ENDPOINTS } from '../config/config'

const contactoService = {
    /**
     * Enviar formulario de contacto general
     * @param {object} data - {nombre, telefono, email, asunto, mensaje}
     * @returns {Promise<object>}
     */
    async enviarContacto(data) {
        try {
            const response = await apiClient.post(ENDPOINTS.CONTACTO.GENERAL, data);
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al enviar mensaje';
            return { success: false, error: message };
        }
    },

    /**
     * Enviar solicitud de cotización mayorista
     * @param {object} data - {nombre, comercio, telefono, email, productos, mensaje}
     * @returns {Promise<object>}
     */
    async enviarSolicitudMayorista(data) {
        try {
            const response = await apiClient.post(ENDPOINTS.CONTACTO.MAYORISTA, data);
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al enviar solicitud';
            return { success: false, error: message };
        }
    }
};

export default contactoService;
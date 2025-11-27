import apiClient from '../client/client'
import { ENDPOINTS } from '../config/config'

const clientesService = {
    /**
     * Obtener todos los clientes
     * @returns {Promise<Array>}
     */
    async getAll() {
        try {
            const response = await apiClient.get(ENDPOINTS.CLIENTES.BASE);
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al cargar clientes';
            return { success: false, error: message, data: [] };
        }
    },

    /**
     * Obtener cliente por ID
     * @param {string} id 
     * @returns {Promise<object>}
     */
    async getById(id) {
        try {
            const response = await apiClient.get(ENDPOINTS.CLIENTES.BY_ID(id));
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al cargar cliente';
            return { success: false, error: message, data: null };
        }
    },

    /**
     * Crear nuevo cliente
     * @param {object} clienteData 
     * @returns {Promise<object>}
     */
    async create(clienteData) {
        try {
            const response = await apiClient.post(ENDPOINTS.CLIENTES.BASE, clienteData);
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al crear cliente';
            return { success: false, error: message };
        }
    },

    /**
     * Actualizar cliente
     * @param {string} id 
     * @param {object} clienteData 
     * @returns {Promise<object>}
     */
    async update(id, clienteData) {
        try {
            const response = await apiClient.patch(ENDPOINTS.CLIENTES.BY_ID(id), clienteData);
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al actualizar cliente';
            return { success: false, error: message };
        }
    },

    /**
     * Eliminar cliente
     * @param {string} id 
     * @returns {Promise<object>}
     */
    async delete(id) {
        try {
            await apiClient.delete(ENDPOINTS.CLIENTES.BY_ID(id));
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al eliminar cliente';
            return { success: false, error: message };
        }
    },

    /**
     * Obtener pedidos de un cliente
     * @param {string} clienteId 
     * @returns {Promise<Array>}
     */
    async getPedidos(clienteId) {
        try {
            const response = await apiClient.get(ENDPOINTS.CLIENTES.PEDIDOS(clienteId));
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al cargar pedidos del cliente';
            return { success: false, error: message, data: [] };
        }
    }
};

export default clientesService;
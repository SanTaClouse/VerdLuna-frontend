import apiClient from '../client/client'
import { ENDPOINTS } from '../config/config'

const pedidosService = {
    /**
     * Obtener todos los pedidos
     * @param {object} filtros - Filtros opcionales
     * @returns {Promise<Array>}
     */
    async getAll(filtros = {}) {
        try {
            const params = new URLSearchParams();

            if (filtros.cliente && filtros.cliente !== 'todos') {
                params.append('cliente', filtros.cliente);
            }
            if (filtros.estado && filtros.estado !== 'todos') {
                params.append('estado', filtros.estado);
            }
            if (filtros.fechaDesde) {
                params.append('fechaDesde', filtros.fechaDesde);
            }
            if (filtros.fechaHasta) {
                params.append('fechaHasta', filtros.fechaHasta);
            }

            const url = params.toString()
                ? `${ENDPOINTS.PEDIDOS.BASE}?${params.toString()}`
                : ENDPOINTS.PEDIDOS.BASE;

            const response = await apiClient.get(url);
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al cargar pedidos';
            return { success: false, error: message, data: [] };
        }
    },

    /**
     * Obtener pedido por ID
     * @param {string|number} id 
     * @returns {Promise<object>}
     */
    async getById(id) {
        try {
            const response = await apiClient.get(ENDPOINTS.PEDIDOS.BY_ID(id));
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al cargar pedido';
            return { success: false, error: message, data: null };
        }
    },

    /**
     * Crear nuevo pedido
     * @param {object} pedidoData 
     * @returns {Promise<object>}
     */
    async create(pedidoData) {
        try {
            const response = await apiClient.post(ENDPOINTS.PEDIDOS.BASE, pedidoData);
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al crear pedido';
            return { success: false, error: message };
        }
    },

    /**
     * Actualizar pedido
     * @param {string|number} id 
     * @param {object} pedidoData 
     * @returns {Promise<object>}
     */
    async update(id, pedidoData) {
        try {
            const response = await apiClient.patch(ENDPOINTS.PEDIDOS.BY_ID(id), pedidoData);
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al actualizar pedido';
            return { success: false, error: message };
        }
    },

    /**
     * Marcar pedido como pagado
     * @param {string|number} id 
     * @returns {Promise<object>}
     */
    async marcarComoPago(id) {
        try {
            const response = await apiClient.patch(ENDPOINTS.PEDIDOS.MARCAR_PAGO(id));
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al marcar como pago';
            return { success: false, error: message };
        }
    },

    /**
     * Actualizar abono parcial
     * @param {string|number} id 
     * @param {number} nuevoAbono 
     * @returns {Promise<object>}
     */
    async actualizarAbono(id, nuevoAbono) {
        try {
            const response = await apiClient.patch(ENDPOINTS.PEDIDOS.BY_ID(id), {
                precioAbonado: nuevoAbono
            });
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al actualizar abono';
            return { success: false, error: message };
        }
    },

    /**
     * Eliminar pedido
     * @param {string|number} id 
     * @returns {Promise<object>}
     */
    async delete(id) {
        try {
            await apiClient.delete(ENDPOINTS.PEDIDOS.BY_ID(id));
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al eliminar pedido';
            return { success: false, error: message };
        }
    },

    /**
     * Obtener pedidos de un cliente específico
     * @param {string} clienteId 
     * @returns {Promise<Array>}
     */
    async getByCliente(clienteId) {
        try {
            const response = await apiClient.get(ENDPOINTS.PEDIDOS.POR_CLIENTE(clienteId));
            return { success: true, data: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Error al cargar pedidos del cliente';
            return { success: false, error: message, data: [] };
        }
    }
};

export default pedidosService;
import apiClient from '../client/client';
import { ENDPOINTS } from '../config/config';
import { Cliente, ClienteData, Pedido, ApiResponse } from '../types';

const clientesService = {
  /**
   * Obtener todos los clientes
   */
  async getAll(): Promise<ApiResponse<Cliente[]>> {
    try {
      const response = await apiClient.get(ENDPOINTS.CLIENTES.BASE);
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar clientes';
      return { success: false, error: message, data: [] };
    }
  },

  /**
   * Obtener cliente por ID
   */
  async getById(id: string): Promise<ApiResponse<Cliente>> {
    try {
      const response = await apiClient.get(ENDPOINTS.CLIENTES.BY_ID(id));
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar cliente';
      return { success: false, error: message };
    }
  },

  /**
   * Crear nuevo cliente
   */
  async create(clienteData: ClienteData): Promise<ApiResponse<Cliente>> {
    try {
      const response = await apiClient.post(ENDPOINTS.CLIENTES.BASE, clienteData);
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al crear cliente';
      return { success: false, error: message };
    }
  },

  /**
   * Actualizar cliente
   */
  async update(id: string, clienteData: Partial<Cliente>): Promise<ApiResponse<Cliente>> {
    try {
      const response = await apiClient.patch(ENDPOINTS.CLIENTES.BY_ID(id), clienteData);
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al actualizar cliente';
      return { success: false, error: message };
    }
  },

  /**
   * Eliminar cliente
   */
  async delete(id: string): Promise<ApiResponse> {
    try {
      await apiClient.delete(ENDPOINTS.CLIENTES.BY_ID(id));
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al eliminar cliente';
      return { success: false, error: message };
    }
  },

  /**
   * Obtener pedidos de un cliente
   */
  async getPedidos(clienteId: string): Promise<ApiResponse<Pedido[]>> {
    try {
      const response = await apiClient.get(ENDPOINTS.CLIENTES.PEDIDOS(clienteId));
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar pedidos del cliente';
      return { success: false, error: message, data: [] };
    }
  }
};

export default clientesService;

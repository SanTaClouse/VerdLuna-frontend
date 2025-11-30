import apiClient from '../client/client';
import { ENDPOINTS } from '../config/config';
import { Pedido, PedidoData, FiltrosPedidos, ApiResponse } from '../types';

const pedidosService = {
  /**
   * Obtener todos los pedidos
   */
  async getAll(filtros: Partial<FiltrosPedidos> = {}): Promise<ApiResponse<Pedido[]>> {
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
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar pedidos';
      return { success: false, error: message, data: [] };
    }
  },

  /**
   * Obtener pedido por ID
   */
  async getById(id: string | number): Promise<ApiResponse<Pedido>> {
    try {
      const response = await apiClient.get(ENDPOINTS.PEDIDOS.BY_ID(id));
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar pedido';
      return { success: false, error: message };
    }
  },

  /**
   * Crear nuevo pedido
   */
  async create(pedidoData: PedidoData): Promise<ApiResponse<Pedido>> {
    try {
      const response = await apiClient.post(ENDPOINTS.PEDIDOS.BASE, pedidoData);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al crear pedido';
      return { success: false, error: message };
    }
  },

  /**
   * Actualizar pedido
   */
  async update(id: string | number, pedidoData: Partial<PedidoData>): Promise<ApiResponse<Pedido>> {
    try {
      const response = await apiClient.patch(ENDPOINTS.PEDIDOS.BY_ID(id), pedidoData);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al actualizar pedido';
      return { success: false, error: message };
    }
  },

  /**
   * Marcar pedido como pagado
   */
  async marcarComoPago(id: string | number): Promise<ApiResponse<Pedido>> {
    try {
      const response = await apiClient.patch(ENDPOINTS.PEDIDOS.MARCAR_PAGO(id));
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al marcar como pago';
      return { success: false, error: message };
    }
  },

  /**
   * Actualizar abono parcial
   */
  async actualizarAbono(id: string | number, nuevoAbono: number): Promise<ApiResponse<Pedido>> {
    try {
      const response = await apiClient.patch(ENDPOINTS.PEDIDOS.ACTUALIZAR_ESTADO(id), {
        precioAbonado: nuevoAbono
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al actualizar abono';
      return { success: false, error: message };
    }
  },

  /**
   * Eliminar pedido
   */
  async delete(id: string | number): Promise<ApiResponse> {
    try {
      await apiClient.delete(ENDPOINTS.PEDIDOS.BY_ID(id));
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al eliminar pedido';
      return { success: false, error: message };
    }
  },

  /**
   * Obtener pedidos de un cliente específico
   */
  async getByCliente(clienteId: string): Promise<ApiResponse<Pedido[]>> {
    try {
      const response = await apiClient.get(ENDPOINTS.PEDIDOS.POR_CLIENTE(clienteId));
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar pedidos del cliente';
      return { success: false, error: message, data: [] };
    }
  }
};

export default pedidosService;

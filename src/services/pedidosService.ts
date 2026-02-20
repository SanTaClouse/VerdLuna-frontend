import apiClient from '../client/client';
import { ENDPOINTS } from '../config/config';
import { Pedido, PedidoData, FiltrosPedidos, EstadisticasPedidos, ApiResponse } from '../types';

const pedidosService = {
  /**
   * Obtener pedidos paginados con filtros opcionales
   */
  async getAll(
    filtros: Partial<FiltrosPedidos> = {},
    page = 1,
    limit = 20,
  ): Promise<ApiResponse<{ data: Pedido[]; total: number; page: number; totalPages: number }>> {
    try {
      const params = new URLSearchParams();

      // filtros.cliente ahora almacena el ID del cliente
      if (filtros.cliente && filtros.cliente !== 'todos') {
        params.append('clienteId', filtros.cliente);
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
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await apiClient.get(`${ENDPOINTS.PEDIDOS.BASE}?${params.toString()}`);
      return {
        success: true,
        data: {
          data: response.data.data,
          total: response.data.total,
          page: response.data.page,
          totalPages: response.data.totalPages,
        },
      };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar pedidos';
      return { success: false, error: message };
    }
  },

  /**
   * Obtener estadísticas de pedidos (sobre todos los resultados, sin paginación)
   */
  async getEstadisticas(filtros: Partial<FiltrosPedidos> = {}): Promise<ApiResponse<EstadisticasPedidos>> {
    try {
      const params = new URLSearchParams();

      if (filtros.cliente && filtros.cliente !== 'todos') {
        params.append('clienteId', filtros.cliente);
      }
      if (filtros.estado && filtros.estado !== 'todos') {
        params.append('estado', filtros.estado);
      }
      if (filtros.fechaDesde) params.append('fechaDesde', filtros.fechaDesde);
      if (filtros.fechaHasta) params.append('fechaHasta', filtros.fechaHasta);

      const url = params.toString()
        ? `${ENDPOINTS.PEDIDOS.ESTADISTICAS}?${params.toString()}`
        : ENDPOINTS.PEDIDOS.ESTADISTICAS;

      const response = await apiClient.get(url);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar estadísticas';
      return { success: false, error: message };
    }
  },

  /**
   * Obtener reporte completo: estadísticas, desglose mensual y top clientes
   */
  async getReportes(meses = 6): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(`${ENDPOINTS.PEDIDOS.REPORTES}?meses=${meses}`);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar reportes';
      return { success: false, error: message };
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
  async create(pedidoData: PedidoData): Promise<ApiResponse<{ pedido: Pedido; whatsappLink: string }>> {
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
   * Actualizar abono parcial (añade el monto al precio abonado existente)
   */
  async actualizarPrecioAbonado(id: string | number, monto: number): Promise<ApiResponse<Pedido>> {
    try {
      const response = await apiClient.patch(ENDPOINTS.PEDIDOS.ACTUALIZAR_PRECIO_ABONADO(id), {
        monto
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al actualizar precio abonado';
      return { success: false, error: message };
    }
  },

  /**
   * Actualizar abono parcial (reemplaza el precio abonado completo)
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
  },

  /**
   * Obtener link de WhatsApp para un pedido
   */
  async getWhatsappLink(id: string | number): Promise<ApiResponse<{ whatsappLink: string }>> {
    try {
      const response = await apiClient.get(ENDPOINTS.PEDIDOS.WHATSAPP_LINK(id));
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al generar link de WhatsApp';
      return { success: false, error: message };
    }
  },

  /**
   * Marcar link de WhatsApp como enviado
   */
  async marcarWhatsappEnviado(id: string | number): Promise<ApiResponse<Pedido>> {
    try {
      const response = await apiClient.patch(ENDPOINTS.PEDIDOS.WHATSAPP_ENVIADO(id));
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al marcar WhatsApp como enviado';
      return { success: false, error: message };
    }
  }
};

export default pedidosService;

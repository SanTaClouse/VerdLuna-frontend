import apiClient from '../client/client';
import { ENDPOINTS } from '../config/config';
import { ApiResponse, Producto, StockItem, HistorialItem, AjustarStockPayload } from '../types';

const mercaderiaService = {
  async getProductos(): Promise<ApiResponse<Producto[]>> {
    try {
      const response = await apiClient.get(ENDPOINTS.MERCADERIA.PRODUCTOS);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar productos',
        data: [],
      };
    }
  },

  async getStock(sucursalId: number): Promise<ApiResponse<StockItem[]>> {
    try {
      const response = await apiClient.get(ENDPOINTS.MERCADERIA.STOCK(sucursalId));
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar stock',
        data: [],
      };
    }
  },

  async ajustarStock(
    sucursalId: number,
    productoId: string,
    payload: AjustarStockPayload,
  ): Promise<ApiResponse<{ stock: number; updatedAt: string }>> {
    try {
      const response = await apiClient.patch(
        ENDPOINTS.MERCADERIA.AJUSTAR_STOCK(sucursalId, productoId),
        payload,
      );
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al ajustar stock',
      };
    }
  },

  async getHistorial(sucursalId: number): Promise<ApiResponse<HistorialItem[]>> {
    try {
      const response = await apiClient.get(ENDPOINTS.MERCADERIA.HISTORIAL(sucursalId));
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar historial',
        data: [],
      };
    }
  },

  async seed(): Promise<ApiResponse<{ insertados: number; mensaje: string }>> {
    try {
      const response = await apiClient.post(ENDPOINTS.MERCADERIA.SEED);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error en seed',
      };
    }
  },
};

export default mercaderiaService;

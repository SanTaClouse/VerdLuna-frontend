import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { pedidosService, clientesService } from '../services';
import {
  Pedido,
  FiltrosPedidos,
  EstadisticasPedidos,
  ClienteUnico,
  PedidoData,
  ApiResponse,
  PaginacionState,
} from '../types';

interface PedidosContextType {
  pedidos: Pedido[];
  clientesUnicos: ClienteUnico[];
  loading: boolean;
  error: string | null;
  filtros: FiltrosPedidos;
  setFiltros: (value: React.SetStateAction<FiltrosPedidos>) => void;
  cargarPedidos: () => Promise<void>;
  agregarPedido: (pedidoData: PedidoData) => Promise<ApiResponse<Pedido>>;
  actualizarEstadoPago: (pedidoId: number | string) => Promise<ApiResponse>;
  actualizarAbonoParcial: (pedidoId: number | string, nuevoAbono: number) => Promise<ApiResponse>;
  eliminarPedido: (pedidoId: number | string) => Promise<ApiResponse>;
  pedidosFiltrados: Pedido[];
  estadisticas: EstadisticasPedidos;
  paginacion: PaginacionState;
  setPage: (page: number) => void;
}

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

interface PedidosProviderProps {
  children: ReactNode;
}

const ESTADISTICAS_VACIAS: EstadisticasPedidos = {
  totalVentas: 0,
  totalCobrado: 0,
  totalPendiente: 0,
  cantidadPagos: 0,
  cantidadImpagos: 0,
  cantidadTotal: 0,
};

export const PedidosProvider = ({ children }: PedidosProviderProps) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientesUnicos, setClientesUnicos] = useState<ClienteUnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estadisticasData, setEstadisticasData] = useState<EstadisticasPedidos>(ESTADISTICAS_VACIAS);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const LIMIT = 20;

  const [filtros, setFiltrosState] = useState<FiltrosPedidos>({
    cliente: 'todos',
    estado: 'todos',
    fechaDesde: '',
    fechaHasta: '',
  });

  // Wrapper que resetea la página al cambiar filtros
  const setFiltros = (value: React.SetStateAction<FiltrosPedidos>) => {
    setFiltrosState(value);
    setCurrentPage(1);
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  // Cargar clientes una sola vez al montar
  useEffect(() => {
    cargarClientes();
  }, []);

  // Recargar pedidos cuando cambia la página o los filtros
  useEffect(() => {
    cargarPedidos();
  }, [currentPage, filtros]); // eslint-disable-line react-hooks/exhaustive-deps

  // Recargar estadísticas cuando cambian los filtros (independiente de la página)
  useEffect(() => {
    cargarEstadisticas();
  }, [filtros]); // eslint-disable-line react-hooks/exhaustive-deps

  const cargarPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await pedidosService.getAll(filtros, currentPage, LIMIT);
      if (result.success && result.data) {
        setPedidos(result.data.data);
        setTotalPages(result.data.totalPages);
        setTotalRecords(result.data.total);
      } else {
        setError(result.error || 'Error al cargar pedidos');
      }
    } catch (err) {
      setError('Error al cargar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const result = await pedidosService.getEstadisticas(filtros);
      if (result.success && result.data) {
        setEstadisticasData(result.data);
      }
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    }
  };

  const cargarClientes = async () => {
    try {
      const result = await clientesService.getAll();
      if (result.success && result.data) {
        setClientesUnicos(result.data.map(c => ({ id: c.id, nombre: c.nombre })));
      }
    } catch (err) {
      console.error('Error al cargar clientes:', err);
    }
  };

  const agregarPedido = async (pedidoData: PedidoData): Promise<ApiResponse<Pedido>> => {
    try {
      const result = await pedidosService.create(pedidoData);
      if (result.success && result.data) {
        await cargarPedidos();
        await cargarEstadisticas();
        return { success: true, data: result.data.pedido };
      }
      return { success: false, error: result.error };
    } catch (err) {
      console.error('Error al agregar pedido:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  const actualizarEstadoPago = async (pedidoId: number | string): Promise<ApiResponse> => {
    try {
      const result = await pedidosService.marcarComoPago(pedidoId);
      if (result.success && result.data) {
        setPedidos(prev => prev.map(p => p.id === pedidoId ? result.data! : p));
        await cargarEstadisticas();
      }
      return result;
    } catch (err) {
      console.error('Error al actualizar estado:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  const actualizarAbonoParcial = async (pedidoId: number | string, nuevoAbono: number): Promise<ApiResponse> => {
    try {
      const result = await pedidosService.actualizarAbono(pedidoId, nuevoAbono);
      if (result.success && result.data) {
        setPedidos(prev => prev.map(p => p.id === pedidoId ? result.data! : p));
        await cargarEstadisticas();
      }
      return result;
    } catch (err) {
      console.error('Error al actualizar abono:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  const eliminarPedido = async (pedidoId: number | string): Promise<ApiResponse> => {
    try {
      const result = await pedidosService.delete(pedidoId);
      if (result.success) {
        await cargarPedidos();
        await cargarEstadisticas();
      }
      return result;
    } catch (err) {
      console.error('Error al eliminar pedido:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  const paginacion: PaginacionState = {
    page: currentPage,
    totalPages,
    total: totalRecords,
    limit: LIMIT,
  };

  const value: PedidosContextType = {
    pedidos,
    clientesUnicos,
    loading,
    error,
    filtros,
    setFiltros,
    cargarPedidos,
    agregarPedido,
    actualizarEstadoPago,
    actualizarAbonoParcial,
    eliminarPedido,
    pedidosFiltrados: pedidos,
    estadisticas: estadisticasData,
    paginacion,
    setPage,
  };

  return (
    <PedidosContext.Provider value={value}>
      {children}
    </PedidosContext.Provider>
  );
};

// Hook personalizado
export const usePedidos = (): PedidosContextType => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos debe usarse dentro de un PedidosProvider');
  }
  return context;
};

export default PedidosContext;

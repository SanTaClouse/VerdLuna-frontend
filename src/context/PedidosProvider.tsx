import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react';
import { pedidosService, clientesService } from '../services';
import {
  Pedido,
  FiltrosPedidos,
  EstadisticasPedidos,
  ClienteUnico,
  PedidoData,
  ApiResponse
} from '../types';

// Datos mock para desarrollo (eliminar cuando el backend esté listo)
import pedidosMock from '../helpers/pedidos';

interface PedidosContextType {
  pedidos: Pedido[];
  clientesUnicos: ClienteUnico[];
  loading: boolean;
  error: string | null;
  filtros: FiltrosPedidos;
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosPedidos>>;
  cargarPedidos: () => Promise<void>;
  agregarPedido: (pedidoData: PedidoData) => Promise<ApiResponse<Pedido>>;
  actualizarEstadoPago: (pedidoId: number | string) => Promise<ApiResponse>;
  actualizarAbonoParcial: (pedidoId: number | string, nuevoAbono: number) => Promise<ApiResponse>;
  eliminarPedido: (pedidoId: number | string) => Promise<ApiResponse>;
  pedidosFiltrados: Pedido[];
  estadisticas: EstadisticasPedidos;
}

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

// Variable para cambiar entre mock y API real
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || true; // Cambiar a false cuando tengas backend

interface PedidosProviderProps {
  children: ReactNode;
}

export const PedidosProvider = ({ children }: PedidosProviderProps) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientesUnicos, setClientesUnicos] = useState<ClienteUnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filtros, setFiltros] = useState<FiltrosPedidos>({
    cliente: 'todos',
    estado: 'todos',
    fechaDesde: '',
    fechaHasta: ''
  });

  // Cargar pedidos al montar
  useEffect(() => {
    cargarPedidos();
    cargarClientes();
  }, []);

  // Cargar pedidos
  const cargarPedidos = async () => {
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK) {
        // Usar datos mock
        await new Promise(resolve => setTimeout(resolve, 300));
        setPedidos(pedidosMock);
      } else {
        // Usar API real
        const result = await pedidosService.getAll();
        if (result.success && result.data) {
          setPedidos(result.data);
        } else {
          setError(result.error || 'Error al cargar pedidos');
        }
      }
    } catch (err) {
      setError('Error al cargar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar lista de clientes para los filtros
  const cargarClientes = async () => {
    try {
      if (USE_MOCK) {
        // Extraer clientes únicos de los pedidos mock
        const clientesMap = new Map<string, ClienteUnico>();
        pedidosMock.forEach(p => {
          if (p.clienteId && !clientesMap.has(p.clienteId)) {
            clientesMap.set(p.clienteId, {
              id: p.clienteId,
              nombre: p.cliente
            });
          }
        });
        setClientesUnicos(Array.from(clientesMap.values()));
      } else {
        const result = await clientesService.getAll();
        if (result.success && result.data) {
          setClientesUnicos(result.data.map(c => ({
            id: c.id,
            nombre: c.nombre
          })));
        }
      }
    } catch (err) {
      console.error('Error al cargar clientes:', err);
    }
  };

  // Agregar pedido
  const agregarPedido = async (pedidoData: PedidoData): Promise<ApiResponse<Pedido>> => {
    try {
      if (USE_MOCK) {
        const nuevoPedido: Pedido = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          precioAbonado: 0,
          estado: 'Impago',
          ...pedidoData
        };
        setPedidos(prev => [nuevoPedido, ...prev]);
        return { success: true, data: nuevoPedido };
      } else {
        const result = await pedidosService.create(pedidoData);
        if (result.success && result.data) {
          setPedidos(prev => [result.data!, ...prev]);
        }
        return result;
      }
    } catch (err) {
      console.error('Error al agregar pedido:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  // Actualizar estado de pago
  const actualizarEstadoPago = async (pedidoId: number | string): Promise<ApiResponse> => {
    try {
      if (USE_MOCK) {
        setPedidos(prev =>
          prev.map(p =>
            p.id === pedidoId
              ? { ...p, estado: 'Pago' as const, precioAbonado: p.precio }
              : p
          )
        );
        return { success: true };
      } else {
        const result = await pedidosService.marcarComoPago(pedidoId);
        if (result.success && result.data) {
          setPedidos(prev =>
            prev.map(p =>
              p.id === pedidoId ? result.data! : p
            )
          );
        }
        return result;
      }
    } catch (err) {
      console.error('Error al actualizar estado:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  // Actualizar abono parcial
  const actualizarAbonoParcial = async (pedidoId: number | string, nuevoAbono: number): Promise<ApiResponse> => {
    try {
      if (USE_MOCK) {
        setPedidos(prev =>
          prev.map(p => {
            if (p.id === pedidoId) {
              const totalAbonado = parseFloat(String(nuevoAbono));
              const esPagoCompleto = totalAbonado >= p.precio;
              return {
                ...p,
                precioAbonado: totalAbonado,
                estado: esPagoCompleto ? 'Pago' as const : 'Impago' as const
              };
            }
            return p;
          })
        );
        return { success: true };
      } else {
        const result = await pedidosService.actualizarAbono(pedidoId, nuevoAbono);
        if (result.success && result.data) {
          setPedidos(prev =>
            prev.map(p => p.id === pedidoId ? result.data! : p)
          );
        }
        return result;
      }
    } catch (err) {
      console.error('Error al actualizar abono:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  // Eliminar pedido
  const eliminarPedido = async (pedidoId: number | string): Promise<ApiResponse> => {
    try {
      if (USE_MOCK) {
        setPedidos(prev => prev.filter(p => p.id !== pedidoId));
        return { success: true };
      } else {
        const result = await pedidosService.delete(pedidoId);
        if (result.success) {
          setPedidos(prev => prev.filter(p => p.id !== pedidoId));
        }
        return result;
      }
    } catch (err) {
      console.error('Error al eliminar pedido:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  // Filtrar pedidos (memoizado)
  const pedidosFiltrados = useCallback((): Pedido[] => {
    return pedidos.filter(pedido => {
      if (filtros.cliente !== 'todos' && pedido.cliente !== filtros.cliente) {
        return false;
      }
      if (filtros.estado !== 'todos' && pedido.estado !== filtros.estado) {
        return false;
      }
      if (filtros.fechaDesde && pedido.fecha < filtros.fechaDesde) {
        return false;
      }
      if (filtros.fechaHasta && pedido.fecha > filtros.fechaHasta) {
        return false;
      }
      return true;
    });
  }, [pedidos, filtros]);

  // Calcular estadísticas
  const estadisticas = useCallback((): EstadisticasPedidos => {
    const filtrados = pedidosFiltrados();

    const totalVentas = filtrados.reduce((sum, p) => sum + p.precio, 0);
    const totalCobrado = filtrados.reduce((sum, p) => sum + p.precioAbonado, 0);
    const totalPendiente = totalVentas - totalCobrado;
    const cantidadPagos = filtrados.filter(p => p.estado === 'Pago').length;
    const cantidadImpagos = filtrados.filter(p => p.estado === 'Impago').length;

    return {
      totalVentas,
      totalCobrado,
      totalPendiente,
      cantidadPagos,
      cantidadImpagos,
      cantidadTotal: filtrados.length
    };
  }, [pedidosFiltrados]);

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
    pedidosFiltrados: pedidosFiltrados(),
    estadisticas: estadisticas()
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

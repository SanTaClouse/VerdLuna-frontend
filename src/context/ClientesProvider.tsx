import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react';
import { clientesService } from '../services';
import { Cliente, ClienteData, EstadisticasClientes, ApiResponse } from '../types';

interface ClientesContextType {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
  cargarClientes: () => Promise<void>;
  obtenerClientePorId: (id: string) => Cliente | undefined;
  agregarCliente: (clienteData: ClienteData) => Promise<ApiResponse<Cliente>>;
  actualizarCliente: (id: string, datosActualizados: Partial<Cliente>) => Promise<ApiResponse>;
  eliminarCliente: (id: string) => Promise<ApiResponse>;
  clientesOrdenados: Cliente[];
  estadisticas: EstadisticasClientes;
}

const ClientesContext = createContext<ClientesContextType | undefined>(undefined);

interface ClientesProviderProps {
  children: ReactNode;
}

export const ClientesProvider = ({ children }: ClientesProviderProps) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar clientes al montar
  useEffect(() => {
    cargarClientes();
  }, []);

  // Cargar clientes desde el backend
  const cargarClientes = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await clientesService.getAll();

      if (result.success && result.data) {
        setClientes(result.data);
      } else {
        setError(result.error || 'Error al cargar clientes');
      }
    } catch (err) {
      setError('Error al cargar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener cliente por ID
  const obtenerClientePorId = useCallback((id: string): Cliente | undefined => {
    return clientes.find(c => c.id === id);
  }, [clientes]);

  // Agregar cliente
  const agregarCliente = async (clienteData: ClienteData): Promise<ApiResponse<Cliente>> => {
    try {
      const result = await clientesService.create(clienteData);
      if (result.success && result.data) {
        setClientes(prev => [result.data!, ...prev]);
      }
      return result;
    } catch (err) {
      console.error('Error al agregar cliente:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  // Actualizar cliente
  const actualizarCliente = async (id: string, datosActualizados: Partial<Cliente>): Promise<ApiResponse> => {
    try {
      const result = await clientesService.update(id, datosActualizados);
      if (result.success && result.data) {
        setClientes(prev =>
          prev.map(c => c.id === id ? result.data! : c)
        );
      }
      return result;
    } catch (err) {
      console.error('Error al actualizar cliente:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  // Eliminar cliente
  const eliminarCliente = async (id: string): Promise<ApiResponse> => {
    try {
      const result = await clientesService.delete(id);
      if (result.success) {
        setClientes(prev => prev.filter(c => c.id !== id));
      }
      return result;
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  // Clientes ordenados por facturación
  const clientesOrdenados = useCallback((): Cliente[] => {
    return [...clientes].sort((a, b) => b.totalFacturado - a.totalFacturado);
  }, [clientes]);

  // Estadísticas generales
  const estadisticas = useCallback((): EstadisticasClientes => {
    const total = clientes.reduce((sum, c) => sum + (c.totalFacturado || 0), 0);
    const promedio = clientes.length > 0 ? total / clientes.length : 0;

    return {
      totalClientes: clientes.length,
      facturacionTotal: total,
      promedioFacturacion: promedio,
      clienteTop: clientes.reduce((max, c) =>
        (c.totalFacturado || 0) > (max?.totalFacturado || 0) ? c : max
        , clientes[0] || null)
    };
  }, [clientes]);

  const value: ClientesContextType = {
    clientes,
    loading,
    error,
    cargarClientes,
    obtenerClientePorId,
    agregarCliente,
    actualizarCliente,
    eliminarCliente,
    clientesOrdenados: clientesOrdenados(),
    estadisticas: estadisticas()
  };

  return (
    <ClientesContext.Provider value={value}>
      {children}
    </ClientesContext.Provider>
  );
};

// Hook personalizado
export const useClientes = (): ClientesContextType => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error('useClientes debe usarse dentro de un ClientesProvider');
  }
  return context;
};

export default ClientesContext;

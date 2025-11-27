import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { clientesService } from '../services'

// Datos mock para desarrollo
import clientesMock from '../helpers/clientesMock';

const ClientesContext = createContext();

// Variable para cambiar entre mock y API real
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || true;

export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar clientes al montar
    useEffect(() => {
        cargarClientes();
    }, []);

    // Cargar clientes
    const cargarClientes = async () => {
        setLoading(true);
        setError(null);

        try {
            if (USE_MOCK) {
                await new Promise(resolve => setTimeout(resolve, 300));
                setClientes(clientesMock);
            } else {
                const result = await clientesService.getAll();
                if (result.success) {
                    setClientes(result.data);
                } else {
                    setError(result.error);
                }
            }
        } catch (err) {
            setError('Error al cargar clientes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Obtener cliente por ID
    const obtenerClientePorId = useCallback((id) => {
        return clientes.find(c => c.id === id);
    }, [clientes]);

    // Agregar cliente
    const agregarCliente = async (clienteData) => {
        try {
            if (USE_MOCK) {
                const nuevoCliente = {
                    id: `c${Date.now()}`,
                    ...clienteData,
                    totalFacturado: 0,
                    cantidadPedidos: 0,
                    ultimoPedido: null,
                    fechaRegistro: new Date().toISOString().split('T')[0],
                    estado: 'activo'
                };
                setClientes(prev => [nuevoCliente, ...prev]);
                return { success: true, cliente: nuevoCliente };
            } else {
                const result = await clientesService.create(clienteData);
                if (result.success) {
                    setClientes(prev => [result.data, ...prev]);
                }
                return result;
            }
        } catch (err) {
            console.error('Error al agregar cliente:', err);
            return { success: false, error: err.message };
        }
    };

    // Actualizar cliente
    const actualizarCliente = async (id, datosActualizados) => {
        try {
            if (USE_MOCK) {
                setClientes(prev =>
                    prev.map(c => c.id === id ? { ...c, ...datosActualizados } : c)
                );
                return { success: true };
            } else {
                const result = await clientesService.update(id, datosActualizados);
                if (result.success) {
                    setClientes(prev =>
                        prev.map(c => c.id === id ? result.data : c)
                    );
                }
                return result;
            }
        } catch (err) {
            console.error('Error al actualizar cliente:', err);
            return { success: false, error: err.message };
        }
    };

    // Eliminar cliente
    const eliminarCliente = async (id) => {
        try {
            if (USE_MOCK) {
                setClientes(prev => prev.filter(c => c.id !== id));
                return { success: true };
            } else {
                const result = await clientesService.delete(id);
                if (result.success) {
                    setClientes(prev => prev.filter(c => c.id !== id));
                }
                return result;
            }
        } catch (err) {
            console.error('Error al eliminar cliente:', err);
            return { success: false, error: err.message };
        }
    };

    // Clientes ordenados por facturación
    const clientesOrdenados = useCallback(() => {
        return [...clientes].sort((a, b) => b.totalFacturado - a.totalFacturado);
    }, [clientes]);

    // Estadísticas generales
    const estadisticas = useCallback(() => {
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

    const value = {
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
export const useClientes = () => {
    const context = useContext(ClientesContext);
    if (!context) {
        throw new Error('useClientes debe usarse dentro de un ClientesProvider');
    }
    return context;
};

export default ClientesContext;
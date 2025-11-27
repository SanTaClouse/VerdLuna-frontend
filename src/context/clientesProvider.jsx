import { createContext, useState, useEffect, useCallback } from 'react';
import clientesMock from '../helpers/clientesMock';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar clientes al montar
    useEffect(() => {
        cargarClientes();
    }, []);

    // Función para cargar clientes
    const cargarClientes = async () => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            // TODO: Reemplazar con fetch real
            // const response = await axios.get('http://localhost:3000/api/clientes');
            // setClientes(response.data);

            setClientes(clientesMock);

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

    // Agregar nuevo cliente
    const agregarCliente = async (clienteData) => {
        try {
            // TODO: POST al backend
            const nuevoCliente = {
                id: `c${Date.now()}`,
                ...clienteData,
                totalFacturado: 0,
                cantidadPedidos: 0,
                ultimoPedido: null,
                fechaRegistro: new Date().toISOString().split('T')[0]
            };

            setClientes(prev => [nuevoCliente, ...prev]);
            return { success: true, cliente: nuevoCliente };

        } catch (err) {
            console.error('Error al agregar cliente:', err);
            return { success: false, error: err.message };
        }
    };

    // Actualizar cliente
    const actualizarCliente = async (id, datosActualizados) => {
        try {
            // TODO: PATCH al backend
            setClientes(prev =>
                prev.map(c => c.id === id ? { ...c, ...datosActualizados } : c)
            );

            return { success: true };

        } catch (err) {
            console.error('Error al actualizar cliente:', err);
            return { success: false, error: err.message };
        }
    };

    // Eliminar cliente
    const eliminarCliente = async (id) => {
        try {
            // TODO: DELETE al backend
            setClientes(prev => prev.filter(c => c.id !== id));
            return { success: true };

        } catch (err) {
            console.error('Error al eliminar cliente:', err);
            return { success: false, error: err.message };
        }
    };

    // Clientes ordenados por total facturado (mayor a menor)
    const clientesOrdenados = useCallback(() => {
        return [...clientes].sort((a, b) => b.totalFacturado - a.totalFacturado);
    }, [clientes]);

    // Estadísticas generales
    const estadisticas = useCallback(() => {
        const total = clientes.reduce((sum, c) => sum + c.totalFacturado, 0);
        const promedio = clientes.length > 0 ? total / clientes.length : 0;

        return {
            totalClientes: clientes.length,
            facturacionTotal: total,
            promedioFacturacion: promedio,
            clienteTop: clientes.reduce((max, c) =>
                c.totalFacturado > max.totalFacturado ? c : max
                , clientes[0] || {})
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

export default ClientesContext;
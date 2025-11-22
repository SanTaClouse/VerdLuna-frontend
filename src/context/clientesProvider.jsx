import { createContext, useState, useEffect, useCallback } from 'react';
// import pedidosBD from '../helpers/pedidos';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState([]);
    const [clientesUnicos, setClientesUnicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filtros, setFiltros] = useState({
        cliente: 'todos',
        estado: 'todos',
        fechaDesde: '',
        fechaHasta: ''
    });

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            // setPedidos(pedidosBD);

            const clientesMap = new Map();
            // pedidosBD.forEach(p => {
            //     if (p.clienteId && !clientesMap.has(p.clienteId)) {
            //         clientesMap.set(p.clienteId, {
            //             id: p.clienteId,
            //             nombre: p.cliente
            //         });
            //     }
            // });
            setClientesUnicos(Array.from(clientesMap.values()));

        } catch (err) {
            setError('Error al cargar pedidos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const agregarPedido = async (pedidoData) => {
        try {
            const nuevoPedido = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                ...pedidoData
            };

            setPedidos(prev => [nuevoPedido, ...prev]);
            return { success: true, pedido: nuevoPedido };

        } catch (err) {
            console.error('Error al agregar pedido:', err);
            return { success: false, error: err.message };
        }
    };

    const actualizarEstadoPago = async (pedidoId) => {
        try {
            setPedidos(prev =>
                prev.map(p =>
                    p.id === pedidoId
                        ? { ...p, estado: 'Pago', precioAbonado: p.precio }
                        : p
                )
            );

            return { success: true };

        } catch (err) {
            console.error('Error al actualizar estado:', err);
            return { success: false, error: err.message };
        }
    };

    const actualizarAbonoParcial = async (pedidoId, nuevoAbono) => {
        try {
            setPedidos(prev =>
                prev.map(p => {
                    if (p.id === pedidoId) {
                        const totalAbonado = parseFloat(nuevoAbono);
                        const esPagoCompleto = totalAbonado >= p.precio;

                        return {
                            ...p,
                            precioAbonado: totalAbonado,
                            estado: esPagoCompleto ? 'Pago' : 'Impago'
                        };
                    }
                    return p;
                })
            );

            return { success: true };

        } catch (err) {
            console.error('Error al actualizar abono:', err);
            return { success: false, error: err.message };
        }
    };

    const pedidosFiltrados = useCallback(() => {
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

    const estadisticas = useCallback(() => {
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

    const value = {
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
        pedidosFiltrados: pedidosFiltrados(),
        estadisticas: estadisticas()
    };

    return (
        <ClientesContext.Provider value={value}>
            {children}
        </ClientesContext.Provider>
    );
};

export default ClientesContext;
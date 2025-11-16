import { useState } from "react";
import PedidosContext from "./createContext";

const PedidosProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState([]);
    const [filtros, setFiltros] = useState({
        cliente: 'todos',
        estado: 'todos',
        orden: 'desc',
    });


    const clientesUnicos = [...new Set(pedidos.map(p => p.cliente))];


    return (
        <PedidosContext.Provider value={{
            pedidos,
            setPedidos,
            filtros,
            setFiltros,
            clientesUnicos
        }}>
            {children}
        </PedidosContext.Provider>
    )
}

export default PedidosProvider
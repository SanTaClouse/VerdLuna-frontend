import { Badge, Table } from 'react-bootstrap';

interface TopCliente {
  clienteId: string;
  nombre: string;
  totalComprado: number;
  totalCobrado: number;
  totalPendiente: number;
  cantidadPedidos: number;
}

interface Props {
  clientes: TopCliente[];
}

const formatPeso = (valor: number) =>
  `$${valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const MEDALLAS = ['🥇', '🥈', '🥉'];

const TablaTopClientes = ({ clientes }: Props) => {
  if (clientes.length === 0) {
    return <p className="text-muted text-center py-3">Sin datos disponibles.</p>;
  }

  return (
    <Table responsive hover className="mb-0" style={{ fontSize: 14 }}>
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Cliente</th>
          <th className="text-end">Total Comprado</th>
          <th className="text-end">Total Cobrado</th>
          <th className="text-end">Pendiente</th>
          <th className="text-center">Pedidos</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente, index) => (
          <tr key={cliente.clienteId}>
            <td className="fw-bold text-muted">
              {index < 3 ? MEDALLAS[index] : `#${index + 1}`}
            </td>
            <td className="fw-semibold">{cliente.nombre}</td>
            <td className="text-end text-primary fw-semibold">{formatPeso(cliente.totalComprado)}</td>
            <td className="text-end text-success">{formatPeso(cliente.totalCobrado)}</td>
            <td className="text-end">
              {cliente.totalPendiente > 0 ? (
                <span className="text-warning fw-semibold">{formatPeso(cliente.totalPendiente)}</span>
              ) : (
                <span className="text-success">-</span>
              )}
            </td>
            <td className="text-center">
              <Badge bg="secondary" pill>{cliente.cantidadPedidos}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaTopClientes;

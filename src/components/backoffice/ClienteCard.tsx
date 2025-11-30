import { Card } from 'react-bootstrap';
import { MouseEvent } from 'react';
import { Cliente } from '../../types';

interface ClienteCardProps {
  cliente: Cliente;
  onClick: (cliente: Cliente) => void;
}

const ClienteCard = ({ cliente, onClick }: ClienteCardProps) => {
  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card
      className="mb-2 shadow-sm border-0 cliente-card"
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderLeft: '4px solid #28a745'
      }}
      onClick={() => onClick(cliente)}
      onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'translateX(5px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
      }}
    >
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <h6 className="mb-1 fw-bold text-dark">
              {cliente.nombre}
            </h6>
            <p className="mb-0 text-muted small">
              <i className="bi bi-geo-alt"></i> {cliente.direccion}
            </p>
          </div>
          <div className="text-end ms-3">
            <div className="text-success fw-bold">
              {formatMoney(cliente.totalFacturado)}
            </div>
            <small className="text-muted">
              {cliente.cantidadPedidos} pedidos
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClienteCard;

import { Card, Badge } from 'react-bootstrap';
import { Pedido } from '../../types';
import { MouseEvent } from 'react';

interface PedidoCardProps {
  pedido: Pedido;
  onClick: (pedido: Pedido) => void;
}

const PedidoCard = ({ pedido, onClick }: PedidoCardProps) => {

  const restante = pedido.precio - pedido.precioAbonado;
  const isPago = pedido.estado === 'Pago';
  const tieneDeuda = restante > 0;

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Obtener nombre del cliente (puede venir como objeto o string)
  const nombreCliente = typeof pedido.cliente === 'object'
    ? pedido.cliente.nombre
    : pedido.cliente;

  return (
    <Card
      className="mb-2 shadow-sm border-0 pedido-card"
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderLeft: `4px solid ${isPago ? '#28a745' : '#dc3545'}`,
        backgroundColor: tieneDeuda ? '#fff5f5' : '#f0fff4'
      }}
      onClick={() => onClick(pedido)}
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

          {/* Columna izquierda: Cliente y descripción */}
          <div className="flex-grow-1 me-3">
            <div className="d-flex align-items-center mb-1">
              <h6 className="mb-0 fw-bold text-dark me-2">
                {nombreCliente}
              </h6>
              <Badge bg={isPago ? 'success' : 'danger'} className="small">
                {pedido.estado}
              </Badge>
              {pedido.whatsappEnviado && (
                <Badge bg="info" className="small ms-1">
                  <i className="bi bi-whatsapp me-1"></i>
                  Notificado
                </Badge>
              )}
            </div>
            <p className="mb-0 text-muted small" style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.4em',
              maxHeight: '2.8em'
            }}>
              {pedido.descripcion}
            </p>
            {pedido.creadoPor && (
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                <i className="bi bi-person-badge me-1"></i>
                Cargado por: {pedido.creadoPor.nombre || pedido.creadoPor.usuario}
              </small>
            )}
          </div>

          {/* Columna derecha: Precio y WhatsApp */}
          <div className="text-end">
            <div className={`fw-bold ${tieneDeuda ? 'text-danger' : 'text-success'}`}>
              {formatMoney(pedido.precio)}
            </div>
            {tieneDeuda && (
              <small className="text-danger">
                Resta: {formatMoney(restante)}
              </small>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PedidoCard;

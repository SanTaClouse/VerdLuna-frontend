import { Card, Badge, Button } from 'react-bootstrap';
import { Pedido } from '../../types';
import { MouseEvent, useState } from 'react';
import pedidosService from '../../services/pedidosService';

interface PedidoCardProps {
  pedido: Pedido;
  onClick: (pedido: Pedido) => void;
  onWhatsappEnviado?: (pedidoId: string | number) => void;
}

const PedidoCard = ({ pedido, onClick, onWhatsappEnviado }: PedidoCardProps) => {
  const [enviandoWhatsapp, setEnviandoWhatsapp] = useState(false);
  const [whatsappEnviado, setWhatsappEnviado] = useState(pedido.whatsappEnviado || false);

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

  const handleEnviarWhatsApp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevenir que se abra el modal

    setEnviandoWhatsapp(true);

    try {
      // 1. Obtener el link de WhatsApp
      const linkResponse = await pedidosService.getWhatsappLink(pedido.id);

      if (linkResponse.success && linkResponse.data) {
        // 2. Abrir WhatsApp en nueva pestaña
        window.open(linkResponse.data.whatsappLink, '_blank');

        // 3. Marcar como enviado
        const marcarResponse = await pedidosService.marcarWhatsappEnviado(pedido.id);

        if (marcarResponse.success) {
          setWhatsappEnviado(true);
          onWhatsappEnviado?.(pedido.id);
        }
      }
    } catch (error) {
      console.error('Error al enviar WhatsApp:', error);
    } finally {
      setEnviandoWhatsapp(false);
    }
  };

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
            </div>
            <p className="mb-0 text-muted small text-truncate">
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

            {/* Botón de WhatsApp */}
            <div className="mt-2">
              {!whatsappEnviado ? (
                <Button
                  size="sm"
                  variant="success"
                  onClick={handleEnviarWhatsApp}
                  disabled={enviandoWhatsapp}
                  className="d-flex align-items-center gap-1"
                  style={{
                    backgroundColor: '#25D366',
                    borderColor: '#25D366',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem'
                  }}
                >
                  <i className="bi bi-whatsapp"></i>
                  {enviandoWhatsapp ? 'Enviando...' : 'Enviar por WhatsApp'}
                </Button>
              ) : (
                <Badge
                  bg="info"
                  className="d-flex align-items-center gap-1"
                  style={{ fontSize: '0.7rem' }}
                >
                  <i className="bi bi-check-circle-fill"></i>
                  Enviado
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PedidoCard;

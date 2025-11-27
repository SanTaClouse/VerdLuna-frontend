import { Modal, Button, Row, Col, Badge, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Pedido } from '../../types';

interface PedidoModalProps {
  show: boolean;
  onHide: () => void;
  pedido: Pedido | null;
  onMarcarPago: (id: number | string) => Promise<void>;
}

const PedidoModal = ({ show, onHide, pedido, onMarcarPago }: PedidoModalProps) => {
  const [marcando, setMarcando] = useState(false);

  if (!pedido) return null;

  const restante = pedido.precio - pedido.precioAbonado;
  const isPago = pedido.estado === 'Pago';
  const tieneDeuda = restante > 0;

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleMarcarPago = async () => {
    setMarcando(true);
    await onMarcarPago(pedido.id);
    setMarcando(false);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1 fw-bold">{pedido.cliente}</h5>
              <small className="text-muted">
                {formatDate(pedido.fecha)}
              </small>
            </div>
            <Badge bg={isPago ? 'success' : 'danger'}>
              {pedido.estado}
            </Badge>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {/* Alerta si hay deuda */}
        {tieneDeuda && (
          <Alert variant="warning" className="mb-3">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Pago pendiente:</strong> Resta abonar {formatMoney(restante)}
          </Alert>
        )}

        {/* Descripción del pedido */}
        <div className="mb-3">
          <h6 className="text-muted mb-2">
            <i className="bi bi-box-seam me-2"></i>
            Detalle del pedido
          </h6>
          <p className="mb-0 bg-light p-3 rounded">
            {pedido.descripcion}
          </p>
        </div>

        {/* Información financiera */}
        <div className="mb-3">
          <h6 className="text-muted mb-2">
            <i className="bi bi-cash-coin me-2"></i>
            Información de pago
          </h6>

          <Row className="g-2">
            <Col xs={6}>
              <div className="bg-light p-2 rounded text-center">
                <small className="text-muted d-block">Total</small>
                <strong className="text-primary">
                  {formatMoney(pedido.precio)}
                </strong>
              </div>
            </Col>
            <Col xs={6}>
              <div className="bg-light p-2 rounded text-center">
                <small className="text-muted d-block">Abonado</small>
                <strong className="text-success">
                  {formatMoney(pedido.precioAbonado)}
                </strong>
              </div>
            </Col>
            {tieneDeuda && (
              <Col xs={12}>
                <div className="bg-danger bg-opacity-10 p-2 rounded text-center">
                  <small className="text-danger d-block">Restante</small>
                  <strong className="text-danger">
                    {formatMoney(restante)}
                  </strong>
                </div>
              </Col>
            )}
          </Row>
        </div>

        {/* Información técnica */}
        <div className="border-top pt-3 mt-3">
          <small className="text-muted">
            <strong>ID del pedido:</strong> {pedido.id}
          </small>
        </div>

        {/* Botón de acción */}
        {!isPago && (
          <div className="d-grid gap-2 mt-3">
            <Button
              variant="success"
              size="lg"
              onClick={handleMarcarPago}
              disabled={marcando}
            >
              {marcando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Marcando...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Marcar como pago completo
                </>
              )}
            </Button>
          </div>
        )}

        {isPago && (
          <div className="text-center text-success mt-3">
            <i className="bi bi-check-circle-fill me-2"></i>
            Pedido completamente abonado
          </div>
        )}

      </Modal.Body>
    </Modal>
  );
};

export default PedidoModal;

import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '../../types';

interface ClienteModalProps {
  show: boolean;
  onHide: () => void;
  cliente: Cliente | null;
}

const ClienteModal = ({ show, onHide, cliente }: ClienteModalProps) => {
  const navigate = useNavigate();

  if (!cliente) return null;

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | null): string => {
    
    if (!dateString) return 'Sin pedidos';
    return dateString.split('T')[0]
    // return dateString.toLocaleDateString('es-AR', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric'
    // });
  };

  const handleVerDetalle = () => {
    onHide();
    navigate(`/clientes/${cliente.id}`);
  };

  const handleLlamar = () => {
    window.location.href = `tel:${cliente.telefono}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/54${cliente.telefono}`, '_blank');
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="md"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="mb-0 fw-bold">{cliente.nombre}</h5>
            <Badge bg="success" className="ms-2">
              Activo
            </Badge>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Información principal */}
        <div className="mb-3">
          <p className="mb-2">
            <i className="bi bi-geo-alt-fill text-danger"></i>
            <strong className="ms-2">Dirección:</strong>
            <br />
            <span className="ms-4">{cliente.direccion}</span>
          </p>

          <p className="mb-2">
            <i className="bi bi-telephone-fill text-primary"></i>
            <strong className="ms-2">Teléfono:</strong>
            <br />
            <span className="ms-4">{cliente.telefono}</span>
          </p>

          {cliente.email && (
            <p className="mb-2">
              <i className="bi bi-envelope-fill text-info"></i>
              <strong className="ms-2">Email:</strong>
              <br />
              <span className="ms-4 small">{cliente.email}</span>
            </p>
          )}

          {cliente.descripcion && (
            <p className="mb-2">
              <i className="bi bi-info-circle-fill text-secondary"></i>
              <strong className="ms-2">Descripción:</strong>
              <br />
              <span className="ms-4 small text-muted">{cliente.descripcion}</span>
            </p>
          )}
        </div>

        {/* Estadísticas */}
        <Row className="text-center mb-3 g-2">
          <Col xs={4}>
            <div className="bg-light rounded p-2">
              <div className="text-success fw-bold">
                {formatMoney(cliente.totalFacturado)}
              </div>
              <small className="text-muted">Total facturado</small>
            </div>
          </Col>
          <Col xs={4}>
            <div className="bg-light rounded p-2">
              <div className="text-primary fw-bold">
                {cliente.cantidadPedidos}
              </div>
              <small className="text-muted">Pedidos</small>
            </div>
          </Col>
          <Col xs={4}>
            <div className="bg-light rounded p-2">
              <div className="text-secondary fw-bold small">
                {formatDate(cliente.ultimoPedido)}
              </div>
              <small className="text-muted">Último pedido</small>
            </div>
          </Col>
        </Row>

        {/* Botones de acción */}
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            onClick={handleVerDetalle}
            className="d-flex align-items-center justify-content-center"
          >
            <i className="bi bi-file-text me-2"></i>
            Ver detalle completo
          </Button>

          <Row className="g-2">
            <Col xs={6}>
              <Button
                variant="success"
                onClick={handleWhatsApp}
                className="w-100"
              >
                <i className="bi bi-whatsapp"></i> WhatsApp
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant="outline-success"
                onClick={handleLlamar}
                className="w-100"
              >
                <i className="bi bi-telephone"></i> Llamar
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <small className="text-muted">
          Cliente desde {formatDate(cliente.fechaRegistro)}
        </small>
      </Modal.Footer>
    </Modal>
  );
};

export default ClienteModal;

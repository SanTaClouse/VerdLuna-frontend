import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface PagoModalProps {
  show: boolean;
  onHide: () => void;
  onConfirmar: (monto: number) => Promise<void>;
  pedidoId: string | number;
  precioTotal: number;
  precioAbonado: number;
}

const PagoModal = ({
  show,
  onHide,
  onConfirmar,
  precioTotal,
  precioAbonado
}: PagoModalProps) => {
  const [monto, setMonto] = useState<string>('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string>('');

  const restante = precioTotal - precioAbonado;

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      setMonto('');
      setError('');
    }
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const montoNumerico = parseFloat(monto);

    // Validaciones
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      setError('Ingrese un monto válido mayor a 0');
      return;
    }

    if (montoNumerico > restante) {
      setError(`El monto no puede superar el restante ($${restante.toFixed(2)})`);
      return;
    }

    setEnviando(true);
    try {
      await onConfirmar(montoNumerico);
      onHide();
    } catch (err) {
      setError('Error al registrar el pago');
    } finally {
      setEnviando(false);
    }
  };

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Pago</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Información del pedido */}
          <div className="mb-3 p-3 bg-light rounded">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Total:</span>
              <strong>{formatMoney(precioTotal)}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Abonado:</span>
              <span className="text-success">{formatMoney(precioAbonado)}</span>
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
              <span className="text-muted">Restante:</span>
              <strong className="text-danger">{formatMoney(restante)}</strong>
            </div>
          </div>

          {/* Input de monto */}
          <Form.Group>
            <Form.Label>Monto a abonar</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                disabled={enviando}
                min="0"
                step="0.01"
                required
                autoFocus
              />
            </InputGroup>
            {error && (
              <Form.Text className="text-danger">
                {error}
              </Form.Text>
            )}
          </Form.Group>

          {/* Botones rápidos */}
          <div className="d-flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => setMonto((restante / 2).toFixed(2))}
              disabled={enviando}
            >
              Mitad
            </Button>
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => setMonto(restante.toFixed(2))}
              disabled={enviando}
            >
              Restante
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={enviando}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" disabled={enviando}>
            {enviando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg me-2"></i>
                Confirmar Pago
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PagoModal;
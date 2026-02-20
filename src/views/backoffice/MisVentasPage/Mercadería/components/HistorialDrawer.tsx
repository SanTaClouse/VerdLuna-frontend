import { useEffect, useState } from 'react';
import { Offcanvas, Spinner, Badge } from 'react-bootstrap';
import mercaderiaService from '../../../../../services/mercaderiaService';
import { HistorialItem } from '../../../../../types';

interface HistorialDrawerProps {
  sucursalId: number;
  show: boolean;
  onClose: () => void;
}

const SUCURSAL_NOMBRES: Record<number, string> = {
  1: 'Luna 1',
  2: 'Luna 2',
  3: 'Luna 3',
  4: 'Luna 4',
};

const formatFecha = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const HistorialDrawer = ({ sucursalId, show, onClose }: HistorialDrawerProps) => {
  const [items, setItems] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!show) return;
    setLoading(true);
    setError(null);
    mercaderiaService.getHistorial(sucursalId).then((res) => {
      if (res.success && res.data) {
        setItems(res.data);
      } else {
        setError(res.error || 'Error al cargar historial');
      }
      setLoading(false);
    });
  }, [show, sucursalId]);

  return (
    <Offcanvas show={show} onHide={onClose} placement="bottom" style={{ height: '70vh' }}>
      <Offcanvas.Header closeButton className="border-bottom pb-2">
        <Offcanvas.Title className="fs-6 fw-bold">
          Historial — {SUCURSAL_NOMBRES[sucursalId]}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-0 overflow-auto">
        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner size="sm" animation="border" className="me-2" />
            <small>Cargando...</small>
          </div>
        )}

        {error && !loading && (
          <div className="p-3 text-danger small">{error}</div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="p-3 text-muted small text-center">Sin registros de cambios</div>
        )}

        {!loading && items.length > 0 && (
          <ul className="list-group list-group-flush">
            {items.map((item) => {
              const difPositiva = Number(item.diferencia) >= 0;
              return (
                <li key={item.id} className="list-group-item px-3 py-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <span className="fw-semibold small">
                      {item.producto?.nombre ?? item.productoId}
                    </span>
                    <span className={`small fw-bold ${difPositiva ? 'text-success' : 'text-danger'}`}>
                      {difPositiva ? '+' : ''}
                      {Number(item.diferencia).toFixed(item.diferencia % 1 !== 0 ? 1 : 0)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <span className="text-muted small">
                      {Number(item.cantidadAnterior).toFixed(
                        item.cantidadAnterior % 1 !== 0 ? 1 : 0,
                      )}{' '}
                      →{' '}
                      {Number(item.cantidadNueva).toFixed(
                        item.cantidadNueva % 1 !== 0 ? 1 : 0,
                      )}{' '}
                      {item.producto?.unidad ?? 'kg'}
                    </span>
                    <Badge bg="light" text="secondary" style={{ fontSize: '0.7rem' }}>
                      {formatFecha(item.createdAt)}
                    </Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default HistorialDrawer;

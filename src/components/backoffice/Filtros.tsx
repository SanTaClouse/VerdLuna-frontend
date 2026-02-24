import { useContext, ChangeEvent } from 'react';
import PedidosContext from '../../context/PedidosProvider';
import { Form, Row, Col, Button, Badge } from 'react-bootstrap';

const PRESETS = [
  { label: 'Última semana', dias: 7 },
  { label: 'Último mes', dias: 30 },
  { label: 'Últimos 2 meses', dias: 60 },
  { label: 'Últimos 3 meses', dias: 90 },
];

const Filtros = () => {
  const context = useContext(PedidosContext);

  if (!context) {
    throw new Error('Filtros must be used within PedidosProvider');
  }

  const { filtros, setFiltros, clientesUnicos } = context;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const resetFiltros = () => {
    setFiltros({ cliente: 'todos', estado: 'todos', fechaDesde: '', fechaHasta: '' });
  };

  const aplicarPreset = (dias: number) => {
    const hoy = new Date();
    const desde = new Date(hoy);
    desde.setDate(hoy.getDate() - dias);
    setFiltros(prev => ({
      ...prev,
      fechaDesde: desde.toISOString().split('T')[0],
      fechaHasta: hoy.toISOString().split('T')[0],
    }));
  };

  const tieneFiltroDeFecha = filtros.fechaDesde || filtros.fechaHasta;

  return (
    <Form className="mb-3 p-3 bg-light rounded">
      <Row className="align-items-end">
        {/* Filtro por Cliente */}
        <Col xs={12} md={5} className="mb-2">
          <Form.Label className="small text-muted mb-1">Filtrar por cliente</Form.Label>
          <Form.Select
            name="cliente"
            value={filtros.cliente}
            onChange={handleChange}
          >
            <option value="todos">Todos los clientes</option>
            {clientesUnicos.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Filtro por Estado */}
        <Col xs={12} md={4} className="mb-2">
          <Form.Label className="small text-muted mb-1">Filtrar por estado</Form.Label>
          <Form.Select
            name="estado"
            value={filtros.estado}
            onChange={handleChange}
          >
            <option value="todos">Todos</option>
            <option value="Pago">Pagos ✅</option>
            <option value="Impago">Impagos ⚠️</option>
          </Form.Select>
        </Col>

        {/* Botón Reset */}
        <Col xs={12} md={3} className="mb-2 d-flex align-items-end">
          <Button
            variant="outline-secondary"
            onClick={resetFiltros}
            className="w-100"
          >
            🔄 Limpiar filtros
          </Button>
        </Col>
      </Row>

      {/* Presets de fecha */}
      <Row className="mt-1">
        <Col xs={12}>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <small className="text-muted fw-semibold">Período:</small>
            {PRESETS.map(({ label, dias }) => (
              <Button
                key={dias}
                variant="outline-primary"
                size="sm"
                onClick={() => aplicarPreset(dias)}
              >
                {label}
              </Button>
            ))}
            {tieneFiltroDeFecha && (
              <Badge bg="primary" className="ms-1">
                {filtros.fechaDesde} → {filtros.fechaHasta}
              </Badge>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Filtros;

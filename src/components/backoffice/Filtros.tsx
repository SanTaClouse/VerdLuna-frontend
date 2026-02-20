import { useContext, ChangeEvent } from 'react';
import PedidosContext from '../../context/PedidosProvider';
import { Form, Row, Col, Button } from 'react-bootstrap';

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

  return (
    <Form className="mb-3 p-3 bg-light rounded">
      <Row className="align-items-center">
        {/* Filtro por Cliente */}
        <Col xs={12} md={6} className="mb-2">
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
        <Col xs={12} md={2} className="d-flex align-items-end">
          <Button
            variant="outline-secondary"
            onClick={resetFiltros}
            className="w-100"
          >
            🔄 Limpiar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filtros;

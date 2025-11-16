import { useContext } from 'react';
import PedidosContext from '../context/createContext';
import { Form, Row, Col, Button } from 'react-bootstrap';

const Filtros = () => {
  const { filtros, setFiltros, clientesUnicos } = useContext(PedidosContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const resetFiltros = () => setFiltros({ cliente: 'todos', estado: 'todos' });

  return (
    <Form className="mb-3">
      <Row className="align-items-center">
        {/* Filtro por Cliente */}
        <Col xs={12} md={6} className="mb-2">
          <Form.Select name="cliente" value={filtros.cliente} onChange={handleChange}>
            <option value="todos">Todos los clientes</option>
            {clientesUnicos.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Col>

        {/* Filtro por Estado */}
        <Col xs={12} md={4} className="mb-2">
          <Form.Select name="estado" value={filtros.estado} onChange={handleChange}>
            <option value="todos">Todos</option>
            <option value="Pago">Pago</option>
            <option value="Impago">Impago</option>
          </Form.Select>
        </Col>

        {/* Botón Reset */}
        <Col xs={12} md={2}>
          <Button variant="secondary" onClick={resetFiltros} className="w-100">
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filtros;

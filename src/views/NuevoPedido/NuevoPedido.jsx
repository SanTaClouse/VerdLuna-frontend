
import { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import PedidosContext from "../../context/createContext";

const NuevoPedidoForm = () => {
  const { clientesUnicos } = useContext(PedidosContext); // lista de clientes desde el contexto o fetch
  const [form, setForm] = useState({
    cliente: "",
    descripcion: "",
    precio: "",
    precioAbonado: "",
    pagoCompleto: false,
    fecha: new Date().toISOString().split("T")[0], // yyyy-mm-dd
  });

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "pagoCompleto" && checked
        ? { precioAbonado: prev.precio } // si marca pago completo, iguala valores
        : {}),
    }));
  };

  // Calcular automáticamente el precio restante
  const precioRestante = Math.max(
    (form.precio || 0) - (form.precioAbonado || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pedidoData = {
      clienteId: form.cliente,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      precioAbonado: form.pagoCompleto
        ? parseFloat(form.precio)
        : parseFloat(form.precioAbonado),
      estado: form.pagoCompleto ? "Pago" : "Impago",
      fecha: form.fecha,
    };

    try {
    // Simulamos una "respuesta" del backend
    const nuevoPedido = {
      id: Date.now(), // simulamos un ID
      timestamp: new Date().toISOString(),
      ...pedidoData,
    };

    console.log("Pedido simulado:", nuevoPedido);
    alert("Pedido cargado con éxito ✅ (modo local)");

    // limpiamos el formulario
    setForm({
      cliente: "",
      descripcion: "",
      precio: "",
      precioAbonado: "",
      pagoCompleto: false,
    });
    } catch (error) {
      console.error("Error al cargar pedido:", error);
    }
  };

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-success text-white text-center">
          Nuevo Pedido
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* CLIENTE */}
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar cliente</option>
                {clientesUnicos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* DESCRIPCIÓN */}
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Ejemplo: 10 kg de papa, 5 kg de zanahoria..."
                required
              />
            </Form.Group>

            <Row>
              {/* PRECIO TOTAL */}
              <Col xs={12} md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio total ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>

              {/* PRECIO ABONADO */}
              <Col xs={12} md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio abonado ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="precioAbonado"
                    value={form.precioAbonado}
                    onChange={handleChange}
                    disabled={form.pagoCompleto}
                    min="0"
                  />
                </Form.Group>
              </Col>

              {/* CHECKBOX */}
              <Col xs={12} md={4} className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  name="pagoCompleto"
                  label="Pago completo"
                  checked={form.pagoCompleto}
                  onChange={handleChange}
                  className="mt-3 mt-md-0"
                />
              </Col>
            </Row>

            {/* PRECIO RESTANTE */}
            <div className="text-end mb-3">
              <strong>Restante: ${precioRestante}</strong>
            </div>

            {/* FECHA */}
            <Form.Group className="mb-3">
                <Form.Label>Fecha del pedido</Form.Label>
                <Form.Control
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                />
                </Form.Group>

            {/* BOTÓN */}
            <div className="d-grid">
              <Button variant="success" type="submit">
                Cargar pedido
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NuevoPedidoForm;

import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import PedidosContext from "../../context/pedidosContext";
import { useNavigate } from "react-router-dom";

const NuevoPedidoForm = () => {
    const { clientesUnicos, agregarPedido } = useContext(PedidosContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        cliente: "",
        clienteId: "",
        descripcion: "",
        precio: "",
        precioAbonado: "",
        pagoCompleto: false,
        fecha: new Date().toISOString().split("T")[0],
    });

    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "cliente") {
            const clienteSeleccionado = clientesUnicos.find(c => c.id === value);
            setForm(prev => ({
                ...prev,
                clienteId: value,
                cliente: clienteSeleccionado ? clienteSeleccionado.nombre : ""
            }));
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
            ...(name === "pagoCompleto" && checked
                ? { precioAbonado: prev.precio }
                : {}),
        }));
    };

    const precioRestante = Math.max(
        (parseFloat(form.precio) || 0) - (parseFloat(form.precioAbonado) || 0),
        0
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensaje({ tipo: '', texto: '' });

        const pedidoData = {
            clienteId: form.clienteId,
            cliente: form.cliente,
            descripcion: form.descripcion,
            precio: parseFloat(form.precio),
            precioAbonado: form.pagoCompleto
                ? parseFloat(form.precio)
                : parseFloat(form.precioAbonado) || 0,
            estado: form.pagoCompleto ? "Pago" : "Impago",
            fecha: form.fecha,
        };

        try {
            const resultado = await agregarPedido(pedidoData);

            if (resultado.success) {
                setMensaje({
                    tipo: 'success',
                    texto: '✅ Pedido cargado con éxito'
                });

                setForm({
                    cliente: "",
                    clienteId: "",
                    descripcion: "",
                    precio: "",
                    precioAbonado: "",
                    pagoCompleto: false,
                    fecha: new Date().toISOString().split("T")[0],
                });

                setTimeout(() => {
                    navigate('/ventas');
                }, 2000);

            } else {
                setMensaje({
                    tipo: 'danger',
                    texto: `❌ Error: ${resultado.error}`
                });
            }

        } catch (error) {
            console.error("Error al cargar pedido:", error);
            setMensaje({
                tipo: 'danger',
                texto: '❌ Error al cargar el pedido'
            });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Container className="my-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-success text-white text-center">
                    <h4 className="mb-0">🛒 Nuevo Pedido</h4>
                </Card.Header>
                <Card.Body>
                    {mensaje.texto && (
                        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje({ tipo: '', texto: '' })}>
                            {mensaje.texto}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        {/* CLIENTE */}
                        <Form.Group className="mb-3">
                            <Form.Label>Cliente *</Form.Label>
                            <Form.Select
                                name="cliente"
                                value={form.clienteId}
                                onChange={handleChange}
                                required
                                disabled={enviando}
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
                            <Form.Label>Descripción del pedido *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                placeholder="Ejemplo: 10 kg de papa, 5 kg de zanahoria, 3 kg de cebolla..."
                                required
                                disabled={enviando}
                            />
                            <Form.Text className="text-muted">
                                Detalle los productos y cantidades del pedido
                            </Form.Text>
                        </Form.Group>

                        <Row>
                            {/* PRECIO TOTAL */}
                            <Col xs={12} md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio total ($) *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        name="precio"
                                        value={form.precio}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        disabled={enviando}
                                        placeholder="0.00"
                                    />
                                </Form.Group>
                            </Col>

                            {/* PRECIO ABONADO */}
                            <Col xs={12} md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio abonado ($)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        name="precioAbonado"
                                        value={form.precioAbonado}
                                        onChange={handleChange}
                                        disabled={form.pagoCompleto || enviando}
                                        min="0"
                                        placeholder="0.00"
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
                                    disabled={enviando}
                                    className="mt-3 mt-md-0"
                                />
                            </Col>
                        </Row>

                        {/* PRECIO RESTANTE */}
                        <div className="text-end mb-3">
                            <strong className={precioRestante > 0 ? "text-danger" : "text-success"}>
                                Restante: ${precioRestante.toFixed(2)}
                            </strong>
                        </div>

                        {/* FECHA */}
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha del pedido *</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha"
                                value={form.fecha}
                                onChange={handleChange}
                                required
                                disabled={enviando}
                            />
                        </Form.Group>

                        {/* BOTONES */}
                        <div className="d-grid gap-2">
                            <Button
                                variant="success"
                                type="submit"
                                disabled={enviando}
                            >
                                {enviando ? 'Cargando...' : '✅ Cargar pedido'}
                            </Button>
                            <Button
                                variant="outline-secondary"
                                type="button"
                                onClick={() => navigate('/ventas')}
                                disabled={enviando}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NuevoPedidoForm;
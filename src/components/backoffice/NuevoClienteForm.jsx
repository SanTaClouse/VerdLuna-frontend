import { useState, useContext } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import ClientesContext from "../../context/clientesProvider";
import { useNavigate } from "react-router-dom";

const NuevoClienteForm = ({ onSuccess }) => {
    const { agregarCliente } = useContext(ClientesContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        direccion: "",
        descripcion: "",
        telefono: "",
        email: ""
    });

    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensaje({ tipo: '', texto: '' });

        const clienteData = {
            nombre: form.nombre,
            direccion: form.direccion,
            descripcion: form.descripcion,
            telefono: form.telefono,
            email: form.email
        };

        try {
            const resultado = await agregarCliente(clienteData);

            if (resultado.success) {
                setMensaje({
                    tipo: 'success',
                    texto: '✅ Cliente agregado con éxito'
                });

                // Limpiar formulario
                setForm({
                    nombre: "",
                    direccion: "",
                    descripcion: "",
                    telefono: "",
                    email: ""
                });

                // Scroll hacia arriba para ver el nuevo cliente
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Cerrar formulario si existe el callback
                setTimeout(() => {
                    if (onSuccess) onSuccess();
                }, 1500);

            } else {
                setMensaje({
                    tipo: 'danger',
                    texto: `❌ Error: ${resultado.error}`
                });
            }

        } catch (error) {
            console.error("Error al cargar cliente:", error);
            setMensaje({
                tipo: 'danger',
                texto: '❌ Error al cargar el cliente'
            });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Container className="my-4">
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Nuevo Cliente
                    </h5>
                </Card.Header>
                <Card.Body className="p-4">

                    {mensaje.texto && (
                        <Alert
                            variant={mensaje.tipo}
                            dismissible
                            onClose={() => setMensaje({ tipo: '', texto: '' })}
                        >
                            {mensaje.texto}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>

                        {/* Nombre */}
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Cliente *</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ej: Verdulería El Sol"
                                required
                                disabled={enviando}
                            />
                        </Form.Group>

                        {/* Dirección */}
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección *</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={form.direccion}
                                onChange={handleChange}
                                placeholder="Ej: San Martín 456, Maciel"
                                required
                                disabled={enviando}
                            />
                        </Form.Group>

                        {/* Teléfono y Email en fila */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono *</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="telefono"
                                        value={form.telefono}
                                        onChange={handleChange}
                                        placeholder="3434569846"
                                        required
                                        disabled={enviando}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="cliente@ejemplo.com"
                                        disabled={enviando}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Descripción */}
                        <Form.Group className="mb-4">
                            <Form.Label>Descripción / Notas</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                placeholder="Información adicional sobre el cliente (tipo de comercio, frecuencia de compra, etc.)"
                                disabled={enviando}
                            />
                        </Form.Group>

                        {/* Botón */}
                        <div className="d-grid">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={enviando}
                                size="lg"
                            >
                                {enviando ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Agregar Cliente
                                    </>
                                )}
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NuevoClienteForm;
import { useState, useContext } from "react"; 
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import ClientesContext from "../../context/clientesProvider";
import { useNavigate } from "react-router-dom";

const NuevoClienteForm = () => {
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

        const ClienteData = {
            nombre: form.nombre,
            direccion: form.direccion,
            descripcion: form.descripcion,
            telefono: form.telefono,
            email: form.email
        };

        try {
            const resultado = await agregarCliente(ClienteData);

            if (resultado.success) {
                setMensaje({
                    tipo: 'success',
                    texto: '✅ Cliente cargado con éxito'
                });

                setForm({
                    nombre: "",
                    direccion: "",
                    descripcion: "",
                    telefono: "",
                    email: ""
                });

                setTimeout(() => {
                    navigate('/clientes');
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
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white text-center">
                    <h4 className="mb-0">🤵‍♂️ Nuevo Cliente</h4>
                </Card.Header>
                <Card.Body>

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

                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Cliente *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ej. Verdulería El Sol"
                                required
                                disabled={enviando}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Dirección *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="direccion"
                                value={form.direccion}
                                onChange={handleChange}
                                placeholder="Calle Ejemplo 123"
                                required
                                disabled={enviando}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción del cliente"
                                disabled={enviando}
                            />
                        </Form.Group>

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

                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono *</Form.Label>
                            <Form.Control
                                type="number"
                                name="telefono"
                                value={form.telefono}
                                onChange={handleChange}
                                placeholder="3434569846"
                                required
                                disabled={enviando}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button
                                variant="success"
                                type="submit"
                                disabled={enviando}
                            >
                                {enviando ? "Cargando..." : "✅ Cargar Cliente"}
                            </Button>

                            <Button
                                variant="outline-secondary"
                                type="button"
                                disabled={enviando}
                                onClick={() => navigate("/clientes")}
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

export default NuevoClienteForm;

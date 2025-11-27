import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Row, Col, Card, Button, Form, Alert,
    Badge, Spinner, Tab, Tabs, Table
} from 'react-bootstrap';
import ClientesContext from '../../../../context/ClientesProvider';
import PedidosContext from '../../../../context/PedidosProvider';

const ClienteDetallePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { obtenerClientePorId, actualizarCliente } = useContext(ClientesContext);
    const { pedidos } = useContext(PedidosContext);

    const cliente = obtenerClientePorId(id);

    const [modoEdicion, setModoEdicion] = useState(false);
    const [formData, setFormData] = useState({});
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    useEffect(() => {
        if (cliente) {
            setFormData({
                nombre: cliente.nombre,
                direccion: cliente.direccion,
                telefono: cliente.telefono,
                email: cliente.email || '',
                descripcion: cliente.descripcion || ''
            });
        }
    }, [cliente]);

    if (!cliente) {
        return (
            <Container className="my-5 text-center">
                <Alert variant="warning">
                    <Alert.Heading>Cliente no encontrado</Alert.Heading>
                    <p>El cliente que buscás no existe o fue eliminado.</p>
                    <Button variant="primary" onClick={() => navigate('/clientes')}>
                        Volver a clientes
                    </Button>
                </Alert>
            </Container>
        );
    }

    // Filtrar pedidos de este cliente
    const pedidosCliente = pedidos.filter(p => p.clienteId === id);

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleGuardar = async () => {
        setGuardando(true);
        setMensaje({ tipo: '', texto: '' });

        try {
            const resultado = await actualizarCliente(id, formData);

            if (resultado.success) {
                setMensaje({
                    tipo: 'success',
                    texto: '✅ Cliente actualizado correctamente'
                });
                setModoEdicion(false);
            } else {
                setMensaje({
                    tipo: 'danger',
                    texto: `❌ Error: ${resultado.error}`
                });
            }
        } catch (error) {
            setMensaje({
                tipo: 'danger',
                texto: '❌ Error al actualizar el cliente'
            });
        } finally {
            setGuardando(false);
        }
    };

    const handleCancelar = () => {
        setFormData({
            nombre: cliente.nombre,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
            email: cliente.email || '',
            descripcion: cliente.descripcion || ''
        });
        setModoEdicion(false);
        setMensaje({ tipo: '', texto: '' });
    };

    const handleLlamar = () => {
        window.location.href = `tel:${cliente.telefono}`;
    };

    const handleWhatsApp = () => {
        window.open(`https://wa.me/54${cliente.telefono}`, '_blank');
    };

    // Calcular estadísticas
    const totalPedidos = pedidosCliente.length;
    const totalFacturado = pedidosCliente.reduce((sum, p) => sum + p.precio, 0);
    const totalCobrado = pedidosCliente.reduce((sum, p) => sum + p.precioAbonado, 0);
    const totalPendiente = totalFacturado - totalCobrado;
    const promedioCompra = totalPedidos > 0 ? totalFacturado / totalPedidos : 0;

    return (
        <div className="bg-light min-vh-100 pb-5">
            <Container className="py-4" style={{ maxWidth: '1100px' }}>

                {/* Header con botón volver */}
                <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/clientes')}
                    className="mb-3"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver a clientes
                </Button>

                {mensaje.texto && (
                    <Alert
                        variant={mensaje.tipo}
                        dismissible
                        onClose={() => setMensaje({ tipo: '', texto: '' })}
                    >
                        {mensaje.texto}
                    </Alert>
                )}

                {/* Card principal con datos del cliente */}
                <Card className="shadow-sm mb-4">
                    <Card.Header className="bg-primary text-white">
                        <Row className="align-items-center">
                            <Col>
                                <h4 className="mb-0">
                                    <i className="bi bi-person-circle me-2"></i>
                                    {cliente.nombre}
                                </h4>
                            </Col>
                            <Col xs="auto">
                                <Badge bg="success">Activo</Badge>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body className="p-4">

                        {/* Botones de acción rápida */}
                        <Row className="mb-4 g-2">
                            <Col xs={6} md={3}>
                                <Button
                                    variant="success"
                                    className="w-100"
                                    onClick={handleWhatsApp}
                                >
                                    <i className="bi bi-whatsapp me-1"></i> WhatsApp
                                </Button>
                            </Col>
                            <Col xs={6} md={3}>
                                <Button
                                    variant="outline-success"
                                    className="w-100"
                                    onClick={handleLlamar}
                                >
                                    <i className="bi bi-telephone me-1"></i> Llamar
                                </Button>
                            </Col>
                            <Col xs={12} md={6}>
                                {!modoEdicion ? (
                                    <Button
                                        variant="outline-primary"
                                        className="w-100"
                                        onClick={() => setModoEdicion(true)}
                                    >
                                        <i className="bi bi-pencil me-1"></i> Editar información
                                    </Button>
                                ) : (
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="primary"
                                            className="flex-grow-1"
                                            onClick={handleGuardar}
                                            disabled={guardando}
                                        >
                                            {guardando ? 'Guardando...' : 'Guardar'}
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={handleCancelar}
                                            disabled={guardando}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                )}
                            </Col>
                        </Row>

                        {/* Formulario de datos */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">
                                        <i className="bi bi-building text-primary me-2"></i>
                                        Nombre
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre || ''}
                                        onChange={handleChange}
                                        disabled={!modoEdicion}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">
                                        <i className="bi bi-geo-alt text-danger me-2"></i>
                                        Dirección
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="direccion"
                                        value={formData.direccion || ''}
                                        onChange={handleChange}
                                        disabled={!modoEdicion}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">
                                        <i className="bi bi-telephone text-success me-2"></i>
                                        Teléfono
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono || ''}
                                        onChange={handleChange}
                                        disabled={!modoEdicion}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">
                                        <i className="bi bi-envelope text-info me-2"></i>
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        disabled={!modoEdicion}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">
                                        <i className="bi bi-card-text text-secondary me-2"></i>
                                        Descripción / Notas
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="descripcion"
                                        value={formData.descripcion || ''}
                                        onChange={handleChange}
                                        disabled={!modoEdicion}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Información de registro */}
                        <div className="border-top pt-3 mt-3">
                            <Row className="text-muted small">
                                <Col xs={6}>
                                    <strong>Cliente desde:</strong> {formatDate(cliente.fechaRegistro)}
                                </Col>
                                <Col xs={6} className="text-end">
                                    <strong>Último pedido:</strong> {formatDate(cliente.ultimoPedido)}
                                </Col>
                            </Row>
                        </div>

                    </Card.Body>
                </Card>

                {/* Estadísticas */}
                <Row className="g-3 mb-4">
                    <Col xs={6} md={3}>
                        <Card className="text-center shadow-sm h-100">
                            <Card.Body>
                                <div className="text-success display-6 fw-bold">
                                    {formatMoney(totalFacturado)}
                                </div>
                                <small className="text-muted">Total Facturado</small>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={6} md={3}>
                        <Card className="text-center shadow-sm h-100">
                            <Card.Body>
                                <div className="text-primary display-6 fw-bold">
                                    {totalPedidos}
                                </div>
                                <small className="text-muted">Pedidos Realizados</small>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={6} md={3}>
                        <Card className="text-center shadow-sm h-100">
                            <Card.Body>
                                <div className="text-warning display-6 fw-bold">
                                    {formatMoney(totalPendiente)}
                                </div>
                                <small className="text-muted">Saldo Pendiente</small>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={6} md={3}>
                        <Card className="text-center shadow-sm h-100">
                            <Card.Body>
                                <div className="text-info display-6 fw-bold">
                                    {formatMoney(promedioCompra)}
                                </div>
                                <small className="text-muted">Promedio por Pedido</small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Tabs: Historial y Gráficos */}
                <Card className="shadow-sm">
                    <Tabs defaultActiveKey="historial" className="mb-3">

                        {/* Tab: Historial de pedidos */}
                        <Tab eventKey="historial" title="📦 Historial de Pedidos">
                            <Card.Body>
                                {pedidosCliente.length === 0 ? (
                                    <Alert variant="info" className="text-center">
                                        Este cliente aún no tiene pedidos registrados
                                    </Alert>
                                ) : (
                                    <div className="table-responsive">
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Descripción</th>
                                                    <th className="text-end">Total</th>
                                                    <th className="text-end">Abonado</th>
                                                    <th className="text-center">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pedidosCliente
                                                    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                                                    .map((pedido) => (
                                                        <tr key={pedido.id}>
                                                            <td className="small">{formatDate(pedido.fecha)}</td>
                                                            <td className="small">{pedido.descripcion}</td>
                                                            <td className="text-end fw-bold">
                                                                {formatMoney(pedido.precio)}
                                                            </td>
                                                            <td className="text-end">
                                                                {formatMoney(pedido.precioAbonado)}
                                                            </td>
                                                            <td className="text-center">
                                                                <Badge bg={pedido.estado === 'Pago' ? 'success' : 'warning'}>
                                                                    {pedido.estado}
                                                                </Badge>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )}
                            </Card.Body>
                        </Tab>

                        {/* Tab: Gráficos y análisis */}
                        <Tab eventKey="graficos" title="📊 Análisis y Gráficos">
                            <Card.Body>
                                <Alert variant="info">
                                    <i className="bi bi-info-circle me-2"></i>
                                    <strong>Próximamente:</strong> Aquí se podrían mostrar gráficos de evolución de compras,
                                    productos más comprados, y análisis de facturación mensual.
                                </Alert>

                                {/* Placeholder para gráficos futuros */}
                                <div className="text-center py-5 bg-light rounded">
                                    <i className="bi bi-graph-up-arrow display-1 text-muted"></i>
                                    <p className="text-muted mt-3">
                                        Gráficos en desarrollo
                                    </p>
                                </div>
                            </Card.Body>
                        </Tab>

                    </Tabs>
                </Card>

            </Container>
        </div>
    );
};

export default ClienteDetallePage;
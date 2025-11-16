import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

const MayoristaPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        comercio: '',
        telefono: '',
        email: '',
        productos: '',
        mensaje: ''
    });

    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        // TODO: Conectar con backend
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Formulario mayorista:', formData);
        setEnviado(true);
        setEnviando(false);

        // Limpiar formulario
        setFormData({
            nombre: '',
            comercio: '',
            telefono: '',
            email: '',
            productos: '',
            mensaje: ''
        });

        setTimeout(() => setEnviado(false), 5000);
    };

    const beneficios = [
        {
            icon: '💰',
            titulo: 'Precios Mayoristas',
            descripcion: 'Precios especiales por volumen. Descuentos en compras frecuentes.'
        },
        {
            icon: '🚚',
            titulo: 'Entrega en tu Local',
            descripcion: 'Llevamos los productos directamente a tu comercio en toda la zona.'
        },
        {
            icon: '📦',
            titulo: 'Pedidos Personalizados',
            descripcion: 'Armamos tu pedido según las necesidades de tu negocio.'
        },
        {
            icon: '✅',
            titulo: 'Calidad Garantizada',
            descripcion: 'Productos frescos y de primera calidad todos los días.'
        },
        {
            icon: '🤝',
            titulo: 'Asesoramiento',
            descripcion: 'Te ayudamos a elegir los mejores productos para tu comercio.'
        },
        {
            icon: '📱',
            titulo: 'Pedidos Flexibles',
            descripcion: 'Realizá tu pedido por WhatsApp, teléfono o mail.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Venta Mayorista de Frutas y Verduras | La Luna - Maciel, Santa Fe</title>
                <meta
                    name="description"
                    content="Mayorista de frutas y verduras en Maciel, Santa Fe. Proveemos a verdulerías, almacenes y rotiserías. Precios mayoristas, entregas en toda la zona. Pedí tu cotización."
                />
                <meta
                    name="keywords"
                    content="mayorista frutas, mayorista verduras, Santa Fe, Maciel, proveedor verdulería, venta por mayor, frutas frescas mayorista"
                />
                <meta property="og:title" content="Venta Mayorista - Verdulería La Luna" />
                <link rel="canonical" href="https://verdulerialuna.com/mayorista" />
            </Helmet>

            {/* Hero */}
            <section
                className="py-5 text-white text-center"
                style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    minHeight: '350px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Container>
                    <h1 className="display-3 fw-bold mb-4">Venta Mayorista</h1>
                    <p className="lead fs-4 mb-4">
                        Proveemos a más de 10 comercios en la zona
                    </p>
                    <p className="fs-5">
                        Verdulerías • Almacenes • Rotiserías • Comedores • Restaurantes
                    </p>
                </Container>
            </section>

            {/* Beneficios */}
            <section className="py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">¿Por qué elegirnos como proveedor?</h2>
                        <p className="lead text-muted">
                            Más de 15 años de experiencia abasteciendo comercios en toda la región
                        </p>
                    </div>

                    <Row className="g-4">
                        {beneficios.map((beneficio, index) => (
                            <Col key={index} xs={12} md={6} lg={4}>
                                <Card className="h-100 border-0 shadow-sm text-center p-3">
                                    <Card.Body>
                                        <div className="display-3 mb-3">{beneficio.icon}</div>
                                        <h4 className="fw-bold mb-3">{beneficio.titulo}</h4>
                                        <p className="text-muted">{beneficio.descripcion}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-5 bg-light">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <h2 className="display-6 fw-bold mb-4">
                                ¿Querés abrir tu propia verdulería?
                            </h2>
                            <p className="lead mb-4">
                                Te acompañamos desde el inicio con productos de calidad y precios competitivos.
                            </p>
                            <ul className="list-unstyled fs-5">
                                <li className="mb-2">✓ Sin mínimo de compra inicial</li>
                                <li className="mb-2">✓ Asesoramiento personalizado</li>
                                <li className="mb-2">✓ Variedad de productos</li>
                                <li className="mb-2">✓ Entregas programadas</li>
                            </ul>
                        </Col>
                        <Col lg={6}>
                            <img
                                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop"
                                alt="Verduras frescas mayorista"
                                className="img-fluid rounded shadow"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Formulario de Cotización */}
            <section className="py-5" id="cotizacion">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card className="shadow-lg border-0">
                                <Card.Body className="p-5">
                                    <div className="text-center mb-4">
                                        <h2 className="fw-bold mb-3">Solicitá tu Cotización</h2>
                                        <p className="text-muted">
                                            Completá el formulario y nos contactaremos a la brevedad con un presupuesto personalizado
                                        </p>
                                    </div>

                                    {enviado && (
                                        <Alert variant="success" dismissible onClose={() => setEnviado(false)}>
                                            ✅ ¡Mensaje enviado con éxito! Nos contactaremos pronto.
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nombre completo *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="nombre"
                                                        value={formData.nombre}
                                                        onChange={handleChange}
                                                        placeholder="Juan Pérez"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nombre del comercio *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="comercio"
                                                        value={formData.comercio}
                                                        onChange={handleChange}
                                                        placeholder="Verdulería Mi Negocio"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Teléfono / WhatsApp *</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        name="telefono"
                                                        value={formData.telefono}
                                                        onChange={handleChange}
                                                        placeholder="3425123456"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="tunegocio@email.com"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Productos que te interesan *</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="productos"
                                                value={formData.productos}
                                                onChange={handleChange}
                                                placeholder="Ej: 20kg papa, 15kg cebolla, 10kg tomate, etc."
                                                required
                                            />
                                            <Form.Text className="text-muted">
                                                Indicá productos y cantidades aproximadas
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Mensaje adicional</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="mensaje"
                                                value={formData.mensaje}
                                                onChange={handleChange}
                                                placeholder="Información adicional sobre tu pedido o consulta..."
                                            />
                                        </Form.Group>

                                        <div className="d-grid">
                                            <Button
                                                type="submit"
                                                variant="success"
                                                size="lg"
                                                disabled={enviando}
                                            >
                                                {enviando ? 'Enviando...' : '📨 Enviar solicitud'}
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Contacto directo */}
            <section className="py-5 bg-success text-white text-center">
                <Container>
                    <h3 className="fw-bold mb-3">¿Preferís contactarnos directamente?</h3>
                    <p className="lead mb-4">Llamanos o escribinos por WhatsApp</p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <a
                            href="tel:+543425123456"
                            className="btn btn-light btn-lg"
                        >
                            📞 (03460) 123456
                        </a>
                        <a
                            href="https://wa.me/543425123456"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-light btn-lg"
                        >
                            💬 WhatsApp
                        </a>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default MayoristaPage;
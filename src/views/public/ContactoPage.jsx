import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

const ContactoPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        asunto: '',
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

        console.log('Formulario contacto:', formData);
        setEnviado(true);
        setEnviando(false);

        // Limpiar formulario
        setFormData({
            nombre: '',
            telefono: '',
            email: '',
            asunto: '',
            mensaje: ''
        });

        setTimeout(() => setEnviado(false), 5000);
    };

    return (
        <>
            <Helmet>
                <title>Contacto | Verdulería La Luna - Maciel, Santa Fe</title>
                <meta
                    name="description"
                    content="Contactate con Verdulería La Luna. Estamos en Maciel, Santa Fe. Teléfono, WhatsApp, email y formulario de contacto."
                />
                <meta property="og:title" content="Contacto - Verdulería La Luna" />
            </Helmet>

            {/* Hero */}
            <section
                className="py-5 text-white text-center"
                style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Container>
                    <h1 className="display-4 fw-bold mb-3">Contacto</h1>
                    <p className="lead">
                        Estamos para ayudarte. Escribinos y te responderemos a la brevedad.
                    </p>
                </Container>
            </section>

            {/* Formulario y datos */}
            <section className="py-5">
                <Container>
                    <Row className="g-5">
                        {/* Formulario */}
                        <Col lg={7}>
                            <Card className="shadow-sm border-0">
                                <Card.Body className="p-4 p-lg-5">
                                    <h3 className="fw-bold mb-4">Envianos tu consulta</h3>

                                    {enviado && (
                                        <Alert variant="success" dismissible onClose={() => setEnviado(false)}>
                                            ✅ ¡Mensaje enviado con éxito! Te responderemos pronto.
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre completo *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                placeholder="Tu nombre"
                                                required
                                            />
                                        </Form.Group>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Teléfono *</Form.Label>
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
                                                        placeholder="tu@email.com"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Asunto *</Form.Label>
                                            <Form.Select
                                                name="asunto"
                                                value={formData.asunto}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccionar...</option>
                                                <option value="consulta">Consulta general</option>
                                                <option value="mayorista">Venta mayorista</option>
                                                <option value="reclamo">Reclamo o sugerencia</option>
                                                <option value="otro">Otro</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Mensaje *</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                name="mensaje"
                                                value={formData.mensaje}
                                                onChange={handleChange}
                                                placeholder="Escribí tu consulta aquí..."
                                                required
                                            />
                                        </Form.Group>

                                        <div className="d-grid">
                                            <Button
                                                type="submit"
                                                variant="success"
                                                size="lg"
                                                disabled={enviando}
                                            >
                                                {enviando ? 'Enviando...' : '📨 Enviar mensaje'}
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Información de contacto */}
                        <Col lg={5}>
                            <div className="mb-4">
                                <h3 className="fw-bold mb-4">Información de contacto</h3>

                                {/* Teléfonos */}
                                <Card className="mb-3 border-0 shadow-sm">
                                    <Card.Body>
                                        <h5 className="text-success mb-3">
                                            <i className="bi bi-telephone-fill"></i> Teléfonos
                                        </h5>
                                        <p className="mb-2">
                                            <strong>Luna 1:</strong> (03460) 123456
                                        </p>
                                        <p className="mb-2">
                                            <strong>Luna 2:</strong> (03460) 123457
                                        </p>
                                        <p className="mb-0">
                                            <strong>Luna 3:</strong> (03460) 123458
                                        </p>
                                    </Card.Body>
                                </Card>

                                {/* WhatsApp */}
                                <Card className="mb-3 border-0 shadow-sm">
                                    <Card.Body>
                                        <h5 className="text-success mb-3">
                                            <i className="bi bi-whatsapp"></i> WhatsApp
                                        </h5>
                                        <a
                                            href="https://wa.me/543425123456"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-success w-100"
                                        >
                                            Chateá con nosotros
                                        </a>
                                    </Card.Body>
                                </Card>

                                {/* Email */}
                                <Card className="mb-3 border-0 shadow-sm">
                                    <Card.Body>
                                        <h5 className="text-success mb-3">
                                            <i className="bi bi-envelope-fill"></i> Email
                                        </h5>
                                        <p className="mb-0">
                                            <a href="mailto:info@verdulerialuna.com">
                                                info@verdulerialuna.com
                                            </a>
                                        </p>
                                    </Card.Body>
                                </Card>

                                {/* Redes sociales */}
                                <Card className="border-0 shadow-sm">
                                    <Card.Body>
                                        <h5 className="text-success mb-3">
                                            <i className="bi bi-share-fill"></i> Redes Sociales
                                        </h5>
                                        <div className="d-flex gap-3">
                                            <a
                                                href="https://facebook.com/verdulerialuna"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-success"
                                            >
                                                <i className="bi bi-facebook"></i>
                                            </a>
                                            <a
                                                href="https://instagram.com/verdulerialuna"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-success"
                                            >
                                                <i className="bi bi-instagram"></i>
                                            </a>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>

                            {/* Horarios */}
                            <Card className="border-0 shadow-sm bg-light">
                                <Card.Body>
                                    <h5 className="fw-bold mb-3">
                                        <i className="bi bi-clock-fill"></i> Horarios de Atención
                                    </h5>
                                    <p className="mb-2">
                                        <strong>Lunes a Viernes:</strong><br />
                                        7:00 - 13:00 | 16:00 - 21:00
                                    </p>
                                    <p className="mb-2">
                                        <strong>Sábados:</strong><br />
                                        7:00 - 13:00 | 16:00 - 21:00
                                    </p>
                                    <p className="mb-0">
                                        <strong>Domingos:</strong><br />
                                        8:00 - 13:00
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mapa (opcional - placeholder) */}
            <section className="py-5 bg-light">
                <Container>
                    <h3 className="text-center fw-bold mb-4">Encontranos en Maciel</h3>
                    <div
                        className="rounded shadow"
                        style={{
                            height: '400px',
                            background: '#e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div className="mt-4">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13466.492296700011!2d-60.90190967437197!3d-32.456022476384895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6724e964e6be3%3A0x4dd9d2d235b4695e!2sLa%20Luna!5e0!3m2!1ses-419!2sar!4v1763330168885!5m2!1ses-419!2sar"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                    </div>
                </Container>
            </section>
        </>
    );
};

export default ContactoPage;
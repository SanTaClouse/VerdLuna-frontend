import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useState, ChangeEvent, FormEvent } from 'react';

interface ContactoFormData {
  nombre: string;
  telefono: string;
  email: string;
  asunto: string;
  mensaje: string;
}

const ContactoPage = () => {
  const [formData, setFormData] = useState<ContactoFormData>({
    nombre: '',
    telefono: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tuemail@ejemplo.com"
                            required
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
                        <option value="">Seleccioná un asunto</option>
                        <option value="consulta">Consulta general</option>
                        <option value="pedido">Pedido minorista</option>
                        <option value="mayorista">Consulta mayorista</option>
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
                        placeholder="Escribí tu consulta o mensaje aquí..."
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
                        {enviando ? 'Enviando...' : '📧 Enviar mensaje'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Información de contacto */}
            <Col lg={5}>
              <Card className="shadow-sm border-0 mb-4">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-4">
                    <i className="bi bi-geo-alt-fill text-success"></i> Sucursales
                  </h4>
                  <div className="mb-3">
                    <h6 className="fw-bold">Luna 1</h6>
                    <p className="text-muted mb-0">Entre Ríos 811, Maciel</p>
                  </div>
                  <div className="mb-3">
                    <h6 className="fw-bold">Luna 2</h6>
                    <p className="text-muted mb-0">Mendoza 530, Maciel</p>
                  </div>
                  <div>
                    <h6 className="fw-bold">Luna 3</h6>
                    <p className="text-muted mb-0">San Juan 810, Maciel</p>
                  </div>
                  <div>
                    <h6 className="fw-bold">Luna 4</h6>
                    <p className="text-muted mb-0">Sarmiento 390, Oliveros</p>
                  </div>
                </Card.Body>
              </Card>

              <Card className="shadow-sm border-0 mb-4">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-4">
                    <i className="bi bi-telephone-fill text-success"></i> Teléfonos
                  </h4>
                  <p className="mb-2">
                    <strong>Principal:</strong> (347) 6603699
                  </p>
                  <p className="mb-0">
                    <strong>WhatsApp:</strong> +54 9 347 6603699
                  </p>
                </Card.Body>
              </Card>

              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-4">
                    <i className="bi bi-clock-fill text-success"></i> Horarios
                  </h4>
                  <p className="mb-2">
                    <strong>Lunes a Sábado:</strong><br />
                    7:00 - 13:00 | 16:00 - 21:00
                  </p>
                  <p className="mb-0">
                    <strong>Domingo:</strong><br />
                    8:00 - 13:00
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mapa (opcional) */}
      <section className="py-5 bg-light">
        <Container className="text-center">
          <h3 className="fw-bold mb-4">Encontranos en Maciel, Santa Fe</h3>
          <p className="lead mb-4">
            Visitanos en cualquiera de nuestras 3 sucursales
          </p>
          <Button
            href="/sucursales"
            variant="success"
            size="lg"
          >
            Ver ubicaciones en el mapa
          </Button>
        </Container>
      </section>
    </>
  );
};

export default ContactoPage;

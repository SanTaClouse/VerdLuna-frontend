import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

interface Horarios {
  lunesViernes: string;
  sabado: string;
  domingo: string;
}

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  horarios: Horarios;
  whatsapp: string;
  telefono: string;
  mapsUrl: string;
  imagen: string;
}

const SucursalesPage = () => {
  const sucursales: Sucursal[] = [
    {
      id: 1,
      nombre: "Luna 1",
      direccion: "Entre Ríos 811, Maciel, Santa Fe",
      horarios: {
        lunesViernes: "7:00 - 13:00 | 16:00 - 21:00",
        sabado: "7:00 - 13:00 | 16:00 - 21:00",
        domingo: "8:00 - 13:00"
      },
      whatsapp: "3425123456",
      telefono: "(03460) 123456",
      mapsUrl: "https://maps.google.com/?q=Entre+Ríos+811+Maciel+Santa+Fe",
      imagen: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      nombre: "Luna 2",
      direccion: "Mendoza 530, Maciel, Santa Fe",
      horarios: {
        lunesViernes: "7:00 - 13:00 | 16:00 - 21:00",
        sabado: "7:00 - 13:00 | 16:00 - 21:00",
        domingo: "8:00 - 13:00"
      },
      whatsapp: "3425123457",
      telefono: "(03460) 123457",
      mapsUrl: "https://maps.google.com/?q=Mendoza+530+Maciel+Santa+Fe",
      imagen: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      nombre: "Luna 3",
      direccion: "San Juan 810, Maciel, Santa Fe",
      horarios: {
        lunesViernes: "7:00 - 13:00 | 16:00 - 21:00",
        sabado: "7:00 - 13:00 | 16:00 - 21:00",
        domingo: "8:00 - 13:00"
      },
      whatsapp: "3425123458",
      telefono: "(03460) 123458",
      mapsUrl: "https://maps.google.com/?q=San+Juan+810+Maciel+Santa+Fe",
      imagen: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      nombre: "Luna 4",
      direccion: "Olvieros, Santa Fe",
      horarios: {
        lunesViernes: "7:00 - 13:00 | 16:00 - 21:00",
        sabado: "7:00 - 13:00 | 16:00 - 21:00",
        domingo: "8:00 - 13:00"
      },
      whatsapp: "3425123458",
      telefono: "(03460) 123458",
      mapsUrl: "https://maps.google.com/?q=Oliveros+Santa+Fe",
      imagen: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&h=400&fit=crop"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sucursales | Verdulería La Luna en Maciel, Santa Fe</title>
        <meta
          name="description"
          content="Encontrá nuestras 3 sucursales en Maciel, Santa Fe. Horarios, direcciones y contacto de Verdulería La Luna."
        />
        <meta property="og:title" content="Sucursales - Verdulería La Luna" />
      </Helmet>

      {/* Header */}
      <section
        className="py-5 text-white text-center"
        style={{
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold mb-3">Nuestras Sucursales</h1>
          <p className="lead">
            3 locales en Maciel para estar siempre cerca tuyo
          </p>
        </Container>
      </section>

      {/* Sucursales */}
      <section className="py-5">
        <Container>
          <Row className="g-5">
            {sucursales.map((sucursal) => (
              <Col key={sucursal.id} xs={12}>
                <Card className="shadow-sm border-0 overflow-hidden">
                  <Row className="g-0">
                    <Col md={5}>
                      <Card.Img
                        src={sucursal.imagen}
                        alt={sucursal.nombre}
                        style={{ height: '100%', objectFit: 'cover', minHeight: '350px' }}
                      />
                    </Col>
                    <Col md={7}>
                      <Card.Body className="p-4 p-lg-5">
                        <h3 className="fw-bold mb-4">
                          🌙 {sucursal.nombre}
                        </h3>

                        {/* Dirección */}
                        <div className="mb-4">
                          <h5 className="text-success mb-2">
                            <i className="bi bi-geo-alt-fill"></i> Dirección
                          </h5>
                          <p className="mb-2">{sucursal.direccion}</p>
                          <a
                            href={sucursal.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-success btn-sm"
                          >
                            <i className="bi bi-map"></i> Ver en Google Maps
                          </a>
                        </div>

                        {/* Horarios */}
                        <div className="mb-4">
                          <h5 className="text-success mb-2">
                            <i className="bi bi-clock-fill"></i> Horarios
                          </h5>
                          <p className="mb-1">
                            <strong>Lunes a Viernes:</strong> {sucursal.horarios.lunesViernes}
                          </p>
                          <p className="mb-1">
                            <strong>Sábado:</strong> {sucursal.horarios.sabado}
                          </p>
                          <p className="mb-0">
                            <strong>Domingo:</strong> {sucursal.horarios.domingo}
                          </p>
                        </div>

                        {/* Contacto */}
                        <div className="mb-4">
                          <h5 className="text-success mb-2">
                            <i className="bi bi-telephone-fill"></i> Contacto
                          </h5>
                          <p className="mb-2">{sucursal.telefono}</p>
                        </div>

                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/${sucursal.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-lg w-100"
                        >
                          <i className="bi bi-whatsapp"></i> Contactar por WhatsApp
                        </a>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-5 bg-light">
        <Container className="text-center">
          <h3 className="fw-bold mb-3">¿Tenés un comercio?</h3>
          <p className="lead mb-4">
            Conocé nuestros precios mayoristas para verdulerías, almacenes y rotiserías
          </p>
          <Button
            href="/mayorista"
            variant="success"
            size="lg"
          >
            Ver venta mayorista
          </Button>
        </Container>
      </section>
    </>
  );
};

export default SucursalesPage;

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  whatsapp: string;
  imagen: string;
}

const SucursalesPreview = () => {
  const sucursales: Sucursal[] = [
    {
      id: 1,
      nombre: "Luna 1",
      direccion: "Entre Ríos 811 - Maciel",
      whatsapp: "3476603699",
      imagen: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      nombre: "Luna 2",
      direccion: "Mendoza 530 - Maciel",
      whatsapp: "3476603699",
      imagen: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      nombre: "Luna 3",
      direccion: "San Juan 810 - Maciel",
      whatsapp: "3476603699",
      imagen: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      nombre: "Luna 4",
      direccion: "Sarmiento 390 - Oliveros",
      whatsapp: "3476603699",
      imagen: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-5 bg-light">
      <Container>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Nuestras Sucursales</h2>
            <p className="lead text-muted">
              Tres locales en Maciel y uno en Oliveros ofreciendo el mejor servicio
            </p>
          </div>

          <Row className="g-4">
            {sucursales.map((sucursal) => (
              <Col key={sucursal.id} md={6} lg={3}>
                <Card className="h-100 shadow-sm border-0 overflow-hidden hover-card">
                  <Card.Img
                    variant="top"
                    src={sucursal.imagen}
                    alt={sucursal.nombre}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold text-success">
                      {sucursal.nombre}
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      <i className="bi bi-geo-alt-fill text-success me-2"></i>
                      {sucursal.direccion}
                    </Card.Text>
                    <Button
                      variant="success"
                      size="sm"
                      as="a"
                      href={`https://wa.me/549${sucursal.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-100"
                    >
                      <i className="bi bi-whatsapp me-2"></i>
                      Contactar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Button
              as={Link as any}
              to="/sucursales"
              variant="outline-success"
              size="lg"
              className="px-5"
            >
              Ver todas las sucursales
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default SucursalesPreview;

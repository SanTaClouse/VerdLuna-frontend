import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SucursalesPreview = () => {
    const sucursales = [
        {
            id: 1,
            nombre: "Luna 1",
            direccion: "Entre Ríos 811",
            whatsapp: "3425123456",
            imagen: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            nombre: "Luna 2",
            direccion: "Mendoza 530",
            whatsapp: "3425123457",
            imagen: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            nombre: "Luna 3",
            direccion: "San Juan 810",
            whatsapp: "3425123458",
            imagen: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop"
        },
        {
            id: 4,
            nombre: "Luna 4",
            direccion: "Olvieros",
            whatsapp: "3425123458",
            imagen: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop"
        }
    ];

    return (
        <section className="py-5 bg-light">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 50 }} // Starts 50px down, transparent
                    whileInView={{ opacity: 1, y: 0 }} // Moves up to position
                    transition={{ duration: 0.8, ease: "easeOut" }} // Smooth easing
                    viewport={{ once: true }}
                >

                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Nuestras Sucursales</h2>
                        <p className="lead text-muted">
                            Tres locales en Maciel y 1 en Oliveros ofreciendo el mejor servicio
                        </p>
                    </div>
                </motion.div>

                <Row className="g-4">
                    {sucursales.map((sucursal) => (
                        <Col key={sucursal.id} xs={12} md={4}>
                            <Card className="h-100 shadow-sm border-0 hover-lift">
                                <Card.Img
                                    variant="top"
                                    src={sucursal.imagen}
                                    alt={sucursal.nombre}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="text-center">
                                    <h4 className="fw-bold mb-3">🌙 {sucursal.nombre}</h4>
                                    <p className="text-muted mb-3">
                                        <i className="bi bi-geo-alt-fill"></i> {sucursal.direccion}
                                    </p>
                                    <a
                                        href={`https://wa.me/${sucursal.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-success w-100"
                                    >
                                        <i className="bi bi-whatsapp"></i> Contactar
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="text-center mt-5">
                    <Button
                        as={Link}
                        to="/sucursales"
                        variant="outline-success"
                        size="lg"
                    >
                        Ver horarios y más información
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default SucursalesPreview;
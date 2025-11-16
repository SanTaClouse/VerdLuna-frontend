import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MayoristaSection = () => {
    return (
        <section className="py-5 bg-success text-white">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <h2 className="display-5 fw-bold mb-4">
                            Venta Mayorista
                        </h2>
                        <p className="lead mb-4">
                            Proveemos a más de <strong>10 clientes mayoristas</strong> en la zona:
                            verdulerías, almacenes, rotiserías y comedores.
                        </p>
                        <ul className="list-unstyled mb-4 fs-5">
                            <li className="mb-2">✅ Productos frescos de calidad</li>
                            <li className="mb-2">✅ Precios mayoristas competitivos</li>
                            <li className="mb-2">✅ Entregas en toda la zona</li>
                            <li className="mb-2">✅ Atención personalizada</li>
                        </ul>
                    </Col>

                    <Col lg={6}>
                        <div className="bg-white text-dark rounded p-5 shadow-lg">
                            <h3 className="fw-bold mb-3 text-success">
                                ¿Querés abrir tu propia verdulería?
                            </h3>
                            <p className="mb-4">
                                Te ayudamos a comenzar tu negocio con productos de primera calidad
                                a precios mayoristas. Hacé tu pedido ahora.
                            </p>
                            <Button
                                as={Link}
                                to="/mayorista"
                                variant="success"
                                size="lg"
                                className="w-100 py-3"
                            >
                                📦 Hacer pedido mayorista
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MayoristaSection;
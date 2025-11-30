import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MayoristaSection = () => {
  return (
    <section className="py-5 bg-success text-white">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white text-dark rounded p-5 shadow-lg">
                <h3 className="fw-bold mb-3 text-success">
                  ¿Querés abrir tu propia verdulería?
                </h3>
                <p className="mb-4">
                  Te ayudamos a comenzar tu negocio con productos de primera calidad
                  a precios mayoristas. Hacé tu pedido ahora.
                </p>
                <Button
                  as={Link as any}
                  to="/mayorista"
                  variant="success"
                  size="lg"
                  className="w-100 mb-3"
                >
                  Solicitar información
                </Button>
                <p className="text-center text-muted small mb-0">
                  <i className="bi bi-shield-check me-2"></i>
                  Más de 15 años de experiencia en el rubro
                </p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MayoristaSection;

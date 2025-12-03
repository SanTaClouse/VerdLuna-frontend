import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row className="g-4">
          {/* Columna 1 - Logo y descripción */}
          <Col lg={4} md={6}>
            <h4 className="fw-bold mb-3">🌙 Verdulería La Luna</h4>
            <p className="text-white-50">
              Más de 15 años llevando frescura y calidad a las familias y comercios de Maciel, Santa Fe.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="https://facebook.com/verdulerialuna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://instagram.com/verdulerialuna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://wa.me/543425123456"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </Col>

          {/* Columna 2 - Enlaces */}
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-3">Enlaces</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/sucursales" className="text-white-50 text-decoration-none">
                  Sucursales
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/mayorista" className="text-white-50 text-decoration-none">
                  Mayorista
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-white-50 text-decoration-none">
                  Contacto
                </Link>
              </li>
            </ul>
          </Col>

          {/* Columna 3 - Sucursales */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold mb-3">Sucursales</h5>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill"></i> Luna 1: Entre Ríos 811 - Maciel
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill"></i> Luna 2: Mendoza 530 - Maciel
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill"></i> Luna 3: San Juan 810 - Maciel
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill"></i> Luna 4 : Sarmiento 390 - Oliveros
              </li>
            </ul>
          </Col>

          {/* Columna 4 - Contacto */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold mb-3">Contacto</h5>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">
                <i className="bi bi-telephone-fill"></i> 3476603699
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope-fill"></i> Pablocarrizo120@gmail.com
              </li>
              <li className="mb-2">
                <i className="bi bi-whatsapp"></i> +54 9 347 6603699
              </li>
            </ul>

            <div className="mt-3">
              <h6 className="fw-bold mb-2">Horarios</h6>
              <p className="text-white-50 small mb-1">
                Lun-Sáb: 7-13 | 16-21
              </p>
              <p className="text-white-50 small mb-0">
                Dom: 8-13
              </p>
            </div>
          </Col>
        </Row>

        {/* Línea divisoria */}
        <hr className="my-4 border-secondary" />

        {/* Copyright y créditos */}
        <Row>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-white-50 small mb-0">
              © {currentYear} Verdulería La Luna. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link to="/login" className="text-white-50 small text-decoration-none">
              Acceso Administradores
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

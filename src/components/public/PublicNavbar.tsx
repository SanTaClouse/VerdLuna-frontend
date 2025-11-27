import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoLuna from '../../assets/laluna-logo.png';

const PublicNavbar = () => {
  return (
    <Navbar
      bg="white"
      variant="light"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={LogoLuna}
            width="120"
            alt="Verdulería La Luna"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Botón hamburguesa */}
        <Navbar.Toggle aria-controls="public-navbar-nav" />

        {/* Links de navegación */}
        <Navbar.Collapse id="public-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="px-3">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/sucursales" className="px-3">
              Sucursales
            </Nav.Link>
            <Nav.Link as={Link} to="/mayorista" className="px-3">
              Mayorista
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="px-3">
              Contacto
            </Nav.Link>

            {/* Botón de acceso al backoffice */}
            <Button
              as={Link as any}
              to="/login"
              variant="outline-success"
              size="sm"
              className="ms-3"
            >
              Acceso Administrador
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;

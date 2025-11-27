import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoLuna from "../assets/laluna-logo.png";

const AppNavbar = ({ user, onLogout }) => {
  return (
    <Navbar bg="white" variant="light" expand="sm" collapseOnSelect className="shadow-sm">
      <Container>
        {/* Logo / Marca */}
        <Navbar.Brand as={Link} to="/ventas">
          <img
            src={LogoLuna}
            width="130"
            alt='Logo-Luna'
            className='d-inline-block align-top'
          />
        </Navbar.Brand>

        {/* Botón hamburguesa */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links y dropdown */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/ventas">
              <i className="bi bi-receipt me-1"></i> Ventas
            </Nav.Link>
            <Nav.Link as={Link} to="/nuevopedido">
              <i className="bi bi-plus-circle me-1"></i> Nuevo Pedido
            </Nav.Link>
            <Nav.Link as={Link} to="/clientes">
              <i className="bi bi-people me-1"></i> Clientes
            </Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <NavDropdown title={user.nombre} id="user-dropdown" align="end">
                <NavDropdown.Item onClick={onLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="dark" as={Link} to="/login">
                Iniciar sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
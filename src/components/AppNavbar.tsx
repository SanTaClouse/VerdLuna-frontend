import { Navbar, Container, Nav, NavDropdown, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LogoLuna from "../assets/laluna-logo.png";

const AppNavbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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
            <Nav.Link as={Link} to="/mercaderia">
              <i className="bi bi-box-seam me-1"></i> Mercaderia
            </Nav.Link>
          </Nav>

          <Nav>
            {loading ? (
              <Spinner animation="border" size="sm" variant="success" />
            ) : user ? (
              <NavDropdown
                title={
                  <>
                    <i className="bi bi-person-circle me-1"></i>
                    {user.nombre || user.usuario || 'Usuario'}
                  </>
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Header>
                  <small className="text-muted">{user.email}</small>
                </NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="success" as={Link as any} to="/login">
                <i className="bi bi-box-arrow-in-right me-1"></i>
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

import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'

import LogoLuna from "../assets/laluna-logo.png"

const AppNavbar = ({ user, onLogout }) => {
  return (
    <Navbar bg="header" variant="light" expand="sm" collapseOnSelect>
      <Container>
        {/* Logo / Marca */}
        <Navbar.Brand href="home">
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
            <Nav.Link href="/ventas">Ventas</Nav.Link>
            <Nav.Link href="/clientes">Clientes</Nav.Link>
            <Nav.Link href="/nuevopedido">Agregar Pedido</Nav.Link>
            <Nav.Link href="/nuevocliente">Agregar Cliente</Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <NavDropdown title={user.nombre} id="user-dropdown" align="end">
                <NavDropdown.Item onClick={onLogout}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="dark">Iniciar sesión</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar

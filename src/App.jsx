import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Context Providers
import { PedidosProvider } from './context/pedidosProvider.jsx';
import { ClientesProvider } from './context/clientesProvider.jsx';

// Layouts
import PublicNavbar from './components/public/PublicNavbar.jsx';
import AppNavbar from './components/AppNavbar.jsx';
import Footer from './components/public/Footer.jsx';

// Views Públicas
import HomePage from './views/public/HomePage.jsx';
import SucursalesPage from './views/public/SucursalesPage.jsx';
import MayoristaPage from './views/public/MayoristaPage.jsx';
import ContactoPage from './views/public/ContactoPage.jsx';
import LoginPage from './views/auth/LoginPage.jsx';

// Views BackOffice
import MisVentasPage from './views/backoffice/MisVentasPage/Pedidos/MisVentasPage.jsx';
import NuevoPedidoPage from './views/backoffice/MisVentasPage/Pedidos/NuevoPedido.jsx';
import ClientesPage from './views/backoffice/MisVentasPage/Clientes/ClientesPage.jsx';
import ClienteDetallePage from './views/backoffice/MisVentasPage/Clientes/ClienteDetallePage.jsx';

// Usuario de prueba
const usuarioDemo = {
  nombre: 'Admin Luna',
  email: 'admin@laluna.com'
};

function App() {
  const [user, setUser] = useState(usuarioDemo); // Cambiar a null cuando tengas login real
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
  };

  // Determinar si estamos en una ruta del backoffice
  const isBackOffice = location.pathname.startsWith('/ventas') ||
    location.pathname.startsWith('/nuevopedido') ||
    location.pathname.startsWith('/clientes');

  // Determinar si estamos en login
  const isLoginPage = location.pathname === '/login';

  return (
    <HelmetProvider>

      {/* Navbar: público o backoffice según la ruta */}
      {!isLoginPage && (
        isBackOffice ? (
          <AppNavbar user={user} onLogout={handleLogout} />
        ) : (
          <PublicNavbar />
        )
      )}

      <Routes>
        {/* ===== RUTAS PÚBLICAS ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/sucursales" element={<SucursalesPage />} />
        <Route path="/mayorista" element={<MayoristaPage />} />
        <Route path="/contacto" element={<ContactoPage />} />

        {/* ===== LOGIN ===== */}
        <Route path="/login" element={<LoginPage />} />

        {/* ===== RUTAS BACKOFFICE - VENTAS ===== */}
        <Route
          path="/ventas"
          element={
            <PedidosProvider>
              <MisVentasPage />
            </PedidosProvider>
          }
        />
        <Route
          path="/nuevopedido"
          element={
            <PedidosProvider>
              <NuevoPedidoPage />
            </PedidosProvider>
          }
        />

        {/* ===== RUTAS BACKOFFICE - CLIENTES ===== */}
        <Route
          path="/clientes"
          element={
            <ClientesProvider>
              <ClientesPage />
            </ClientesProvider>
          }
        />
        <Route
          path="/clientes/:id"
          element={
            <ClientesProvider>
              <PedidosProvider>
                <ClienteDetallePage />
              </PedidosProvider>
            </ClientesProvider>
          }
        />

        {/* Ruta 404 - redirige al home */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* Footer solo en rutas públicas */}
      {!isBackOffice && !isLoginPage && <Footer />}

    </HelmetProvider>
  );
}

export default App;
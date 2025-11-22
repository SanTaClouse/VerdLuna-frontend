import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { PedidosProvider } from './context/pedidosProvider.jsx';
import PublicNavbar from './components/public/PublicNavbar.jsx';
import AppNavbar from './components/AppNavbar.jsx';
import Footer from './components/public/Footer.jsx'; //Raro
import HomePage from './views/public/HomePage.jsx';
import SucursalesPage from './views/public/SucursalesPage.jsx';
import MayoristaPage from './views/public/MayoristaPage.jsx';
import ContactoPage from './views/public/ContactoPage.jsx';
import LoginPage from './views/auth/LoginPage.jsx';
import MisVentasPage from './views/backoffice/MisVentasPage/MisVentasPage.jsx';
import NuevoPedidoPage from './views/backoffice/MisVentasPage/NuevoPedido/NuevoPedido.jsx';
import NuevoClientePage from './views/backoffice/MisVentasPage/NuevoCliente/NuevoCliente.jsx';
import { ClientesProvider } from './context/clientesProvider.jsx';

const usuarioDemo = {
  nombre: 'Admin Luna',
  email: 'admin@laluna.com'
};

function App() {
  const [user, setUser] = useState(null); // null = no logueado
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
  };

  const isBackOffice = location.pathname.startsWith('/ventas') ||
    location.pathname.startsWith('/nuevopedido') || location.pathname.startsWith('/clientes') || location.pathname.startsWith('/nuevocliente') ;

  const isLoginPage = location.pathname === '/login';

  return (
    <HelmetProvider>
      {/* Mostrar navbar público o de backoffice según la ruta */}
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

        {/* ===== RUTAS BACKOFFICE (Protegidas) ===== */}
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
<Route
          path="/nuevocliente"
          element={
            <ClientesProvider>
              <NuevoClientePage />
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
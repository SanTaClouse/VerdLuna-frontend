import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Context Providers
import { AuthProvider } from './context/AuthProvider'
import { PedidosProvider } from './context/PedidosProvider'
import { ClientesProvider } from './context/ClientesProvider';

// Componentes de autenticación
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';

// Layouts
import PublicNavbar from './components/public/PublicNavbar';
import AppNavbar from './components/AppNavbar';
import Footer from './components/public/Footer';

// Views Públicas
import HomePage from './views/public/HomePage';
import SucursalesPage from './views/public/SucursalesPage';
import MayoristaPage from './views/public/MayoristaPage';
import ContactoPage from './views/public/ContactoPage';
import LoginPage from './views/auth/LoginPage';

// Views BackOffice
import MisVentasPage from './views/backoffice/MisVentasPage/Pedidos/MisVentasPage';
import NuevoPedidoPage from './views/backoffice/MisVentasPage/Pedidos/NuevoPedido';
import ClientesPage from './views/backoffice/MisVentasPage/Clientes/ClientesPage';
import ClienteDetallePage from './views/backoffice/MisVentasPage/Clientes/ClienteDetallePage';

// Página 404
import NotFoundPage from './views/NotFoundPage';

function AppContent() {
  const location = useLocation();

  // Determinar tipo de ruta
  const isBackOffice = location.pathname.startsWith('/ventas') ||
    location.pathname.startsWith('/nuevopedido') ||
    location.pathname.startsWith('/clientes');
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* Navbar según el tipo de ruta */}
      {!isLoginPage && (
        isBackOffice ? <AppNavbar /> : <PublicNavbar />
      )}

      <Routes>
        {/* ===== RUTAS PÚBLICAS ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/sucursales" element={<SucursalesPage />} />
        <Route path="/mayorista" element={<MayoristaPage />} />
        <Route path="/contacto" element={<ContactoPage />} />

        {/* ===== LOGIN (redirige si ya está logueado) ===== */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* ===== RUTAS BACKOFFICE - PROTEGIDAS ===== */}
        <Route
          path="/ventas"
          element={
            <PrivateRoute>
              <PedidosProvider>
                <MisVentasPage />
              </PedidosProvider>
            </PrivateRoute>
          }
        />

        <Route
          path="/nuevopedido"
          element={
            <PrivateRoute>
              <PedidosProvider>
                <NuevoPedidoPage />
              </PedidosProvider>
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <ClientesProvider>
                <ClientesPage />
              </ClientesProvider>
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes/:id"
          element={
            <PrivateRoute>
              <ClientesProvider>
                <PedidosProvider>
                  <ClienteDetallePage />
                </PedidosProvider>
              </ClientesProvider>
            </PrivateRoute>
          }
        />

        {/* ===== 404 ===== */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Footer solo en rutas públicas */}
      {!isBackOffice && !isLoginPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
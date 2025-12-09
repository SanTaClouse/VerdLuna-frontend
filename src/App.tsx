import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Spinner } from 'react-bootstrap';

// Context Providers
import { AuthProvider } from './context/AuthProvider';
import { PedidosProvider } from './context/PedidosProvider';
import { ClientesProvider } from './context/ClientesProvider';

// Componentes de autenticación (no lazy - necesarios inmediatamente)
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';

// Layouts (no lazy - necesarios en casi todas las páginas)
import PublicNavbar from './components/public/PublicNavbar';
import AppNavbar from './components/AppNavbar';
import Footer from './components/public/Footer';

// Loading component
const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Cargando...</span>
    </Spinner>
  </div>
);

// Views Públicas - Lazy loaded
const HomePage = lazy(() => import('./views/public/HomePage'));
const SucursalesPage = lazy(() => import('./views/public/SucursalesPage'));
const MayoristaPage = lazy(() => import('./views/public/MayoristaPage'));
const ContactoPage = lazy(() => import('./views/public/ContactoPage'));
const LoginPage = lazy(() => import('./views/auth/LoginPage'));

// Views BackOffice - Lazy loaded (solo se cargan si el usuario está autenticado)
const MisVentasPage = lazy(() => import('./views/backoffice/MisVentasPage/Pedidos/MisVentasPage'));
const NuevoPedidoPage = lazy(() => import('./views/backoffice/MisVentasPage/Pedidos/NuevoPedido'));
const ClientesPage = lazy(() => import('./views/backoffice/MisVentasPage/Clientes/ClientesPage'));
const ClienteDetallePage = lazy(() => import('./views/backoffice/MisVentasPage/Clientes/ClienteDetallePage'));

// Página 404 - Lazy loaded
const NotFoundPage = lazy(() => import('./views/NotFoundPage'));

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

      <Suspense fallback={<PageLoader />}>
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
      </Suspense>

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

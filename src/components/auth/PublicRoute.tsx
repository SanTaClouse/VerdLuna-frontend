import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { Spinner, Container } from 'react-bootstrap';
import { ReactNode } from 'react';

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Componente para rutas públicas que no deberían ser accesibles
 * si el usuario ya está autenticado (como /login)
 */
const PublicRoute = ({ children, redirectTo = '/ventas' }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mostrar spinner mientras verifica autenticación
  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="success" />
          <p className="mt-3 text-muted">Cargando...</p>
        </div>
      </Container>
    );
  }

  // Si ya está autenticado, redirigir
  if (isAuthenticated) {
    // Intentar redirigir a donde quería ir, o al destino por defecto
    const from = (location.state as any)?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  // No autenticado, mostrar contenido (login, etc.)
  return <>{children}</>;
};

export default PublicRoute;

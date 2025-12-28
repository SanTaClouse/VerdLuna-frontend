import { Container, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    resetErrorBoundary();
    navigate('/');
  };

  const handleReload = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  // En desarrollo, mostrar más detalles
  const isDevelopment = import.meta.env.MODE === 'development';

  return (
    <Container className="py-5">
      <div className="text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            fill="currentColor"
            className="text-danger mb-3"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>

        <h1 className="display-4 mb-3">¡Oops! Algo salió mal</h1>
        <p className="lead text-muted mb-4">
          Lo sentimos, ocurrió un error inesperado. Nuestro equipo ha sido notificado.
        </p>

        {isDevelopment && (
          <Alert variant="danger" className="text-start mb-4">
            <Alert.Heading>Detalles del error (solo en desarrollo):</Alert.Heading>
            <p className="mb-1">
              <strong>Mensaje:</strong> {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-decoration-underline">
                  Ver stack trace
                </summary>
                <pre className="mt-2 p-2 bg-light border rounded" style={{ fontSize: '0.875rem', overflow: 'auto' }}>
                  {error.stack}
                </pre>
              </details>
            )}
          </Alert>
        )}

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Button variant="primary" size="lg" onClick={handleReload}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reintentar
          </Button>
          <Button variant="outline-secondary" size="lg" onClick={handleGoHome}>
            <i className="bi bi-house-door me-2"></i>
            Ir al inicio
          </Button>
        </div>

        <div className="mt-5 text-muted">
          <small>
            Si el problema persiste, por favor contacta al soporte técnico.
          </small>
        </div>
      </div>
    </Container>
  );
};

export default ErrorFallback;

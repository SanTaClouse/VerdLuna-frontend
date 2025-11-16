import { Container, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useContext } from 'react';
import PedidosContext from '../../context/pedidosProvider';

const PedidoCards = () => {
  const {
    pedidosFiltrados,
    loading,
    error,
    actualizarEstadoPago
  } = useContext(PedidosContext);

  const pedidosPorFecha = pedidosFiltrados.reduce((acc, pedido) => {
    const fecha = pedido.fecha;
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(pedido);
    return acc;
  }, {});

  const fechasOrdenadas = Object.keys(pedidosPorFecha).sort((a, b) =>
    new Date(b) - new Date(a)
  );

  const handleMarcarPago = async (pedidoId) => {
    const confirmacion = window.confirm('¿Marcar este pedido como pago completo?');
    if (confirmacion) {
      const resultado = await actualizarEstadoPago(pedidoId);
      if (resultado.success) {
        alert('✅ Pedido marcado como pago');
      } else {
        alert('❌ Error al actualizar el pedido');
      }
    }
  };

  const formatearFecha = (fecha) => {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', opciones);
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando pedidos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  if (fechasOrdenadas.length === 0) {
    return (
      <Container className="my-4">
        <Alert variant="info">
          No se encontraron pedidos con los filtros aplicados.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mb-4">
      {fechasOrdenadas.map((fecha) => (
        <Card key={fecha} className="mb-3 shadow-sm">
          <Card.Header className="bg-light">
            <strong>{formatearFecha(fecha)}</strong>
            <Badge bg="secondary" className="ms-2">
              {pedidosPorFecha[fecha].length} pedido{pedidosPorFecha[fecha].length > 1 ? 's' : ''}
            </Badge>
          </Card.Header>
          <Card.Body className="p-2">
            {pedidosPorFecha[fecha].map((pedido) => {
              const restante = pedido.precio - pedido.precioAbonado;
              const isPago = pedido.estado === 'Pago';

              return (
                <Card
                  key={pedido.id}
                  className="mb-2"
                  style={{
                    backgroundColor: isPago ? '#d4edda' : '#f8d7da',
                    borderLeft: `4px solid ${isPago ? '#28a745' : '#dc3545'}`
                  }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <Card.Title className="mb-1">
                          {pedido.cliente}
                          <Badge
                            bg={isPago ? 'success' : 'danger'}
                            className="ms-2"
                          >
                            {pedido.estado}
                          </Badge>
                        </Card.Title>
                        <Card.Text className="text-muted small mb-0">
                          ID: {pedido.id}
                        </Card.Text>
                      </div>
                    </div>

                    <Card.Text className="mb-2">
                      <small>{pedido.descripcion}</small>
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Total: ${pedido.precio.toFixed(2)}</strong>
                        <br />
                        <span className="text-muted">
                          Abonado: ${pedido.precioAbonado.toFixed(2)}
                        </span>
                        {restante > 0 && (
                          <>
                            <br />
                            <span className="text-danger">
                              Restante: ${restante.toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>

                      {!isPago && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleMarcarPago(pedido.id)}
                        >
                          Marcar como pago
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default PedidoCards;
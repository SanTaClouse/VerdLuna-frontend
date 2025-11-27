import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { useContext, useState } from 'react';
import PedidosContext from '../../context/PedidosProvider';
import PedidoCard from './pedidoCard';
import PedidoModal from './pedidoModal';
import { Pedido } from '../../types';

const PedidoCards = () => {
  const context = useContext(PedidosContext);

  if (!context) {
    throw new Error('PedidoCards must be used within PedidosProvider');
  }

  const {
    pedidosFiltrados,
    loading,
    error,
    actualizarEstadoPago
  } = context;

  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Agrupar pedidos por fecha
  const pedidosPorFecha = pedidosFiltrados.reduce<Record<string, Pedido[]>>((acc, pedido) => {
    const fecha = pedido.fecha;
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(pedido);
    return acc;
  }, {});

  // Ordenar fechas de más reciente a más antigua
  const fechasOrdenadas = Object.keys(pedidosPorFecha).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );

  const formatearFecha = (fecha: string): string => {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', opciones);
  };

  const handleClickPedido = (pedido: Pedido) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPedidoSeleccionado(null);
  };

  const handleMarcarPago = async (pedidoId: number | string) => {
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

  // Estados de carga
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
    <>
      <Container className="mb-4">
        {fechasOrdenadas.map((fecha) => (
          <Card key={fecha} className="mb-3 shadow-sm border-0">
            <Card.Header className="bg-light border-0">
              <div className="d-flex justify-content-between align-items-center">
                <strong className="text-capitalize">{formatearFecha(fecha)}</strong>
                <Badge bg="secondary" pill>
                  {pedidosPorFecha[fecha].length}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-2">
              {pedidosPorFecha[fecha].map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  pedido={pedido}
                  onClick={handleClickPedido}
                />
              ))}
            </Card.Body>
          </Card>
        ))}

        {/* Indicador de cantidad total */}
        <div className="text-center mt-3">
          <small className="text-muted">
            <i className="bi bi-receipt me-1"></i>
            {pedidosFiltrados.length} pedido{pedidosFiltrados.length !== 1 ? 's' : ''} en total
          </small>
        </div>
      </Container>

      {/* Modal de detalle */}
      <PedidoModal
        show={showModal}
        onHide={handleCloseModal}
        pedido={pedidoSeleccionado}
        onMarcarPago={handleMarcarPago}
      />
    </>
  );
};

export default PedidoCards;

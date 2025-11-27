import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PedidosContext from '../../context/PedidosProvider';

interface StatItem {
  titulo: string;
  valor: string | number;
  color: string;
  icon: string;
}

const Estadisticas = () => {
  const context = useContext(PedidosContext);

  if (!context) {
    throw new Error('Estadisticas must be used within PedidosProvider');
  }

  const { estadisticas } = context;

  const stats: StatItem[] = [
    {
      titulo: 'Total Ventas',
      valor: `$${estadisticas.totalVentas.toFixed(2)}`,
      color: 'primary',
      icon: '💰'
    },
    {
      titulo: 'Total Cobrado',
      valor: `$${estadisticas.totalCobrado.toFixed(2)}`,
      color: 'success',
      icon: '✅'
    },
    {
      titulo: 'Pendiente de Cobro',
      valor: `$${estadisticas.totalPendiente.toFixed(2)}`,
      color: 'danger',
      icon: '⏳'
    },
    {
      titulo: 'Pedidos Pagos',
      valor: estadisticas.cantidadPagos,
      color: 'success',
      icon: '✔️'
    },
    {
      titulo: 'Pedidos Impagos',
      valor: estadisticas.cantidadImpagos,
      color: 'warning',
      icon: '⚠️'
    },
    {
      titulo: 'Total Pedidos',
      valor: estadisticas.cantidadTotal,
      color: 'info',
      icon: '📦'
    }
  ];

  // Calcular porcentaje de cobro
  const porcentajeCobro = estadisticas.totalVentas > 0
    ? ((estadisticas.totalCobrado / estadisticas.totalVentas) * 100).toFixed(1)
    : '0';

  return (
    <Container className="my-4">
      <h4 className="mb-3">📊 Resumen</h4>

      <Row>
        {stats.map((stat, index) => (
          <Col xs={12} sm={6} md={4} key={index} className="mb-3">
            <Card className={`text-center shadow-sm border-${stat.color}`}>
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
                <Card.Title className="h6 text-muted mb-2">
                  {stat.titulo}
                </Card.Title>
                <Card.Text className={`h4 mb-0 text-${stat.color}`}>
                  {stat.valor}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Barra de progreso de cobro */}
      <Card className="mt-3 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <strong>Porcentaje de Cobro</strong>
            <span className="text-success">{porcentajeCobro}%</span>
          </div>
          <div className="progress" style={{ height: '25px' }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${porcentajeCobro}%` }}
              aria-valuenow={parseFloat(porcentajeCobro)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {parseFloat(porcentajeCobro) > 10 && `${porcentajeCobro}%`}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Estadisticas;

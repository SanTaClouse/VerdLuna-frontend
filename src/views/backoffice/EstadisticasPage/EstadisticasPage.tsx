import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button, Spinner, Alert } from 'react-bootstrap';
import pedidosService from '../../../services/pedidosService';
import GraficoBarrasMensual from '../../../components/backoffice/reportes/GraficoBarrasMensual';
import GraficoLineaTendencia from '../../../components/backoffice/reportes/GraficoLineaTendencia';
import GraficoPie from '../../../components/backoffice/reportes/GraficoPie';
import TablaTopClientes from '../../../components/backoffice/reportes/TablaTopClientes';

type Periodo = 6 | 12 | 'año';

interface DatoMensual {
  año: number;
  mes: number;
  totalVentas: number;
  totalCobrado: number;
  cantidadPedidos: number;
  cantidadPagos: number;
  cantidadImpagos: number;
}

interface TopCliente {
  clienteId: string;
  nombre: string;
  totalComprado: number;
  totalCobrado: number;
  totalPendiente: number;
  cantidadPedidos: number;
}

interface Estadisticas {
  totalVentas: number;
  totalCobrado: number;
  totalPendiente: number;
  cantidadPagos: number;
  cantidadImpagos: number;
  cantidadTotal: number;
}

interface DatosReporte {
  estadisticas: Estadisticas;
  reporteMensual: DatoMensual[];
  topClientes: TopCliente[];
}

const formatPeso = (valor: number) =>
  `$${valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const getMeses = (periodo: Periodo): number => {
  if (periodo === 'año') {
    const ahora = new Date();
    return ahora.getMonth() + 1; // meses transcurridos del año actual
  }
  return periodo;
};

const EstadisticasPage = () => {
  const [periodo, setPeriodo] = useState<Periodo>(6);
  const [datos, setDatos] = useState<DatosReporte | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      setError(null);
      try {
        const meses = getMeses(periodo);
        const result = await pedidosService.getReportes(meses);
        if (result.success && result.data) {
          setDatos(result.data);
        } else {
          setError(result.error || 'Error al cargar reportes');
        }
      } catch {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [periodo]);

  const periodoLabel = periodo === 'año' ? 'este año' : `últimos ${periodo} meses`;

  return (
    <Container className="py-4">

      {/* Encabezado */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h4 className="mb-0 fw-bold">
            <i className="bi bi-bar-chart-line me-2 text-success" />
            Reportes y Estadísticas
          </h4>
          <small className="text-muted">Mostrando datos de los {periodoLabel}</small>
        </div>
        <ButtonGroup size="sm">
          <Button
            variant={periodo === 6 ? 'success' : 'outline-secondary'}
            onClick={() => setPeriodo(6)}
          >
            6 meses
          </Button>
          <Button
            variant={periodo === 12 ? 'success' : 'outline-secondary'}
            onClick={() => setPeriodo(12)}
          >
            12 meses
          </Button>
          <Button
            variant={periodo === 'año' ? 'success' : 'outline-secondary'}
            onClick={() => setPeriodo('año')}
          >
            Este año
          </Button>
        </ButtonGroup>
      </div>

      {/* Estado de carga y error */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-3 text-muted">Cargando reportes...</p>
        </div>
      )}

      {error && !loading && (
        <Alert variant="danger">
          <Alert.Heading>Error al cargar reportes</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {/* Contenido principal */}
      {datos && !loading && (
        <>
          {/* Cards de resumen */}
          <Row className="g-3 mb-4">
            <Col xs={6} md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="text-center">
                  <div className="text-primary fs-4 mb-1">💰</div>
                  <div className="fw-bold fs-5">{formatPeso(datos.estadisticas.totalVentas)}</div>
                  <small className="text-muted">Total Vendido</small>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="text-center">
                  <div className="text-success fs-4 mb-1">✅</div>
                  <div className="fw-bold fs-5">{formatPeso(datos.estadisticas.totalCobrado)}</div>
                  <small className="text-muted">Total Cobrado</small>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="text-center">
                  <div className="text-danger fs-4 mb-1">⏳</div>
                  <div className="fw-bold fs-5">{formatPeso(datos.estadisticas.totalPendiente)}</div>
                  <small className="text-muted">Pendiente</small>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="text-center">
                  <div className="text-info fs-4 mb-1">📦</div>
                  <div className="fw-bold fs-5">{datos.estadisticas.cantidadTotal}</div>
                  <small className="text-muted">Total Pedidos</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Gráfico de barras mensual (ancho completo) */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 pt-3">
              <h6 className="mb-0 fw-semibold">
                <i className="bi bi-bar-chart me-2 text-primary" />
                Ventas vs Cobrado por Mes
              </h6>
            </Card.Header>
            <Card.Body>
              <GraficoBarrasMensual datos={datos.reporteMensual} />
            </Card.Body>
          </Card>

          {/* Tendencia y Pie lado a lado */}
          <Row className="g-3 mb-4">
            <Col xs={12} md={7}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white border-0 pt-3">
                  <h6 className="mb-0 fw-semibold">
                    <i className="bi bi-graph-up me-2 text-primary" />
                    Tendencia de Ventas
                  </h6>
                </Card.Header>
                <Card.Body>
                  <GraficoLineaTendencia datos={datos.reporteMensual} />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={5}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white border-0 pt-3">
                  <h6 className="mb-0 fw-semibold">
                    <i className="bi bi-pie-chart me-2 text-primary" />
                    Estado de Pedidos
                  </h6>
                  <small className="text-muted">
                    {datos.estadisticas.cantidadPagos} pagos · {datos.estadisticas.cantidadImpagos} impagos
                  </small>
                </Card.Header>
                <Card.Body className="d-flex align-items-center">
                  <GraficoPie
                    cantidadPagos={datos.estadisticas.cantidadPagos}
                    cantidadImpagos={datos.estadisticas.cantidadImpagos}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Top 5 clientes */}
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 pt-3">
              <h6 className="mb-0 fw-semibold">
                <i className="bi bi-trophy me-2 text-warning" />
                Top 5 Clientes — por monto total comprado (histórico)
              </h6>
            </Card.Header>
            <Card.Body className="p-0">
              <TablaTopClientes clientes={datos.topClientes} />
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default EstadisticasPage;

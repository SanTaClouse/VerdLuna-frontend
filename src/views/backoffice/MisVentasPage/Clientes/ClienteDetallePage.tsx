import { useState, useContext, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Button, Form, Alert,
  Badge, Tab, Tabs, Table
} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ClientesContext from '../../../../context/ClientesProvider';
import { pedidosService } from '../../../../services';
import type { Pedido } from '../../../../types';

interface FormData {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  descripcion: string;
}

interface Mensaje {
  tipo: string;
  texto: string;
}

const PRESETS_FECHA = [
  { label: 'Última semana', dias: 7 },
  { label: 'Último mes', dias: 30 },
  { label: 'Últimos 2 meses', dias: 60 },
  { label: 'Últimos 3 meses', dias: 90 },
];

const getDesdePreset = (dias: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.toISOString().split('T')[0];
};

const ClienteDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const clientesContext = useContext(ClientesContext);

  if (!clientesContext) {
    throw new Error('ClienteDetallePage must be used within ClientesProvider');
  }

  const { obtenerClientePorId, actualizarCliente } = clientesContext;

  const cliente = obtenerClientePorId(id || '');

  const [pedidosCliente, setPedidosCliente] = useState<Pedido[]>([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);

  // Filtros locales del historial
  const [estadoFiltro, setEstadoFiltro] = useState('todos');
  const [presetDias, setPresetDias] = useState<number | null>(null);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    descripcion: ''
  });
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<Mensaje>({ tipo: '', texto: '' });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        email: cliente.email || '',
        descripcion: ''
      });
    }
  }, [cliente]);

  useEffect(() => {
    if (!id) return;
    setLoadingPedidos(true);
    pedidosService.getByCliente(id).then((result) => {
      if (result.success && result.data) {
        setPedidosCliente(result.data);
      }
    }).finally(() => setLoadingPedidos(false));
  }, [id]);

  if (!cliente) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning">
          <Alert.Heading>Cliente no encontrado</Alert.Heading>
          <p>El cliente que buscás no existe o fue eliminado.</p>
          <Button variant="primary" onClick={() => navigate('/clientes')}>
            Volver a clientes
          </Button>
        </Alert>
      </Container>
    );
  }

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-';
    return dateString.split('T')[0];
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGuardar = async () => {
    if (!id) return;

    setGuardando(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const resultado = await actualizarCliente(id, formData);

      if (resultado.success) {
        setMensaje({
          tipo: 'success',
          texto: '✅ Cliente actualizado correctamente'
        });
        setModoEdicion(false);
      } else {
        setMensaje({
          tipo: 'danger',
          texto: `❌ Error: ${resultado.error}`
        });
      }
    } catch (error) {
      setMensaje({
        tipo: 'danger',
        texto: '❌ Error al actualizar el cliente'
      });
    } finally {
      setGuardando(false);
    }
  };

  const handleCancelar = () => {
    setFormData({
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      email: cliente.email || '',
      descripcion: ''
    });
    setModoEdicion(false);
    setMensaje({ tipo: '', texto: '' });
  };

  const handleLlamar = () => {
    window.location.href = `tel:${cliente.telefono}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/54${cliente.telefono}`, '_blank');
  };

  // Filtrado local del historial
  const pedidosFiltrados = pedidosCliente
    .filter(p => estadoFiltro === 'todos' || p.estado === estadoFiltro)
    .filter(p => {
      if (!presetDias) return true;
      const desde = getDesdePreset(presetDias);
      return (p.fecha || '').split('T')[0] >= desde;
    })
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  // Estadísticas globales (todos los pedidos del cliente)
  const totalPedidos = pedidosCliente.length;
  const totalFacturado = pedidosCliente.reduce((sum, p) => sum + Number(p.precio || 0), 0);
  const totalCobrado = pedidosCliente.reduce((sum, p) => sum + Number(p.precioAbonado || 0), 0);
  const totalPendiente = totalFacturado - totalCobrado;
  const promedioCompra = totalPedidos > 0 ? totalFacturado / totalPedidos : 0;

  const limpiarFiltrosHistorial = () => {
    setEstadoFiltro('todos');
    setPresetDias(null);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const hoy = new Date().toLocaleDateString('es-AR');

    // Encabezado
    doc.setFontSize(18);
    doc.setTextColor(33, 37, 41);
    doc.text('Historial de Pedidos', 14, 20);

    doc.setFontSize(13);
    doc.setTextColor(13, 110, 253);
    doc.text(cliente.nombre, 14, 29);

    doc.setFontSize(9);
    doc.setTextColor(108, 117, 125);
    doc.text(`Dirección: ${cliente.direccion || '-'}`, 14, 36);
    doc.text(`Teléfono: ${cliente.telefono || '-'}`, 14, 41);
    doc.text(`Generado el: ${hoy}`, 14, 46);

    // Descripción del filtro aplicado
    const filtroDesc: string[] = [];
    if (estadoFiltro !== 'todos') filtroDesc.push(`Estado: ${estadoFiltro}`);
    if (presetDias) {
      const preset = PRESETS_FECHA.find(p => p.dias === presetDias);
      if (preset) filtroDesc.push(`Período: ${preset.label}`);
    }
    if (filtroDesc.length > 0) {
      doc.setFontSize(8);
      doc.setTextColor(220, 53, 69);
      doc.text(`Filtros: ${filtroDesc.join(' · ')}`, 14, 52);
    }

    // Resumen de los pedidos filtrados
    const totalFiltrado = pedidosFiltrados.reduce((s, p) => s + Number(p.precio || 0), 0);
    const cobradoFiltrado = pedidosFiltrados.reduce((s, p) => s + Number(p.precioAbonado || 0), 0);
    const pendienteFiltrado = totalFiltrado - cobradoFiltrado;

    const startResumen = filtroDesc.length > 0 ? 59 : 53;

    doc.setFontSize(9);
    doc.setTextColor(33, 37, 41);
    doc.text(
      `Pedidos: ${pedidosFiltrados.length}   |   Facturado: ${formatMoney(totalFiltrado)}   |   Cobrado: ${formatMoney(cobradoFiltrado)}   |   Pendiente: ${formatMoney(pendienteFiltrado)}`,
      14,
      startResumen
    );

    // Tabla
    autoTable(doc, {
      startY: startResumen + 6,
      head: [['Fecha', 'Descripción', 'Total', 'Abonado', 'Pendiente', 'Estado']],
      body: pedidosFiltrados.map(p => [
        formatDate(p.fecha),
        p.descripcion || '-',
        formatMoney(Number(p.precio || 0)),
        formatMoney(Number(p.precioAbonado || 0)),
        formatMoney(Number(p.precio || 0) - Number(p.precioAbonado || 0)),
        p.estado,
      ]),
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [13, 110, 253], textColor: 255, fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 22 },
        1: { cellWidth: 65 },
        2: { halign: 'right', cellWidth: 28 },
        3: { halign: 'right', cellWidth: 28 },
        4: { halign: 'right', cellWidth: 28 },
        5: { halign: 'center', cellWidth: 18 },
      },
      alternateRowStyles: { fillColor: [248, 249, 250] },
      didDrawCell: (data) => {
        if (data.column.index === 5 && data.section === 'body') {
          const estado = pedidosFiltrados[data.row.index]?.estado;
          if (estado === 'Pago') {
            doc.setTextColor(25, 135, 84);
          } else {
            doc.setTextColor(255, 193, 7);
          }
        }
      },
    });

    const nombreArchivo = `${cliente.nombre.replace(/\s+/g, '_')}_pedidos_${hoy.replace(/\//g, '-')}.pdf`;
    doc.save(nombreArchivo);
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Container className="py-4" style={{ maxWidth: '1100px' }}>

        {/* Header con botón volver */}
        <Button
          variant="outline-secondary"
          onClick={() => navigate('/clientes')}
          className="mb-3"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Volver a clientes
        </Button>

        {mensaje.texto && (
          <Alert
            variant={mensaje.tipo}
            dismissible
            onClose={() => setMensaje({ tipo: '', texto: '' })}
          >
            {mensaje.texto}
          </Alert>
        )}

        {/* Card principal con datos del cliente */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-primary text-white">
            <Row className="align-items-center">
              <Col>
                <h4 className="mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  {cliente.nombre}
                </h4>
              </Col>
              <Col xs="auto">
                <Badge bg="success">Activo</Badge>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body className="p-4">

            {/* Botones de acción rápida */}
            <Row className="mb-4 g-2">
              <Col xs={6} md={3}>
                <Button
                  variant="success"
                  className="w-100"
                  onClick={handleWhatsApp}
                >
                  <i className="bi bi-whatsapp me-1"></i> WhatsApp
                </Button>
              </Col>
              <Col xs={6} md={3}>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={handleLlamar}
                >
                  <i className="bi bi-telephone me-1"></i> Llamar
                </Button>
              </Col>
              <Col xs={12} md={6}>
                {!modoEdicion ? (
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => setModoEdicion(true)}
                  >
                    <i className="bi bi-pencil me-1"></i> Editar información
                  </Button>
                ) : (
                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      className="flex-grow-1"
                      onClick={handleGuardar}
                      disabled={guardando}
                    >
                      {guardando ? 'Guardando...' : 'Guardar'}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={handleCancelar}
                      disabled={guardando}
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              </Col>
            </Row>

            {/* Formulario de datos */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    <i className="bi bi-building text-primary me-2"></i>
                    Nombre
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre || ''}
                    onChange={handleChange}
                    disabled={!modoEdicion}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    <i className="bi bi-geo-alt text-danger me-2"></i>
                    Dirección
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion || ''}
                    onChange={handleChange}
                    disabled={!modoEdicion}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    <i className="bi bi-telephone text-success me-2"></i>
                    Teléfono
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={formData.telefono || ''}
                    onChange={handleChange}
                    disabled={!modoEdicion}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    <i className="bi bi-envelope text-info me-2"></i>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    disabled={!modoEdicion}
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    <i className="bi bi-card-text text-secondary me-2"></i>
                    Descripción / Notas
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={formData.descripcion || ''}
                    onChange={handleChange}
                    disabled={!modoEdicion}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Información de registro */}
            <div className="border-top pt-3 mt-3">
              <Row className="text-muted small">
                <Col xs={6}>
                  <strong>Cliente desde:</strong> {formatDate(cliente.fechaRegistro)}
                </Col>
                <Col xs={6} className="text-end">
                  <strong>Último pedido:</strong> {formatDate(cliente.ultimoPedido)}
                </Col>
              </Row>
            </div>

          </Card.Body>
        </Card>

        {/* Estadísticas globales */}
        <Row className="g-3 mb-4">
          <Col xs={6} md={3}>
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <div className="text-success display-6 fw-bold">
                  {formatMoney(totalFacturado)}
                </div>
                <small className="text-muted">Total Facturado</small>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={3}>
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <div className="text-primary display-6 fw-bold">
                  {totalPedidos}
                </div>
                <small className="text-muted">Pedidos Realizados</small>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={3}>
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <div className="text-warning display-6 fw-bold">
                  {formatMoney(totalPendiente)}
                </div>
                <small className="text-muted">Saldo Pendiente</small>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={3}>
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <div className="text-info display-6 fw-bold">
                  {formatMoney(promedioCompra)}
                </div>
                <small className="text-muted">Promedio por Pedido</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabs: Historial y Gráficos */}
        <Card className="shadow-sm">
          <Tabs defaultActiveKey="historial" className="mb-3">

            {/* Tab: Historial de pedidos */}
            <Tab eventKey="historial" title="📦 Historial de Pedidos">
              <Card.Body>

                {/* Filtros del historial */}
                <div className="p-3 bg-light rounded mb-3">
                  <Row className="align-items-end g-2">
                    <Col xs={12} sm={4}>
                      <Form.Label className="small text-muted mb-1">Estado</Form.Label>
                      <Form.Select
                        size="sm"
                        value={estadoFiltro}
                        onChange={e => setEstadoFiltro(e.target.value)}
                      >
                        <option value="todos">Todos</option>
                        <option value="Pago">Pagos ✅</option>
                        <option value="Impago">Impagos ⚠️</option>
                      </Form.Select>
                    </Col>
                    <Col xs={12} sm={5}>
                      <Form.Label className="small text-muted mb-1">Período</Form.Label>
                      <div className="d-flex flex-wrap gap-1">
                        {PRESETS_FECHA.map(({ label, dias }) => (
                          <Button
                            key={dias}
                            size="sm"
                            variant={presetDias === dias ? 'primary' : 'outline-primary'}
                            onClick={() => setPresetDias(presetDias === dias ? null : dias)}
                          >
                            {label}
                          </Button>
                        ))}
                      </div>
                    </Col>
                    <Col xs={12} sm={3} className="d-flex gap-2 align-items-end">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={limpiarFiltrosHistorial}
                        className="flex-grow-1"
                      >
                        🔄 Limpiar
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={exportarPDF}
                        disabled={loadingPedidos || pedidosFiltrados.length === 0}
                        className="flex-grow-1"
                      >
                        <i className="bi bi-file-earmark-pdf me-1"></i>PDF
                      </Button>
                    </Col>
                  </Row>
                  {pedidosFiltrados.length > 0 && (
                    <div className="mt-2 small text-muted">
                      Mostrando <strong>{pedidosFiltrados.length}</strong> pedido{pedidosFiltrados.length !== 1 ? 's' : ''} —
                      Facturado: <strong>{formatMoney(pedidosFiltrados.reduce((s, p) => s + Number(p.precio || 0), 0))}</strong> —
                      Pendiente: <strong>{formatMoney(pedidosFiltrados.reduce((s, p) => s + Number(p.precio || 0) - Number(p.precioAbonado || 0), 0))}</strong>
                    </div>
                  )}
                </div>

                {loadingPedidos ? (
                  <Alert variant="secondary" className="text-center">
                    Cargando historial...
                  </Alert>
                ) : pedidosFiltrados.length === 0 ? (
                  <Alert variant="info" className="text-center">
                    {pedidosCliente.length === 0
                      ? 'Este cliente aún no tiene pedidos registrados'
                      : 'No hay pedidos para los filtros seleccionados'}
                  </Alert>
                ) : (
                  <div className="table-responsive">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Descripción</th>
                          <th className="text-end">Total</th>
                          <th className="text-end">Abonado</th>
                          <th className="text-center">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidosFiltrados.map((pedido) => (
                          <tr key={pedido.id}>
                            <td className="small">{formatDate(pedido.fecha)}</td>
                            <td className="small">{pedido.descripcion}</td>
                            <td className="text-end fw-bold">
                              {formatMoney(pedido.precio)}
                            </td>
                            <td className="text-end">
                              {formatMoney(pedido.precioAbonado)}
                            </td>
                            <td className="text-center">
                              <Badge bg={pedido.estado === 'Pago' ? 'success' : 'warning'}>
                                {pedido.estado}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Tab>

            {/* Tab: Gráficos y análisis */}
            <Tab eventKey="graficos" title="📊 Análisis y Gráficos">
              <Card.Body>
                <Alert variant="info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Próximamente:</strong> Aquí se podrían mostrar gráficos de evolución de compras,
                  productos más comprados, y análisis de facturación mensual.
                </Alert>

                {/* Placeholder para gráficos futuros */}
                <div className="text-center py-5 bg-light rounded">
                  <i className="bi bi-graph-up-arrow display-1 text-muted"></i>
                  <p className="text-muted mt-3">
                    Gráficos en desarrollo
                  </p>
                </div>
              </Card.Body>
            </Tab>

          </Tabs>
        </Card>

      </Container>
    </div>
  );
};

export default ClienteDetallePage;

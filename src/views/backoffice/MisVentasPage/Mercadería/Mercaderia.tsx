import { useState, useEffect, useCallback } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import mercaderiaService from '../../../../services/mercaderiaService';
import { StockItem, CategoriaProducto } from '../../../../types';
import SucursalTabs from './components/SucursalTabs';
import CategoriaFiltro from './components/CategoriaFiltro';
import ProductoCard from './components/ProductoCard';
import HistorialDrawer from './components/HistorialDrawer';

const SUCURSALES_NOMBRES: Record<number, string> = {
  1: 'Luna 1',
  2: 'Luna 2',
  3: 'Luna 3',
  4: 'Luna 4',
};

const CATEGORIAS_ORDEN: CategoriaProducto[] = [
  'Verduras y Hortalizas',
  'Frutas',
  'Verduras de Hoja y Otros',
  'Varios y Elaborados',
];

const Mercaderia = () => {
  const [sucursalId, setSucursalId] = useState<number>(1);
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaProducto | 'todas'>('todas');
  const [historialVisible, setHistorialVisible] = useState(false);

  const cargarStock = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    const res = await mercaderiaService.getStock(id);
    setLoading(false);
    if (res.success && res.data) {
      setStockData(res.data);
    } else {
      setError(res.error || 'Error al cargar stock');
    }
  }, []);

  useEffect(() => {
    cargarStock(sucursalId);
  }, [sucursalId, cargarStock]);

  const handleSucursalChange = (id: number) => {
    setSucursalId(id);
    setBusqueda('');
    setCategoriaActiva('todas');
    setHistorialVisible(false);
  };

  const handleStockChange = useCallback((productoId: string, newStock: number) => {
    setStockData((prev) =>
      prev.map((item) =>
        item.producto.id === productoId ? { ...item, stock: newStock } : item,
      ),
    );
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF();
    const sucursalNombre = SUCURSALES_NOMBRES[sucursalId] || `Sucursal ${sucursalId}`;
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const hora = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Stock Mercadería - ${sucursalNombre}`, 14, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${fecha}  ${hora}`, 14, 28);

    const body: (string | { content: string; colSpan: number; styles: object })[][] = [];

    CATEGORIAS_ORDEN.forEach((cat) => {
      const items = stockData
        .filter((item) => item.producto.categoria === cat && item.producto.activo)
        .sort((a, b) => a.producto.orden - b.producto.orden || a.producto.nombre.localeCompare(b.producto.nombre));

      if (items.length === 0) return;

      body.push([{ content: cat, colSpan: 3, styles: { fillColor: [220, 252, 231], fontStyle: 'bold', textColor: [22, 101, 52] } }]);

      items.forEach((item) => {
        body.push([item.producto.nombre, String(item.stock), item.producto.unidad === 'kg' ? 'kg' : 'u']);
      });
    });

    autoTable(doc, {
      startY: 34,
      head: [['Producto', 'Stock', 'Unidad']],
      body,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 110 },
        1: { cellWidth: 35, halign: 'center' },
        2: { cellWidth: 35, halign: 'center' },
      },
      alternateRowStyles: { fillColor: [249, 250, 251] },
    });

    const sinStockTotal = stockData.filter((i) => i.producto.activo && i.stock === 0).length;
    const totalActivos = stockData.filter((i) => i.producto.activo).length;
    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Total: ${totalActivos} productos  |  Sin stock: ${sinStockTotal}`, 14, finalY);

    doc.save(`stock-${sucursalNombre.toLowerCase().replace(' ', '-')}-${fecha.replace(/\//g, '-')}.pdf`);
  };

  // Filtrado
  const itemsFiltrados = stockData.filter((item) => {
    const matchBusqueda = item.producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase().trim());
    const matchCategoria =
      categoriaActiva === 'todas' || item.producto.categoria === categoriaActiva;
    return matchBusqueda && matchCategoria;
  });

  const sinStock = stockData.filter((i) => i.stock === 0).length;

  return (
    <div className="container-fluid p-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div className="px-3 pt-3 pb-1 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Mercadería</h5>
        <div className="d-flex gap-2">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={exportarPDF}
            disabled={loading || stockData.length === 0}
            className="d-flex align-items-center gap-1"
          >
            <i className="bi bi-file-earmark-pdf"></i>
            <span className="d-none d-sm-inline">PDF</span>
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setHistorialVisible(true)}
            className="d-flex align-items-center gap-1"
          >
            <span>🕐</span>
            <span className="d-none d-sm-inline">Historial</span>
          </Button>
        </div>
      </div>

      {/* Tabs de sucursal */}
      <div className="px-3 pb-1">
        <SucursalTabs sucursalActiva={sucursalId} onChange={handleSucursalChange} />
      </div>

      {/* Alerta sin stock */}
      {sinStock > 0 && !loading && (
        <div className="px-3 pb-1">
          <Alert variant="danger" className="py-1 px-2 mb-0 small">
            {sinStock} {sinStock === 1 ? 'producto sin stock' : 'productos sin stock'}
          </Alert>
        </div>
      )}

      {/* Búsqueda + filtro categoría */}
      <div className="px-3 pb-2">
        <CategoriaFiltro
          busqueda={busqueda}
          categoriaActiva={categoriaActiva}
          onBusquedaChange={setBusqueda}
          onCategoriaChange={setCategoriaActiva}
        />
      </div>

      {/* Contenido principal */}
      <div className="px-3 pb-4">
        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" size="sm" className="me-2" />
            <small>Cargando stock...</small>
          </div>
        )}

        {error && !loading && (
          <Alert variant="danger" className="small py-2">
            {error}
            <Button
              variant="link"
              size="sm"
              className="ms-2 p-0"
              onClick={() => cargarStock(sucursalId)}
            >
              Reintentar
            </Button>
          </Alert>
        )}

        {!loading && !error && itemsFiltrados.length === 0 && busqueda.trim() !== '' && (
          <p className="text-muted small text-center py-4">
            Sin resultados para "{busqueda}"
          </p>
        )}

        {!loading && !error && (
          <div
            className="d-grid gap-2"
            style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
          >
            {itemsFiltrados.map((item) => (
              <ProductoCard
                key={item.producto.id}
                producto={item.producto}
                stock={item.stock}
                sucursalId={sucursalId}
                onStockChange={handleStockChange}
              />
            ))}
          </div>
        )}
      </div>

      {/* Drawer historial */}
      <HistorialDrawer
        sucursalId={sucursalId}
        show={historialVisible}
        onClose={() => setHistorialVisible(false)}
      />
    </div>
  );
};

export default Mercaderia;

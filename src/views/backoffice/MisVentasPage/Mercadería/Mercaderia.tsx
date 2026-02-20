import { useState, useEffect, useCallback } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap';
import mercaderiaService from '../../../../services/mercaderiaService';
import { StockItem, CategoriaProducto } from '../../../../types';
import SucursalTabs from './components/SucursalTabs';
import CategoriaFiltro from './components/CategoriaFiltro';
import ProductoCard from './components/ProductoCard';
import HistorialDrawer from './components/HistorialDrawer';

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

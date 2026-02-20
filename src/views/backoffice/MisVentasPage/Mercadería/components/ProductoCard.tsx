import { useState, useRef, useEffect, useCallback } from 'react';
import mercaderiaService from '../../../../../services/mercaderiaService';
import { Producto } from '../../../../../types';

interface ProductoCardProps {
  producto: Producto;
  stock: number;
  sucursalId: number;
  onStockChange: (productoId: string, newStock: number) => void;
}

const AJUSTES_RAPIDOS = [-1, -0.5, 0.5, 1];

const fmt = (n: number) => (n % 1 !== 0 ? n.toFixed(1) : String(n));

const ProductoCard = ({ producto, stock, sucursalId, onStockChange }: ProductoCardProps) => {
  const [localStock, setLocalStock] = useState(stock);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  // Ref para el valor "pendiente" que se enviará en el debounce
  const pendingStockRef = useRef<number>(stock);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sincronizar cuando cambia la sucursal (stock prop cambia)
  useEffect(() => {
    setLocalStock(stock);
    pendingStockRef.current = stock;
  }, [stock]);

  const callApi = useCallback(
    async (valor: number) => {
      setSaving(true);
      const res = await mercaderiaService.ajustarStock(sucursalId, producto.id, {
        cantidad: valor,
        tipo: 'set',
      });
      setSaving(false);
      if (res.success && res.data !== undefined) {
        const confirmed = res.data.stock;
        setLocalStock(confirmed);
        pendingStockRef.current = confirmed;
        onStockChange(producto.id, confirmed);
      }
    },
    [sucursalId, producto.id, onStockChange],
  );

  const handleAjuste = (delta: number) => {
    const newStock = Math.max(0, pendingStockRef.current + delta);
    pendingStockRef.current = newStock;
    setLocalStock(newStock);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      callApi(pendingStockRef.current);
    }, 300);
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditValue(String(localStock));
  };

  const handleEditEnd = () => {
    setIsEditing(false);
    const parsed = parseFloat(editValue.replace(',', '.'));
    if (!isNaN(parsed) && parsed !== localStock) {
      const clamped = Math.max(0, parsed);
      setLocalStock(clamped);
      pendingStockRef.current = clamped;
      callApi(clamped);
    }
  };

  // Borde según stock
  let cardBorderClass = 'border-secondary';
  if (localStock === 0) cardBorderClass = 'border-danger';
  else if (localStock < 1) cardBorderClass = 'border-warning';

  return (
    <div
      className={`card h-100 border-2 ${cardBorderClass}`}
      style={{ minHeight: '130px', borderWidth: '2px' }}
    >
      <div className="card-body p-2 d-flex flex-column justify-content-between gap-1">
        {/* Nombre */}
        <div
          className="fw-semibold text-truncate"
          style={{ fontSize: '0.8rem' }}
          title={producto.nombre}
        >
          {producto.nombre}
        </div>

        {/* Chips de ajuste rápido */}
        <div className="d-flex gap-1 justify-content-center">
          {AJUSTES_RAPIDOS.map((d) => (
            <button
              key={d}
              className="btn btn-outline-secondary py-0 px-1"
              style={{ fontSize: '0.7rem', lineHeight: '1.6', minWidth: '32px' }}
              onClick={() => handleAjuste(d)}
              disabled={saving}
            >
              {d > 0 ? `+${d}` : d}
            </button>
          ))}
        </div>

        {/* Controles grandes: [−] valor [+] */}
        <div className="d-flex align-items-center justify-content-center gap-1">
          <button
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
            style={{ width: '34px', height: '34px', fontSize: '1.1rem', padding: 0 }}
            onClick={() => handleAjuste(-1)}
            disabled={saving}
          >
            −
          </button>

          {isEditing ? (
            <input
              type="number"
              className="form-control form-control-sm text-center"
              style={{ width: '72px' }}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleEditEnd}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditEnd();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              autoFocus
              min={0}
              step={0.5}
            />
          ) : (
            <button
              className="btn btn-light border text-center"
              style={{ width: '72px', height: '34px', fontSize: '0.8rem', padding: '0 2px' }}
              onClick={handleEditStart}
              title="Tap para editar"
            >
              {fmt(localStock)}
              <span className="text-muted ms-1" style={{ fontSize: '0.65rem' }}>
                {producto.unidad}
              </span>
            </button>
          )}

          <button
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
            style={{ width: '34px', height: '34px', fontSize: '1.1rem', padding: 0 }}
            onClick={() => handleAjuste(1)}
            disabled={saving}
          >
            +
          </button>
        </div>

        {/* Indicador guardando */}
        {saving && (
          <div className="text-center" style={{ fontSize: '0.65rem', color: '#888' }}>
            Guardando…
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoCard;

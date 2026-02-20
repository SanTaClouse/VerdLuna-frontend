import { Form, Badge } from 'react-bootstrap';
import { CategoriaProducto } from '../../../../../types';

const CATEGORIAS: Array<{ valor: CategoriaProducto | 'todas'; label: string }> = [
  { valor: 'todas', label: 'Todas' },
  { valor: 'Verduras y Hortalizas', label: 'Verduras' },
  { valor: 'Frutas', label: 'Frutas' },
  { valor: 'Verduras de Hoja y Otros', label: 'Hojas' },
  { valor: 'Varios y Elaborados', label: 'Varios' },
];

interface CategoriaFiltroProps {
  busqueda: string;
  categoriaActiva: CategoriaProducto | 'todas';
  onBusquedaChange: (valor: string) => void;
  onCategoriaChange: (categoria: CategoriaProducto | 'todas') => void;
}

const CategoriaFiltro = ({
  busqueda,
  categoriaActiva,
  onBusquedaChange,
  onCategoriaChange,
}: CategoriaFiltroProps) => {
  return (
    <div className="d-flex flex-column gap-2">
      <Form.Control
        type="search"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        size="sm"
      />
      <div className="d-flex gap-1 flex-wrap">
        {CATEGORIAS.map((cat) => (
          <Badge
            key={cat.valor}
            bg={categoriaActiva === cat.valor ? 'success' : 'secondary'}
            onClick={() => onCategoriaChange(cat.valor as CategoriaProducto | 'todas')}
            style={{ cursor: 'pointer', fontSize: '0.75rem', padding: '6px 10px' }}
          >
            {cat.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoriaFiltro;

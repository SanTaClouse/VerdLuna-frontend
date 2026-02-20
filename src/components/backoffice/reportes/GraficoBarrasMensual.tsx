import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface DatoMensual {
  año: number;
  mes: number;
  totalVentas: number;
  totalCobrado: number;
  cantidadPedidos: number;
}

interface Props {
  datos: DatoMensual[];
}

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const formatPeso = (value: number) => `$${value.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded shadow p-2" style={{ fontSize: 13 }}>
        <p className="fw-bold mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }} className="mb-0">
            {entry.name}: {formatPeso(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const GraficoBarrasMensual = ({ datos }: Props) => {
  const datosFormateados = datos.map(d => ({
    nombre: `${MESES[d.mes - 1]} ${d.año}`,
    'Total Vendido': d.totalVentas,
    'Total Cobrado': d.totalCobrado,
  }));

  if (datos.length === 0) {
    return <p className="text-muted text-center py-4">Sin datos para el período seleccionado.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={datosFormateados} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={formatPeso} tick={{ fontSize: 11 }} width={80} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Total Vendido" fill="#0d6efd" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Total Cobrado" fill="#198754" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoBarrasMensual;

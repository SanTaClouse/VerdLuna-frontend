import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  cantidadPagos: number;
  cantidadImpagos: number;
}

const COLORS = ['#198754', '#fd7e14'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const total = payload[0].payload.total;
    const value = payload[0].value;
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
    return (
      <div className="bg-white border rounded shadow p-2" style={{ fontSize: 13 }}>
        <p className="fw-bold mb-1" style={{ color: payload[0].payload.fill }}>
          {payload[0].name}
        </p>
        <p className="mb-0">{value} pedidos ({pct}%)</p>
      </div>
    );
  }
  return null;
};

const GraficoPie = ({ cantidadPagos, cantidadImpagos }: Props) => {
  const total = cantidadPagos + cantidadImpagos;

  const datos = [
    { name: 'Pagos', value: cantidadPagos, total, fill: COLORS[0] },
    { name: 'Impagos', value: cantidadImpagos, total, fill: COLORS[1] },
  ].filter(d => d.value > 0);

  if (total === 0) {
    return <p className="text-muted text-center py-4">Sin datos disponibles.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={datos}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {datos.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GraficoPie;

import { Nav } from 'react-bootstrap';

interface SucursalTabsProps {
  sucursalActiva: number;
  onChange: (sucursalId: number) => void;
}

const SUCURSALES = [
  { id: 1, label: 'Luna 1' },
  { id: 2, label: 'Luna 2' },
  { id: 3, label: 'Luna 3' },
  { id: 4, label: 'Luna 4' },
];

const SucursalTabs = ({ sucursalActiva, onChange }: SucursalTabsProps) => {
  return (
    <Nav variant="tabs" className="flex-nowrap border-bottom-0">
      {SUCURSALES.map((s) => (
        <Nav.Item key={s.id}>
          <Nav.Link
            active={sucursalActiva === s.id}
            onClick={() => onChange(s.id)}
            className="px-3 py-2 fw-semibold"
            style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            {s.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default SucursalTabs;

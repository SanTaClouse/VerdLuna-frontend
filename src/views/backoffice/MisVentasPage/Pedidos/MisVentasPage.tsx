import Filtros from '../../../../components/backoffice/Filtros';
import PedidoCards from '../../../../components/backoffice/PedidosCards';
import Estadisticas from '../../../../components/backoffice/Estadisticas';

const MisVentasPage = () => {
  return (
    <>
      <Filtros />
      <Estadisticas />
      <PedidoCards />
    </>
  );
};

export default MisVentasPage;

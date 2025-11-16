import { Container, Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import PedidosContext from '../context/createContext';
import pedidosBD from "../helpers/pedidos"

const PedidoCards = () => {
  const { pedidos , setPedidos } = useContext(PedidosContext);
  
  setPedidos(pedidosBD) //Me traigo todos los pedidos de la base de datos y actualizo el estado pedidos
  //Se supone que estos pedidos ya estan ordenados como yo quiero

  const pedidosPorFecha = pedidos.reduce((acc, pedido) => { //Aca creo un array en donde la clave es la fecha y la prop un array con los pedidos de ese dia
    const fecha = pedido.fecha;
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(pedido);
    return acc;
  }, {});

  return (
    <Container className="mb-4">
      {Object.keys(pedidosPorFecha).map((fecha) => (
        <Card key={fecha} className="mb-3">
          <Card.Header>{fecha}</Card.Header>
          <Card.Body>
            {pedidosPorFecha[fecha].map((pedido) => (
              <Card key={pedido.id} className="mb-2"
                style={{ backgroundColor: pedido.estado === 'Pago' ? '#d4edda' : '#f8d7da' }}
              >
                <Card.Body>
                  <Card.Title>{pedido.cliente}</Card.Title>
                  <Card.Text>{pedido.descripcion}</Card.Text>
                  <Card.Text>
                    Precio: ${pedido.precio} <br />
                    Abonado: ${pedido.precioAbonado}
                  </Card.Text>
                  <Button variant="success">Marcar como pago</Button>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default PedidoCards;

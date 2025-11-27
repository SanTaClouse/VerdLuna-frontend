import { Card, Badge } from 'react-bootstrap';

const PedidoCard = ({ pedido, onClick }) => {
    const restante = pedido.precio - pedido.precioAbonado;
    const isPago = pedido.estado === 'Pago';
    const tieneDeuda = restante > 0;

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <Card
            className="mb-2 shadow-sm border-0 pedido-card"
            style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderLeft: `4px solid ${isPago ? '#28a745' : '#dc3545'}`,
                backgroundColor: tieneDeuda ? '#fff5f5' : '#f0fff4'
            }}
            onClick={() => onClick(pedido)}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
            }}
        >
            <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-start">

                    {/* Columna izquierda: Cliente y descripción */}
                    <div className="flex-grow-1 me-3">
                        <div className="d-flex align-items-center mb-1">
                            <h6 className="mb-0 fw-bold text-dark me-2">
                                {pedido.cliente}
                            </h6>
                            <Badge bg={isPago ? 'success' : 'danger'} className="small">
                                {pedido.estado}
                            </Badge>
                        </div>
                        <p className="mb-0 text-muted small text-truncate">
                            {pedido.descripcion}
                        </p>
                    </div>

                    {/* Columna derecha: Precio */}
                    <div className="text-end">
                        <div className={`fw-bold ${tieneDeuda ? 'text-danger' : 'text-success'}`}>
                            {formatMoney(pedido.precio)}
                        </div>
                        {tieneDeuda && (
                            <small className="text-danger">
                                Resta: {formatMoney(restante)}
                            </small>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PedidoCard;
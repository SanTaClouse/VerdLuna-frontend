import { useContext, useState } from 'react';
import { Container, Spinner, Alert, Form, InputGroup } from 'react-bootstrap';
import ClientesContext from '../../context/ClientesProvider';
import ClienteCard from './ClienteCard';
import ClienteModal from './ClienteModal';

const Clientes = () => {
    const { clientesOrdenados, loading, error } = useContext(ClientesContext);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    // Filtrar clientes por búsqueda
    const clientesFiltrados = clientesOrdenados.filter(cliente =>
        cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.direccion.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleClickCliente = (cliente) => {
        setClienteSeleccionado(cliente);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setClienteSeleccionado(null);
    };

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="success" />
                <p className="mt-3">Cargando clientes...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-4">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    return (
        <>
            <Container className="my-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="fw-bold mb-1">👥 Clientes</h4>
                        <small className="text-muted">
                            {clientesOrdenados.length} clientes registrados
                        </small>
                    </div>
                </div>

                {/* Buscador */}
                <InputGroup className="mb-3">
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por nombre o dirección..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    {busqueda && (
                        <InputGroup.Text
                            style={{ cursor: 'pointer' }}
                            onClick={() => setBusqueda('')}
                        >
                            <i className="bi bi-x-lg"></i>
                        </InputGroup.Text>
                    )}
                </InputGroup>

                {/* Lista de clientes */}
                {clientesFiltrados.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        {busqueda
                            ? `No se encontraron clientes con "${busqueda}"`
                            : 'No hay clientes registrados'
                        }
                    </Alert>
                ) : (
                    <div className="clientes-list">
                        {clientesFiltrados.map((cliente) => (
                            <ClienteCard
                                key={cliente.id}
                                cliente={cliente}
                                onClick={handleClickCliente}
                            />
                        ))}
                    </div>
                )}

                {/* Indicador de orden */}
                <div className="text-center mt-3">
                    <small className="text-muted">
                        <i className="bi bi-sort-down"></i> Ordenados por facturación (mayor a menor)
                    </small>
                </div>
            </Container>

            {/* Modal de info rápida */}
            <ClienteModal
                show={showModal}
                onHide={handleCloseModal}
                cliente={clienteSeleccionado}
            />
        </>
    );
};

export default Clientes;
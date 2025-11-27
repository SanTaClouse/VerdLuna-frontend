

const Clientes = () => {

    // Cargar clientes desde la DB
    const clientes = 0

    // Si no se encontraron clientes mostrar
    if (clientes === 0) {
        return (
            <Container className="my-4">
                <Alert variant="info">
                    No se encontraron clientes
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mb-4">
            {fechasOrdenadas.map((fecha) => (
                <Card key={fecha} className="mb-3 shadow-sm">
                    <h2>Cliente</h2>
                </Card>
            ))}
        </Container>
    );
};

export default Clientes;
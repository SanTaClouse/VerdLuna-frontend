import { useState } from 'react';
import { Container, Button, Collapse, Card } from 'react-bootstrap';
import Clientes from '../../../../components/backoffice/Clientes';
import NuevoClienteForm from '../../../../components/backoffice/NuevoClienteForm';

const ClientesPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Container className="py-4" style={{ maxWidth: '900px' }}>

        {/* Botón para mostrar/ocultar formulario */}
        <div className="mb-3">
          <Button
            variant={showForm ? 'outline-secondary' : 'success'}
            onClick={() => setShowForm(!showForm)}
            className="w-100 d-flex align-items-center justify-content-center"
            size="lg"
          >
            <i className={`bi ${showForm ? 'bi-chevron-up' : 'bi-plus-circle-fill'} me-2`}></i>
            {showForm ? 'Ocultar formulario' : 'Agregar nuevo cliente'}
          </Button>
        </div>

        {/* Formulario colapsable */}
        <Collapse in={showForm}>
          <div className="mb-4">
            <NuevoClienteForm onSuccess={() => setShowForm(false)} />
          </div>
        </Collapse>

        {/* Lista de clientes */}
        <Clientes />

      </Container>
    </div>
  );
};

export default ClientesPage;
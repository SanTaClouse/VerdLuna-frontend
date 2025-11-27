import { useState } from 'react';
import { Container, Button, Collapse } from 'react-bootstrap';
import Clientes from '../../components/backoffice/Clientes';
import NuevoClienteForm from '../../components/backoffice/NuevoClienteForm';

const ClientesPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Container fluid className="px-3 px-md-4 pt-3">

        {/* Botón flotante para agregar cliente (mobile) */}
        <div className="d-md-none mb-3">
          <Button
            variant={showForm ? 'outline-secondary' : 'primary'}
            onClick={() => setShowForm(!showForm)}
            className="w-100"
            size="lg"
          >
            <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-circle'} me-2`}></i>
            {showForm ? 'Cerrar formulario' : 'Agregar nuevo cliente'}
          </Button>
        </div>

        {/* Layout Desktop: Dos columnas */}
        <div className="row g-3">

          {/* Columna izquierda: Lista de clientes */}
          <div className="col-12 col-md-7 col-lg-8">
            <Clientes />
          </div>

          {/* Columna derecha: Formulario */}
          <div className="col-12 col-md-5 col-lg-4">

            {/* En mobile: formulario colapsable */}
            <div className="d-md-none">
              <Collapse in={showForm}>
                <div>
                  <NuevoClienteForm />
                </div>
              </Collapse>
            </div>

            {/* En desktop: formulario siempre visible y sticky */}
            <div className="d-none d-md-block sticky-top" style={{ top: '20px' }}>
              <NuevoClienteForm />
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default ClientesPage;
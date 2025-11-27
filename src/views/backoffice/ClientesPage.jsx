import Clientes from "../../components/backoffice/Clientes";
import NuevoClienteForm from "../../components/backoffice/NuevoClienteForm";
g
const ClientesPage = () => {
  return (
    <div className="container-fluid">
      <Clientes />
      <NuevoClienteForm />
    </div>
  );
};

export default ClientesPage;
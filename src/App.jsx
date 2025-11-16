

import HomePage from "./views/HomePage/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";

import { Routes, Route } from 'react-router-dom'; 


import MisVentasPage from "./views/MisVentasPage/MisVentasPage.jsx"
import ErrorPage from "./views/ErrorPage.jsx";
import NuevoPedidoForm from "./views/NuevoPedido/NuevoPedido.jsx";



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/ventas" element={<MisVentasPage />}/>
        <Route path="/nuevopedido" element={<NuevoPedidoForm />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </>
  );
}

export default App;

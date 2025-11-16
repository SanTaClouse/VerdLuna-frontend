import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./reset.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import PedidosProvider from "./context/pedidosProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PedidosProvider>
        <App />
      </PedidosProvider>
    </BrowserRouter>
  </React.StrictMode>
);

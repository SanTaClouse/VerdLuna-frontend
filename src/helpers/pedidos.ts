import { Pedido } from '../types';

// Datos de prueba para desarrollo
// TODO: Reemplazar con fetch al backend

const pedidosMock: Pedido[] = [
  {
    id: 1,
    clienteId: "c1",
    cliente: "Verdulería Don José",
    descripcion: "20 kg papa, 15 kg cebolla, 10 kg zanahoria",
    precio: 15000,
    precioAbonado: 15000,
    estado: "Pago",
    fecha: "2025-11-15",
    timestamp: "2025-11-15T10:30:00Z"
  },
  {
    id: 2,
    clienteId: "c2",
    cliente: "Almacén La Esquina",
    descripcion: "10 kg tomate, 5 kg morrón, 8 kg zapallo",
    precio: 12500,
    precioAbonado: 8000,
    estado: "Impago",
    fecha: "2025-11-15",
    timestamp: "2025-11-15T11:00:00Z"
  },
  {
    id: 3,
    clienteId: "c3",
    cliente: "Supermercado El Sol",
    descripcion: "30 kg papa, 20 kg cebolla, 15 kg batata",
    precio: 25000,
    precioAbonado: 25000,
    estado: "Pago",
    fecha: "2025-11-14",
    timestamp: "2025-11-14T09:15:00Z"
  },
  {
    id: 4,
    clienteId: "c1",
    cliente: "Verdulería Don José",
    descripcion: "12 kg lechuga, 8 kg acelga, 6 kg espinaca",
    precio: 8500,
    precioAbonado: 0,
    estado: "Impago",
    fecha: "2025-11-14",
    timestamp: "2025-11-14T14:20:00Z"
  },
  {
    id: 5,
    clienteId: "c4",
    cliente: "Restaurant El Buen Sabor",
    descripcion: "15 kg tomate, 10 kg cebolla, 8 kg ajo",
    precio: 18000,
    precioAbonado: 18000,
    estado: "Pago",
    fecha: "2025-11-13",
    timestamp: "2025-11-13T16:45:00Z"
  },
  {
    id: 6,
    clienteId: "c2",
    cliente: "Almacén La Esquina",
    descripcion: "20 kg papa, 12 kg cebolla",
    precio: 16000,
    precioAbonado: 10000,
    estado: "Impago",
    fecha: "2025-11-12",
    timestamp: "2025-11-12T10:00:00Z"
  },
  {
    id: 7,
    clienteId: "c5",
    cliente: "Verdulería Central",
    descripcion: "25 kg zanahoria, 20 kg remolacha, 15 kg rabanito",
    precio: 22000,
    precioAbonado: 22000,
    estado: "Pago",
    fecha: "2025-11-11",
    timestamp: "2025-11-11T08:30:00Z"
  },
  {
    id: 8,
    clienteId: "c3",
    cliente: "Supermercado El Sol",
    descripcion: "40 kg papa, 30 kg cebolla, 20 kg batata",
    precio: 35000,
    precioAbonado: 20000,
    estado: "Impago",
    fecha: "2025-11-10",
    timestamp: "2025-11-10T11:20:00Z"
  },
  {
    id: 9,
    clienteId: "c1",
    cliente: "Verdulería Don José",
    descripcion: "18 kg tomate, 10 kg morrón, 8 kg pepino",
    precio: 20000,
    precioAbonado: 20000,
    estado: "Pago",
    fecha: "2025-11-09",
    timestamp: "2025-11-09T13:15:00Z"
  },
  {
    id: 10,
    clienteId: "c4",
    cliente: "Restaurant El Buen Sabor",
    descripcion: "12 kg lechuga, 10 kg rúcula, 8 kg espinaca",
    precio: 14000,
    precioAbonado: 7000,
    estado: "Impago",
    fecha: "2025-11-08",
    timestamp: "2025-11-08T15:45:00Z"
  }
];

export default pedidosMock;

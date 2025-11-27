import { Cliente } from '../types';

// Datos de prueba - Clientes mayoristas

const clientesMock: Cliente[] = [
  {
    id: "c1",
    nombre: "Verdulería Don José",
    direccion: "San Martín 456, Maciel",
    descripcion: "Cliente mayorista desde 2020. Pedidos semanales regulares.",
    telefono: "3434569846",
    email: "donjose@email.com",
    totalFacturado: 285000,
    cantidadPedidos: 47,
    ultimoPedido: "2025-11-15",
    fechaRegistro: "2020-03-15",
    estado: "activo"
  },
  {
    id: "c2",
    nombre: "Almacén La Esquina",
    direccion: "Belgrano 789, Maciel",
    descripcion: "Almacén de barrio. Pedidos quincenales.",
    telefono: "3434569847",
    email: "laesquina@email.com",
    totalFacturado: 198000,
    cantidadPedidos: 32,
    ultimoPedido: "2025-11-14",
    fechaRegistro: "2021-06-10",
    estado: "activo"
  },
  {
    id: "c3",
    nombre: "Supermercado El Sol",
    direccion: "Av. Libertador 1200, Maciel",
    descripcion: "Cadena de supermercados. Pedidos semanales grandes.",
    telefono: "3434569848",
    email: "elsol@email.com",
    totalFacturado: 450000,
    cantidadPedidos: 65,
    ultimoPedido: "2025-11-13",
    fechaRegistro: "2019-11-20",
    estado: "activo"
  },
  {
    id: "c4",
    nombre: "Restaurant El Buen Sabor",
    direccion: "Mitre 567, Maciel",
    descripcion: "Restaurant local. Pedidos regulares de verduras frescas.",
    telefono: "3434569849",
    email: "buensabor@email.com",
    totalFacturado: 175000,
    cantidadPedidos: 28,
    ultimoPedido: "2025-11-12",
    fechaRegistro: "2021-02-05",
    estado: "activo"
  },
  {
    id: "c5",
    nombre: "Verdulería Central",
    direccion: "25 de Mayo 890, Maciel",
    descripcion: "Verdulería céntrica. Pedidos mensuales.",
    telefono: "3434569850",
    email: "central@email.com",
    totalFacturado: 135000,
    cantidadPedidos: 19,
    ultimoPedido: "2025-11-10",
    fechaRegistro: "2022-08-12",
    estado: "activo"
  },
  {
    id: "c6",
    nombre: "Kiosco y Despensa María",
    direccion: "Sarmiento 234, Maciel",
    descripcion: "Despensa de barrio. Pedidos esporádicos.",
    telefono: "3434569851",
    email: "maria@email.com",
    totalFacturado: 45000,
    cantidadPedidos: 8,
    ultimoPedido: "2025-10-28",
    fechaRegistro: "2023-01-15",
    estado: "activo"
  }
];

export default clientesMock;

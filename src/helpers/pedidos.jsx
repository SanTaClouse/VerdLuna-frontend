// Datos de prueba para desarrollo
// TODO: Reemplazar con fetch al backend

const pedidosBD = [
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
        cliente: "Rotisería El Rancho",
        descripcion: "15 kg papa, 10 kg batata, 8 kg calabaza",
        precio: 11000,
        precioAbonado: 5000,
        estado: "Impago",
        fecha: "2025-11-13",
        timestamp: "2025-11-13T16:45:00Z"
    },
    {
        id: 6,
        clienteId: "c2",
        cliente: "Almacén La Esquina",
        descripcion: "20 kg banana, 15 kg manzana, 10 kg naranja",
        precio: 18000,
        precioAbonado: 18000,
        estado: "Pago",
        fecha: "2025-11-13",
        timestamp: "2025-11-13T10:00:00Z"
    },
    {
        id: 7,
        clienteId: "c5",
        cliente: "Comedor Municipal",
        descripcion: "40 kg papa, 30 kg cebolla, 25 kg zanahoria, 20 kg zapallo",
        precio: 35000,
        precioAbonado: 20000,
        estado: "Impago",
        fecha: "2025-11-12",
        timestamp: "2025-11-12T08:30:00Z"
    }
];

export default pedidosBD;
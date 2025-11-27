// ========== TIPOS DE USUARIO Y AUTENTICACIÓN ==========

export interface User {
  id: string | number;
  usuario: string;
  nombre?: string;
  email?: string;
  rol?: string;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  message?: string;
}

export interface VerifyTokenResult {
  valid: boolean;
  user?: User;
}

// ========== TIPOS DE PEDIDOS ==========

export type EstadoPedido = 'Pago' | 'Impago';

export interface Pedido {
  id: number | string;
  clienteId: string;
  cliente: string;
  descripcion: string;
  precio: number;
  precioAbonado: number;
  estado: EstadoPedido;
  fecha: string;
  timestamp: string;
}

export interface FiltrosPedidos {
  cliente: string;
  estado: string;
  fechaDesde: string;
  fechaHasta: string;
}

export interface EstadisticasPedidos {
  totalVentas: number;
  totalCobrado: number;
  totalPendiente: number;
  cantidadPagos: number;
  cantidadImpagos: number;
  cantidadTotal: number;
}

export interface ClienteUnico {
  id: string;
  nombre: string;
}

export interface PedidoData {
  clienteId: string;
  cliente: string;
  descripcion: string;
  precio: number;
  precioAbonado?: number;
  estado?: EstadoPedido;
  fecha: string;
}

// ========== TIPOS DE CLIENTES ==========

export type EstadoCliente = 'activo' | 'inactivo';

export interface Cliente {
  id: string;
  nombre: string;
  direccion: string;
  descripcion?: string;
  telefono: string;
  email: string;
  totalFacturado: number;
  cantidadPedidos: number;
  ultimoPedido: string | null;
  fechaRegistro: string;
  estado: EstadoCliente;
}

export interface ClienteData {
  nombre: string;
  direccion: string;
  descripcion?: string;
  telefono: string;
  email: string;
}

export interface EstadisticasClientes {
  totalClientes: number;
  facturacionTotal: number;
  promedioFacturacion: number;
  clienteTop: Cliente | null;
}

// ========== TIPOS DE RESPUESTAS DE API ==========

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PedidoResponse extends ApiResponse<Pedido> {
  pedido?: Pedido;
}

export interface ClienteResponse extends ApiResponse<Cliente> {
  cliente?: Cliente;
}

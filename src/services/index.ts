// Exportar todos los servicios desde un solo punto
export { default as authService } from './authService';
export { default as clientesService } from './clientesService';
export { default as pedidosService } from './pedidosService';
export { default as contactoService } from './contactoService';

// Exportar configuración y cliente
export { default as apiClient } from '../client/client';
export { default as API_CONFIG, ENDPOINTS } from '../config/config';

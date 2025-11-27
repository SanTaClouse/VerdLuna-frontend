// Exportar todos los servicios desde un solo punto
export { default as authService } from '../services/authService'
export { default as clientesService } from '../services/clientesService';
export { default as pedidosService } from '../services/pedidosService';
export { default as contactoService } from '../services/contactoService';

// Exportar configuración y cliente
export { default as apiClient } from '../client/client'
export { default as API_CONFIG, ENDPOINTS } from '../config/config'
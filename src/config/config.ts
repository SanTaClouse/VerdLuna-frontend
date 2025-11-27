// Configuración central de API
// Cambiar BASE_URL según el entorno

interface ApiConfig {
  BASE_URL: string;
  TIMEOUT: number;
  DEFAULT_HEADERS: {
    'Content-Type': string;
  };
}

const API_CONFIG: ApiConfig = {
  // En desarrollo
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',

  // Timeout para requests
  TIMEOUT: 10000,

  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Endpoints organizados
export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // Clientes
  CLIENTES: {
    BASE: '/clientes',
    BY_ID: (id: string | number) => `/clientes/${id}`,
    PEDIDOS: (id: string | number) => `/clientes/${id}/pedidos`,
  },

  // Pedidos
  PEDIDOS: {
    BASE: '/pedidos',
    BY_ID: (id: string | number) => `/pedidos/${id}`,
    MARCAR_PAGO: (id: string | number) => `/pedidos/${id}/pago`,
    POR_CLIENTE: (clienteId: string) => `/pedidos/cliente/${clienteId}`,
  },

  // Contacto (formularios públicos)
  CONTACTO: {
    GENERAL: '/contacto',
    MAYORISTA: '/contacto/mayorista',
  }
};

export default API_CONFIG;

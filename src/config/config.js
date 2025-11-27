// Configuración central de API
// Cambiar BASE_URL según el entorno

const API_CONFIG = {
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
        BY_ID: (id) => `/clientes/${id}`,
        PEDIDOS: (id) => `/clientes/${id}/pedidos`,
    },

    // Pedidos
    PEDIDOS: {
        BASE: '/pedidos',
        BY_ID: (id) => `/pedidos/${id}`,
        MARCAR_PAGO: (id) => `/pedidos/${id}/pago`,
        POR_CLIENTE: (clienteId) => `/pedidos/cliente/${clienteId}`,
    },

    // Contacto (formularios públicos)
    CONTACTO: {
        GENERAL: '/contacto',
        MAYORISTA: '/contacto/mayorista',
    }
};

export default API_CONFIG;
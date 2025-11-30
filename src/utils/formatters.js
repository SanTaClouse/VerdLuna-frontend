/**
 * Utilidades de formato reutilizables
 */

/**
 * Formatear número como moneda argentina
 * @param {number} amount 
 * @param {boolean} showDecimals 
 * @returns {string}
 */
export const formatMoney = (amount, showDecimals = false) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0
    }).format(amount || 0);
};

/**
 * Formatear fecha en formato argentino
 * @param {string} dateString - Fecha en formato ISO o YYYY-MM-DD
 * @param {object} options - Opciones de formato
 * @returns {string}
 */
export const formatDate = (dateString, options = {}) => {
    if (!dateString) return '-';

    const defaultOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        ...options
    };

    // Agregar T00:00:00 para evitar problemas de zona horaria
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-AR', defaultOptions);
};

/**
 * Formatear fecha con nombre del día
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDateLong = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-AR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

/**
 * Formatear fecha relativa (hace X días)
 * @param {string} dateString 
 * @returns {string}
 */
export const formatRelativeDate = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString + 'T00:00:00');
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
    return `Hace ${Math.floor(diffDays / 365)} años`;
};

/**
 * Formatear número de teléfono argentino
 * @param {string} phone 
 * @returns {string}
 */
export const formatPhone = (phone) => {
    if (!phone) return '-';

    // Limpiar el número
    const cleaned = phone.replace(/\D/g, '');

    // Si tiene 10 dígitos, formatear como (XXX) XXX-XXXX
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
};

/**
 * Truncar texto con ellipsis
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Capitalizar primera letra
 * @param {string} text 
 * @returns {string}
 */
export const capitalize = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Generar link de WhatsApp
 * @param {string} phone - Número sin código de país
 * @param {string} message - Mensaje opcional
 * @returns {string}
 */
export const getWhatsAppLink = (phone, message = '') => {
    const cleanPhone = phone?.replace(/\D/g, '') || '';
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/54${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
};

/**
 * Generar link de llamada
 * @param {string} phone 
 * @returns {string}
 */
export const getPhoneLink = (phone) => {
    const cleanPhone = phone?.replace(/\D/g, '') || '';
    return `tel:+54${cleanPhone}`;
};
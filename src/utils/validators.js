/**
 * Utilidades de validación
 */

/**
 * Validar email
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validar teléfono argentino (10 dígitos)
 * @param {string} phone 
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
    if (!phone) return false;
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
};

/**
 * Validar que no esté vacío
 * @param {string} value 
 * @returns {boolean}
 */
export const isNotEmpty = (value) => {
    return value && value.trim().length > 0;
};

/**
 * Validar longitud mínima
 * @param {string} value 
 * @param {number} minLength 
 * @returns {boolean}
 */
export const hasMinLength = (value, minLength) => {
    return value && value.length >= minLength;
};

/**
 * Validar longitud máxima
 * @param {string} value 
 * @param {number} maxLength 
 * @returns {boolean}
 */
export const hasMaxLength = (value, maxLength) => {
    return !value || value.length <= maxLength;
};

/**
 * Validar que sea un número positivo
 * @param {number|string} value 
 * @returns {boolean}
 */
export const isPositiveNumber = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
};

/**
 * Validar que sea un número mayor o igual a cero
 * @param {number|string} value 
 * @returns {boolean}
 */
export const isNonNegativeNumber = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0;
};

/**
 * Validar fecha (no puede ser futura)
 * @param {string} dateString 
 * @returns {boolean}
 */
export const isValidDate = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return date <= today;
};

/**
 * Validar formulario de cliente
 * @param {object} data 
 * @returns {{isValid: boolean, errors: object}}
 */
export const validateClienteForm = (data) => {
    const errors = {};

    if (!isNotEmpty(data.nombre)) {
        errors.nombre = 'El nombre es requerido';
    } else if (!hasMinLength(data.nombre, 3)) {
        errors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!isNotEmpty(data.direccion)) {
        errors.direccion = 'La dirección es requerida';
    }

    if (!isNotEmpty(data.telefono)) {
        errors.telefono = 'El teléfono es requerido';
    } else if (!isValidPhone(data.telefono)) {
        errors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    if (data.email && !isValidEmail(data.email)) {
        errors.email = 'El email no es válido';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Validar formulario de pedido
 * @param {object} data 
 * @returns {{isValid: boolean, errors: object}}
 */
export const validatePedidoForm = (data) => {
    const errors = {};

    if (!data.clienteId) {
        errors.cliente = 'Debe seleccionar un cliente';
    }

    if (!isNotEmpty(data.descripcion)) {
        errors.descripcion = 'La descripción es requerida';
    } else if (!hasMinLength(data.descripcion, 5)) {
        errors.descripcion = 'La descripción debe tener al menos 5 caracteres';
    }

    if (!isPositiveNumber(data.precio)) {
        errors.precio = 'El precio debe ser mayor a 0';
    }

    if (data.precioAbonado && !isNonNegativeNumber(data.precioAbonado)) {
        errors.precioAbonado = 'El precio abonado no puede ser negativo';
    }

    if (data.precioAbonado && parseFloat(data.precioAbonado) > parseFloat(data.precio)) {
        errors.precioAbonado = 'El abono no puede ser mayor al precio total';
    }

    if (!data.fecha) {
        errors.fecha = 'La fecha es requerida';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Validar formulario de contacto
 * @param {object} data 
 * @returns {{isValid: boolean, errors: object}}
 */
export const validateContactoForm = (data) => {
    const errors = {};

    if (!isNotEmpty(data.nombre)) {
        errors.nombre = 'El nombre es requerido';
    }

    if (!isNotEmpty(data.telefono)) {
        errors.telefono = 'El teléfono es requerido';
    }

    if (data.email && !isValidEmail(data.email)) {
        errors.email = 'El email no es válido';
    }

    if (!isNotEmpty(data.asunto)) {
        errors.asunto = 'El asunto es requerido';
    }

    if (!isNotEmpty(data.mensaje)) {
        errors.mensaje = 'El mensaje es requerido';
    } else if (!hasMinLength(data.mensaje, 10)) {
        errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
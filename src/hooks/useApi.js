import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar peticiones API
 * Maneja loading, error y data de forma consistente
 */
const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Ejecutar una petición API
     * @param {Function} apiCall - Función que retorna promesa
     * @param {object} options - Opciones adicionales
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    const execute = useCallback(async (apiCall, options = {}) => {
        const {
            onSuccess,
            onError,
            showLoading = true,
            resetErrorOnStart = true
        } = options;

        if (showLoading) setLoading(true);
        if (resetErrorOnStart) setError(null);

        try {
            const result = await apiCall();

            if (result.success) {
                if (onSuccess) onSuccess(result.data);
                return result;
            } else {
                const errorMsg = result.error || 'Error desconocido';
                setError(errorMsg);
                if (onError) onError(errorMsg);
                return result;
            }
        } catch (err) {
            const errorMsg = err.message || 'Error de conexión';
            setError(errorMsg);
            if (onError) onError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            if (showLoading) setLoading(false);
        }
    }, []);

    /**
     * Limpiar el error
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        execute,
        clearError,
        setError
    };
};

export default useApi;
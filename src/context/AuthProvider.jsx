import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { authService } from '../services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar autenticación al montar
    useEffect(() => {
        checkAuth();
    }, []);

    // Verificar si hay sesión válida
    const checkAuth = async () => {
        setLoading(true);

        const token = authService.getToken();

        if (token) {
            // Verificar token con el servidor
            const result = await authService.verifyToken();

            if (result.valid) {
                setUser(result.user);
                setIsAuthenticated(true);
            } else {
                // Token inválido, limpiar
                await logout();
            }
        } else {
            // Intentar recuperar usuario del localStorage
            const savedUser = authService.getCurrentUser();
            if (savedUser) {
                setUser(savedUser);
                setIsAuthenticated(true);
            }
        }

        setLoading(false);
    };

    // Login
    const login = useCallback(async (usuario, password) => {
        setLoading(true);

        const result = await authService.login(usuario, password);

        if (result.success) {
            setUser(result.user);
            setIsAuthenticated(true);
        }

        setLoading(false);
        return result;
    }, []);

    // Logout
    const logout = useCallback(async () => {
        setLoading(true);

        await authService.logout();

        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    }, []);

    // Actualizar datos del usuario
    const updateUser = useCallback((userData) => {
        setUser(prev => ({ ...prev, ...userData }));
        localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
    }, [user]);

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export default AuthContext;
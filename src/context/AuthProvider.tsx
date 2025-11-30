import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react';
import { authService } from '../services';
import { User, LoginResult } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (usuario: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
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

      if (result.valid && result.user) {
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
  const login = useCallback(async (usuario: string, password: string): Promise<LoginResult> => {
    setLoading(true);

    const result = await authService.login(usuario, password);

    if (result.success && result.user) {
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
  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const value: AuthContextType = {
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
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;

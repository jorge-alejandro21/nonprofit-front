import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginForm, RegistroForm } from '@types/index';
import { AuthContextType } from '@types/contexts';
import { authService } from '@services/authService';
import { storage } from '@utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const token = storage.getToken();
      const savedUser = storage.getUser();

      if (token && savedUser) {
        try {
          // Verificar que el token sigue siendo válido
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          storage.setUser(currentUser);
        } catch (error) {
          // Token inválido, limpiar storage
          storage.clear();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      storage.setToken(response.token);
      storage.setUser(response.user);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (formData: RegistroForm) => {
    try {
      const response = await authService.register(formData);
      storage.setToken(response.token);
      storage.setUser(response.user);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      storage.clear();
      setUser(null);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) throw new Error('No hay usuario autenticado');
    try {
      const updatedUser = await authService.updateUser(user.id, userData);
      setUser(updatedUser);
      storage.setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


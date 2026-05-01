import type { RegistroForm, User } from './index';

// Contexto de autenticación
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: RegistroForm) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

// Contexto de donaciones
export interface DonacionesContextType {
  donaciones: any[];
  solicitudes: any[];
  loading: boolean;
  error: string | null;
  crearDonacion: (donacion: any) => Promise<void>;
  obtenerDonaciones: () => Promise<void>;
  obtenerSolicitudes: () => Promise<void>;
  asignarDonacion: (donacionId: string, fundacionId: string) => Promise<void>;
}


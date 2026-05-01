// Constantes de la aplicación

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registro',
  DASHBOARD: '/dashboard',
  DASHBOARD_DONANTE: '/dashboard/donante',
  DASHBOARD_FUNDACION: '/dashboard/fundacion',
  DASHBOARD_VOLUNTARIADO: '/dashboard/voluntariado',
  DASHBOARD_ADMIN: '/dashboard/admin',
  DONACIONES: '/donaciones',
  CREAR_DONACION: '/donaciones/crear',
  SOLICITUDES: '/solicitudes',
  CREAR_SOLICITUD: '/solicitudes/crear',
  INVENTARIO: '/inventario',
  MENSAJES: '/mensajes',
  NOTIFICACIONES: '/notificaciones',
  REPORTES: '/reportes',
  PERFIL: '/perfil',
  ADMIN: '/admin',
} as const;

export const TIPOS_ARTICULOS = [
  { value: 'ropa', label: 'Ropa' },
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'utensilios', label: 'Utensilios' },
  { value: 'medicamentos', label: 'Medicamentos' },
  { value: 'juguetes', label: 'Juguetes' },
  { value: 'muebles', label: 'Muebles' },
  { value: 'tecnologia', label: 'Tecnología' },
  { value: 'libros', label: 'Libros' },
  { value: 'otros', label: 'Otros' },
] as const;

export const ESTADOS_DONACION = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'asignada', label: 'Asignada' },
  { value: 'en_camino', label: 'En Camino' },
  { value: 'entregada', label: 'Entregada' },
  { value: 'cancelada', label: 'Cancelada' },
] as const;

export const PRIORIDADES_SOLICITUD = [
  { value: 'baja', label: 'Baja', color: 'gray' },
  { value: 'media', label: 'Media', color: 'yellow' },
  { value: 'alta', label: 'Alta', color: 'orange' },
  { value: 'urgente', label: 'Urgente', color: 'red' },
] as const;

export const ESTADOS_ARTICULO = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'usado', label: 'Usado' },
  { value: 'reparado', label: 'Reparado' },
] as const;


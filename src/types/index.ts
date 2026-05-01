// Tipos de roles de usuario
export type UserRole = 'donante' | 'fundacion' | 'voluntariado' | 'super_administrador';

// Tipo de usuario base
export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: UserRole;
  telefono?: string;
  direccion?: string;
  activo: boolean;
  fechaCreacion: Date;
}

// Tipo específico para donante
export interface Donante extends User {
  rol: 'donante';
  tipoDonante: 'persona' | 'empresa';
  nit?: string; // Solo para empresas
  razonSocial?: string; // Solo para empresas
}

// Tipo específico para fundación
export interface Fundacion extends User {
  rol: 'fundacion';
  nit: string;
  razonSocial: string;
  descripcion?: string;
  validada: boolean; // Si ha sido validada por el administrador
}

// Tipo específico para voluntariado
export interface Voluntariado extends User {
  rol: 'voluntariado';
  habilidades?: string[];
  disponibilidad?: string;
  experiencia?: string;
}

// Tipo específico para super administrador
export interface SuperAdministrador extends User {
  rol: 'super_administrador';
  permisos: string[];
}

// Tipo de artículo de donación
export type TipoArticulo = 
  | 'ropa'
  | 'alimentos'
  | 'utensilios'
  | 'medicamentos'
  | 'juguetes'
  | 'muebles'
  | 'tecnologia'
  | 'libros'
  | 'otros';

// Estado de la donación
export type EstadoDonacion = 
  | 'disponible'
  | 'asignada'
  | 'en_camino'
  | 'entregada'
  | 'cancelada';

// Donación en especie
export interface Donacion {
  id: string;
  donanteId: string;
  tipoArticulo: TipoArticulo;
  descripcion: string;
  cantidad: number;
  estado: EstadoDonacion;
  estadoArticulo: 'nuevo' | 'usado' | 'reparado';
  fechaDisponible: Date;
  fechaLimite?: Date;
  ubicacionRecoleccion: string;
  fundacionAsignadaId?: string;
  fechaAsignacion?: Date;
  fechaEntrega?: Date;
  fechaCreacion: Date;
  imagenes?: string[];
}

// Solicitud de donación por parte de fundación
export interface SolicitudDonacion {
  id: string;
  fundacionId: string;
  tipoArticulo: TipoArticulo;
  descripcion: string;
  cantidadNecesaria: number;
  cantidadRecibida: number;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  estado: 'pendiente' | 'parcialmente_cubierta' | 'completada' | 'cancelada';
  fechaCreacion: Date;
  fechaLimite?: Date;
  donacionAsignadaId?: string;
}

// Emparejamiento entre donación y solicitud
export interface Emparejamiento {
  id: string;
  donacionId: string;
  solicitudId?: string;
  fundacionId: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado' | 'completado';
  fechaCreacion: Date;
  fechaAceptacion?: Date;
}

// Seguimiento logístico
export interface SeguimientoLogistico {
  id: string;
  donacionId: string;
  estado: 'pendiente' | 'en_camino' | 'entregado' | 'cancelado';
  transportista?: string;
  fechaRecoleccion?: Date;
  fechaEntrega?: Date;
  ubicacionActual?: string;
  notas?: string;
}

// Inventario de fundación
export interface InventarioItem {
  id: string;
  fundacionId: string;
  donacionId: string;
  tipoArticulo: TipoArticulo;
  descripcion: string;
  cantidad: number;
  fechaEntrada: Date;
  fechaSalida?: Date;
  estado: 'disponible' | 'asignado' | 'entregado';
}

// Mensaje de comunicación
export interface Mensaje {
  id: string;
  remitenteId: string;
  destinatarioId: string;
  donacionId?: string;
  asunto: string;
  contenido: string;
  leido: boolean;
  fechaCreacion: Date;
}

// Reporte de impacto
export interface ReporteImpacto {
  id: string;
  fundacionId?: string;
  periodo: {
    inicio: Date;
    fin: Date;
  };
  totalDonaciones: number;
  totalArticulos: number;
  personasBeneficiadas: number;
  tiposArticulos: Record<TipoArticulo, number>;
  fechaGeneracion: Date;
}

// Respuesta de autenticación
export interface AuthResponse {
  user: User;
  token: string;
}

// Formulario de registro
export interface RegistroForm {
  email: string;
  password: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  rol: UserRole;
  // Campos específicos para donante
  tipoDonante?: 'persona' | 'empresa';
  nit?: string;
  razonSocial?: string;
  // Campos específicos para fundación
  descripcion?: string;
}

// Formulario de login
export interface LoginForm {
  email: string;
  password: string;
}

// Tipo de notificación
export type TipoNotificacion =
  | 'donacion_creada'
  | 'donacion_asignada'
  | 'donacion_en_camino'
  | 'donacion_entregada'
  | 'donacion_cancelada'
  | 'solicitud_creada'
  | 'solicitud_completada'
  | 'mensaje_nuevo'
  | 'fundacion_validada'
  | 'fundacion_rechazada'
  | 'donacion_monetaria_completada'
  | 'donacion_monetaria_rechazada'
  | 'voluntario_asignado'
  | 'inventario_actualizado';

// Notificación
export interface Notificacion {
  id: string;
  usuarioId: string;
  tipo: TipoNotificacion;
  titulo: string;
  contenido: string;
  leida: boolean;
  fechaCreacion: Date;
  fechaLectura?: Date;
  metadata?: {
    donacionId?: string;
    solicitudId?: string;
    mensajeId?: string;
    donacionMonetariaId?: string;
    fundacionId?: string;
    [key: string]: any;
  };
}

// Respuesta de notificaciones con paginación
export interface NotificacionesResponse {
  notificaciones: Notificacion[];
  paginacion: {
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
  };
}


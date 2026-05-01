# Sistema de Donaciones en Especie

Sistema web desarrollado en React para gestionar donaciones en especie entre donantes y fundaciones sin ánimo de lucro en Cali.

## 🎯 Descripción del Proyecto

Este proyecto forma parte de la investigación **"Desarrollo de un canal de distribución sostenible y eficiente de donaciones en especie para fundaciones sin ánimo de lucro"** del Semillero DESAPP de la Unicatólica.

## 🚀 Tecnologías Utilizadas

- **React 18.2** - Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript** - Superset de JavaScript con tipado estático
- **Vite** - Herramienta de construcción rápida
- **React Router** - Enrutamiento para aplicaciones React
- **Axios** - Cliente HTTP para peticiones al backend
- **Context API** - Gestión de estado global

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes (Button, Input, Card, etc.)
│   └── Layout/         # Componentes de layout (Header, Footer, Layout)
├── contexts/           # Contextos de React (AuthContext, etc.)
├── hooks/             # Custom hooks
├── pages/             # Páginas de la aplicación
├── services/          # Servicios para comunicación con API
├── types/             # Definiciones de tipos TypeScript
└── utils/             # Utilidades y constantes
```

## 🛠️ Instalación

1. Navegar a la carpeta del proyecto:
```bash
cd FRONT
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto (dentro de FRONT):
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

5. Construir para producción:
```bash
npm run build
```

## 📋 Funcionalidades Principales

### Módulos Implementados

- ✅ **Autenticación**: Login y registro de usuarios (donantes y fundaciones)
- ✅ **Dashboard**: Panel principal según el rol del usuario
- ✅ **Donaciones**: Visualización y gestión de donaciones
- 🔄 **Solicitudes**: (En desarrollo)
- 🔄 **Inventario**: (En desarrollo)
- 🔄 **Mensajería**: (En desarrollo)
- 🔄 **Reportes**: (En desarrollo)

### Roles de Usuario

- **Donante**: Puede crear y gestionar donaciones
- **Fundación**: Puede ver donaciones disponibles, crear solicitudes y gestionar inventario
- **Administrador**: (En desarrollo) Gestión completa del sistema

## 🎨 Características de Diseño

- Diseño responsive
- Separación de responsabilidades por carpetas
- Componentes reutilizables
- Tipado fuerte con TypeScript
- Manejo de estado con Context API

## 📝 Próximos Pasos

- [ ] Implementar módulo de solicitudes
- [ ] Implementar módulo de inventario
- [ ] Implementar sistema de mensajería
- [ ] Implementar reportes de impacto
- [ ] Implementar seguimiento logístico
- [ ] Agregar tests unitarios
- [ ] Mejorar estilos con CSS Modules o Styled Components

## 👥 Autores

- Jorge Millán
- Karla Cerón
- Santiago Rojas
- Sebastián Torres

**Tutor**: Nelson Andrade

## 📄 Licencia

Este proyecto es parte de una investigación académica de la Unicatólica.


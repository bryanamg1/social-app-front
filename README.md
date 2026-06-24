# 🌐 Social App - Frontend

Frontend de una red social desarrollada con React y Vite. Esta aplicación consume una API REST propia, gestiona autenticación con JWT, renderiza el feed social, perfiles, follows y conversaciones en tiempo real, y mantiene una arquitectura modular orientada a escalabilidad y reutilización.

---

## 📌 Descripción del proyecto

El frontend de Social App está construido como una SPA enfocada en experiencia tipo red social. La aplicación permite autenticación de usuarios, navegación protegida, creación e interacción con publicaciones, perfiles públicos/privados, seguimiento entre usuarios, búsqueda y un módulo de mensajes conectado a Socket.io.

Está preparado para trabajar con despliegue frontend en Vercel y consumo de backend remoto mediante variables de entorno.

---

## 🚀 Tecnologías utilizadas

- React 19
- Vite
- JavaScript (ES Modules)
- React Router DOM
- Context API
- Hooks personalizados
- Axios
- Material UI
- CSS Modules
- Socket.io Client
- ESLint

---

## ✅ Funcionalidades implementadas

- Registro e inicio de sesión
- Persistencia local de token y sesión
- Rutas públicas y protegidas
- Feed principal
- Creación y eliminación de publicaciones
- Comentarios por publicación
- Reacciones en publicaciones
- Perfil propio editable
- Perfil público por usuario
- Follow / unfollow
- Búsqueda real de usuarios
- Navegación a perfiles desde el feed
- Módulo de mensajes y conversaciones
- Realtime con Socket.io para mensajes
- Layout responsive para desktop, tablet y mobile

---

## 🧱 Arquitectura del proyecto

La aplicación está organizada por features dentro de `src/components`, separando UI, hooks, servicios, adapters y estilos.

```bash
src/
├── components/
│   ├── auth/
│   ├── feed/
│   ├── layout/
│   ├── messages/
│   ├── ui/
│   └── users/
├── constants/
├── context/
├── routes/
└── services/
```

---

## 🧩 Arquitectura aplicada

- Organización por features
- Separación estricta entre presentación, lógica y acceso a datos
- Textos, rutas y configuración centralizados en `src/constants`
- Servicios HTTP encapsulados con Axios
- Hooks personalizados para lógica de negocio y estados async
- Context API para autenticación global
- Adapters para normalizar datos del backend

---

## 🎨 UX/UI implementada

- Interfaz social de tres columnas en desktop
- Navegación protegida con layout persistente
- Material UI para formularios, feedback y acciones
- CSS Modules para estilos encapsulados
- Estados de loading, error y vacío en módulos principales
- Navegación inferior adaptada para mobile

---

## 📱 Responsive Design

El frontend incluye ajustes responsive para:

- desktop con sidebar izquierda y derecha
- tablet con compactación/ocultamiento de sidebar secundaria
- mobile con navegación inferior y layout en una columna

Se ajustaron feed, auth, perfil, búsqueda y mensajes para evitar overflow horizontal y mejorar usabilidad táctil.

---

## 🔄 Flujo principal de la aplicación

1. El usuario se registra o inicia sesión.
2. El token se guarda localmente y se habilitan rutas protegidas.
3. Se accede al feed, perfiles, buscador y mensajes.
4. Las acciones de posts, follows y conversaciones consumen la API backend.
5. El módulo de mensajes combina REST para carga inicial y Socket.io para realtime.

---

## ⚙️ Instalación

```bash
npm install
```

---

## ▶️ Ejecutar proyecto

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Preview local:

```bash
npm run preview
```

---

## 🔐 Variables de entorno

Documentadas según el código real del proyecto:

```bash
VITE_API_URL=
VITE_SOCKET_URL=
```

---

## 📜 Scripts disponibles

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## ☁️ Deploy

- Preparado para despliegue en **Vercel**
- Incluye `vercel.json` para resolver rutas SPA
- Puede consumir backend remoto mediante `VITE_API_URL` y `VITE_SOCKET_URL`

---

## 🔗 Backend relacionado

Este frontend consume la API del repositorio backend del proyecto Social App, incluyendo:

- autenticación
- feed y publicaciones
- comentarios y reacciones
- follows
- perfiles públicos/privados
- conversaciones y mensajes
- Socket.io para realtime

---

## 👨‍💻 Autor

**Bryan Marquez**  
Full Stack Developer


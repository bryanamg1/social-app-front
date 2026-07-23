export const SHOWCASE_TEXTS = {
    HERO: {
        EYEBROW: "Modo Showcase tecnico",
        TITLE:
            "Social App evoluciona desde un clon social hacia una red abierta para actividad real, colaboracion y visibilidad profesional.",
        DESCRIPTION:
            "Esta vista publica resume el producto, la arquitectura y el criterio tecnico detras del proyecto para recruiters, colaboradores y usuarios que quieran entender rapidamente que problema resuelve.",
        PRIMARY_CTA: "Ir a login",
        SECONDARY_CTA: "Explorar el feed",
        IMAGE_ALT: "Vista general de Social App",
    },

    SECTIONS: {
        PRODUCT: {
            EYEBROW: "Narrativa de producto",
            TITLE: "Una red social pensada para mostrar actividad util",
            DESCRIPTION:
                "El foco no es solo publicar estados. Social App prioriza interaccion, aprendizaje visible, seguimiento entre personas y una base clara para mostrar proyectos, contexto tecnico y colaboracion.",
        },
        CAPABILITIES: {
            EYEBROW: "Estado actual",
            TITLE: "Funcionalidades reales ya operativas",
            DESCRIPTION:
                "Estas capacidades estan implementadas hoy y sostienen la experiencia principal del producto.",
        },
        ARCHITECTURE: {
            EYEBROW: "Arquitectura",
            TITLE: "Frontend modular y backend por capas",
            DESCRIPTION:
                "La app separa UI, hooks, services, adapters y constants en frontend; y routers, controllers, services y middleware en backend.",
        },
        QUALITY: {
            EYEBROW: "Calidad operativa",
            TITLE: "Seguridad, realtime y validacion continua",
            DESCRIPTION:
                "El proyecto ya incorpora autenticacion, proteccion de rutas, controles de error, rate limit y modulos realtime sobre Socket.IO.",
        },
        LINKS: {
            EYEBROW: "Repos y deploys",
            TITLE: "Accesos utiles para evaluacion tecnica",
            DESCRIPTION:
                "Los repositorios publicos y el deploy frontend permiten revisar codigo, arquitectura y comportamiento real del producto.",
        },
        ROADMAP: {
            EYEBROW: "Roadmap",
            TITLE: "Diferenciacion de producto por fases",
            DESCRIPTION:
                "La siguiente evolucion prioriza identidad propia, evidencia tecnica visible y herramientas sociales con valor profesional.",
        },
        LEARNINGS: {
            EYEBROW: "Aprendizajes",
            TITLE: "Que aprendi construyendo Social App",
            DESCRIPTION:
                "Cada fase del proyecto forzo decisiones de contrato, UX y despliegue que hoy sirven como evidencia tecnica concreta.",
        },
    },

    CREDENTIALS: {
        TITLE: "Acceso y demo",
        DESCRIPTION:
            "No se publican credenciales demo en esta vista. El flujo esperado es registro propio o login con Google cuando el entorno este configurado.",
    },
};

export const SHOWCASE_METRICS = [
    {
        label: "Frontend",
        value: "React + Vite",
    },
    {
        label: "Backend",
        value: "Express + MySQL",
    },
    {
        label: "Realtime",
        value: "Socket.IO",
    },
    {
        label: "Deploy",
        value: "Vercel + Railway",
    },
];

export const SHOWCASE_PRODUCT_PILLARS = [
    {
        title: "Actividad visible",
        description:
            "El feed, las reacciones y los comentarios convierten la actividad diaria en una capa observable para usuarios y recruiters.",
        tags: ["feed", "posts", "comentarios", "reacciones"],
    },
    {
        title: "Contexto social real",
        description:
            "Perfiles, follows, sugerencias y busqueda ayudan a descubrir personas y construir una red con contexto util.",
        tags: ["perfiles", "follows", "sugerencias", "busqueda"],
    },
    {
        title: "Conversacion en tiempo real",
        description:
            "Mensajes y notificaciones conectan la experiencia social con interaccion directa y feedback inmediato.",
        tags: ["mensajes", "notificaciones", "socket.io"],
    },
];

export const SHOWCASE_CAPABILITIES = [
    {
        title: "Autenticacion completa",
        description:
            "Registro, login tradicional, Google Sign-In y recuperacion de contrasena con rutas publicas dedicadas.",
    },
    {
        title: "Feed social modular",
        description:
            "Creacion de posts, imagenes, comentarios colapsables, reacciones y paginacion desacoplada por hooks y services.",
    },
    {
        title: "Identidad de usuario",
        description:
            "Perfil propio editable, perfil publico, avatar, bio, ubicacion y navegacion entre autores desde el feed.",
    },
    {
        title: "Grafo social",
        description:
            "Follow, unfollow, sugerencias y feed de seguidos para priorizar contenido relevante en lugar de una lista plana.",
    },
    {
        title: "Mensajeria y notificaciones",
        description:
            "Conversaciones realtime, historial, panel de notificaciones, conteo no leido y emision por namespaces de Socket.IO.",
    },
    {
        title: "Despliegue SPA productivo",
        description:
            "Frontend preparado para Vercel con rutas SPA directas y backend desplegable en Railway con integraciones externas.",
    },
];

export const SHOWCASE_ARCHITECTURE_ITEMS = [
    {
        title: "Frontend por features",
        description:
            "Cada modulo vive en src/components/[feature] con separacion entre pages, components, hooks, services, utils y styles.",
        tags: ["React Router", "MUI", "CSS Modules", "Context API"],
    },
    {
        title: "Backend por capas",
        description:
            "Las rutas definen entrada HTTP, los controllers resuelven request/response y los services concentran la logica de negocio.",
        tags: ["Express", "MySQL", "JWT", "middlewares"],
    },
    {
        title: "Contratos centralizados",
        description:
            "Textos, rutas, endpoints y configuracion reusable viven en constants y adapters para limitar hardcodes y drift de API.",
        tags: ["constants", "adapters", "axios"],
    },
];

export const SHOWCASE_QUALITY_ITEMS = [
    {
        title: "Seguridad aplicada",
        description:
            "JWT, rutas protegidas, ownership checks, rate limit, validaciones de auth y flujo de password recovery con expiracion.",
    },
    {
        title: "Realtime con persistencia",
        description:
            "Socket.IO convive con REST para mensajes y notificaciones sin perder historial ni romper el flujo inicial de carga.",
    },
    {
        title: "Testing y verificaciones",
        description:
            "El backend ya incluye Jest para auth, Google auth, password recovery y utilidades; el frontend se valida con lint y build.",
    },
    {
        title: "Operabilidad",
        description:
            "Observabilidad basica en frontend, manejo de errores y configuracion de deploy para evitar regresiones comunes de SPA.",
    },
];

export const SHOWCASE_LINKS = [
    {
        title: "Repositorio frontend",
        description:
            "Codigo del cliente React, rutas, contextos, hooks de negocio y capas UI de la app.",
        href: "https://github.com/bryanamg1/social-app-front",
        ctaLabel: "Abrir GitHub frontend",
        badge: "GitHub",
    },
    {
        title: "Repositorio backend",
        description:
            "API REST, servicios, sockets, validaciones y SQL manual asociado a fases full stack.",
        href: "https://github.com/DenilsonValero/social-app",
        ctaLabel: "Abrir GitHub backend",
        badge: "GitHub",
    },
    {
        title: "Deploy frontend",
        description:
            "Instancia publica del cliente desplegada en Vercel para revisar la app funcionando.",
        href: "https://social-app-front-ruby.vercel.app",
        ctaLabel: "Abrir deploy frontend",
        badge: "Vercel",
    },
];

export const SHOWCASE_DEPLOY_NOTES = [
    "Backend desplegado en Railway.",
    "El dominio del backend puede variar por entorno y no se expone desde esta vista.",
    "Google Sign-In depende de origins autorizados segun el entorno activo.",
];

export const SHOWCASE_ROADMAP_PHASES = [
    {
        title: "Base de producto social",
        description:
            "Guardar publicaciones, hashtags, publicaciones fijadas y menciones con notificaciones.",
    },
    {
        title: "Identidad del producto",
        description:
            "Tipos de publicacion por intencion, perfiles con proyectos, habilidades demostrables y feed por categorias.",
    },
    {
        title: "Showcase profesional",
        description:
            "Rutas publicas para recruiters, resumen tecnico del sistema, decisiones de arquitectura y roadmap visible.",
    },
    {
        title: "Seguridad y comunidad",
        description:
            "Reportes, bloqueos, privacidad y una base de moderacion para crecimiento controlado.",
    },
    {
        title: "Experiencia avanzada",
        description:
            "Typing indicators, leido/no leido, retos semanales y recomendaciones personalizadas.",
    },
    {
        title: "Calidad profesional",
        description:
            "A11y, performance, lazy loading fino, skeletons, tests ampliados y documentacion de API.",
    },
];

export const SHOWCASE_LEARNINGS = [
    {
        title: "Diseñar con contratos reales",
        description:
            "La mayor parte del trabajo util estuvo en alinear frontend y backend sin inventar respuestas ni acoplar UI a detalles inestables.",
    },
    {
        title: "Pensar el producto antes que la pantalla",
        description:
            "Las features sociales ganan valor cuando responden a una narrativa clara y no a una lista desordenada de widgets.",
    },
    {
        title: "Despliegue y DX importan tanto como la feature",
        description:
            "Rutas SPA, timeouts, rate limit, deploys y monitoreo basico fueron tan importantes como construir las vistas visibles.",
    },
];

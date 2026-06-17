export const STORAGE_KEYS = {
    AUTH_TOKEN: "social_app_auth_token",
    AUTH_USER: "social_app_auth_user",
};

export const AUTH_MESSAGES = {
    TOKEN_NOT_FOUND: "El backend no devolvió un token válido.",
    LOGIN_ERROR: "No se pudo iniciar sesión.",
    REGISTER_ERROR: "No se pudo registrar el usuario.",
    USE_AUTH_OUTSIDE_PROVIDER: "useAuth debe usarse dentro de un AuthProvider.",
};

export const JWT_CONFIG = {
    MILLISECONDS_PER_SECOND: 1000,
};

export const AUTH_TEXTS = {
    LOGIN: {
        TITLE: "Iniciar sesión",
        SUBTITLE: "Entra a tu cuenta para ver el feed y publicar contenido.",
        EMAIL_LABEL: "Email",
        EMAIL_PLACEHOLDER: "tuemail@email.com",
        PASSWORD_LABEL: "Contraseña",
        PASSWORD_PLACEHOLDER: "Tu contraseña",
        SUBMIT_BUTTON: "Ingresar",
        SUBMITTING_BUTTON: "Ingresando...",
        SHOW_PASSWORD_ARIA: "Mostrar u ocultar contraseña",
        FOOTER_TEXT: "¿Todavía no tienes cuenta?",
        REGISTER_LINK: "Crear cuenta",
        HERO_EYEBROW: "SocialApp",
        HERO_TITLE: "Conecta, publica y reacciona en tiempo real.",
        HERO_DESCRIPTION:
        "Una red social moderna con feed, imágenes, comentarios, seguimientos y reacciones.",
    },

    ERRORS: {
        EMAIL_REQUIRED: "El email es obligatorio.",
        PASSWORD_REQUIRED: "La contraseña es obligatoria.",
        LOGIN_FAILED: "No se pudo iniciar sesión. Verifica tus credenciales.",
        TOKEN_NOT_FOUND: "La API no devolvió un token de autenticación.",
    },
};
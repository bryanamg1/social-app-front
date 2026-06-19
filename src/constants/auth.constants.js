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
    BRAND: "SocialApp",

    FIELDS: {
        USER_NAME: "Nombre de usuario",
        EMAIL: "Email",
        PASSWORD: "Contraseña",
        CONFIRM_PASSWORD: "Confirmar contraseña",
    },

    PLACEHOLDERS: {
        USER_NAME: "Ingresa tu nombre de usuario",
        EMAIL: "tuemail@email.com",
        PASSWORD: "Tu contraseña",
        CONFIRM_PASSWORD: "Repite tu contraseña",
    },

    ACCESSIBILITY: {
        SHOW_PASSWORD: "Mostrar contraseña",
        HIDE_PASSWORD: "Ocultar contraseña",
    },

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

    REGISTER: {
        TITLE: "Crear cuenta",
        SUBTITLE: "Regístrate para empezar a publicar y conectar con otros usuarios.",

        USER_NAME_LABEL: "Nombre de usuario",
        USER_NAME_PLACEHOLDER: "Ingresa tu nombre de usuario",

        EMAIL_LABEL: "Email",
        EMAIL_PLACEHOLDER: "tuemail@email.com",

        PASSWORD_LABEL: "Contraseña",
        PASSWORD_PLACEHOLDER: "Crea una contraseña",

        CONFIRM_PASSWORD_LABEL: "Confirmar contraseña",
        CONFIRM_PASSWORD_PLACEHOLDER: "Repite tu contraseña",

        SUBMIT_BUTTON: "Registrarme",
        SUBMITTING_BUTTON: "Creando cuenta...",
        LOADING_BUTTON: "Creando cuenta...",

        SHOW_PASSWORD_ARIA: "Mostrar u ocultar contraseña",

        FOOTER_TEXT: "¿Ya tienes cuenta?",
        HAVE_ACCOUNT: "¿Ya tienes cuenta?",
        LOGIN_LINK: "Iniciar sesión",

        HERO_EYEBROW: "SocialApp",
        HERO_TITLE: "Crea tu perfil y empieza a compartir.",
        HERO_DESCRIPTION:
        "Únete a una red social moderna con publicaciones, imágenes, comentarios, seguimientos y reacciones.",

        SUCCESS_MESSAGE: "Usuario registrado correctamente. Ahora puedes iniciar sesión.",
    },

    ERRORS: {
        USER_NAME_REQUIRED: "El nombre de usuario es obligatorio.",
        EMAIL_REQUIRED: "El email es obligatorio.",
        PASSWORD_REQUIRED: "La contraseña es obligatoria.",
        CONFIRM_PASSWORD_REQUIRED: "Debes confirmar la contraseña.",
        PASSWORD_MIN_LENGTH: "La contraseña debe tener al menos 6 caracteres.",
        PASSWORDS_DO_NOT_MATCH: "Las contraseñas no coinciden.",
        LOGIN_FAILED: "No se pudo iniciar sesión. Verifica tus credenciales.",
        REGISTER_FAILED: "No se pudo crear la cuenta. Intenta nuevamente.",
        TOKEN_NOT_FOUND: "La API no devolvió un token de autenticación.",
    },
};
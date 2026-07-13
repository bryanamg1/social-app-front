export const STORAGE_KEYS = {
    AUTH_TOKEN: "social_app_auth_token",
    AUTH_USER: "social_app_auth_user",
};

export const LEGACY_STORAGE_KEYS = {
    AUTH_TOKEN: "token",
    AUTH_USER: "user",
};

export const AUTH_MESSAGES = {
    TOKEN_NOT_FOUND: "El backend no devolvio un token valido.",
    LOGIN_ERROR: "No se pudo iniciar sesion.",
    GOOGLE_LOGIN_ERROR: "No se pudo iniciar sesion con Google.",
    REGISTER_ERROR: "No se pudo registrar el usuario.",
    USE_AUTH_OUTSIDE_PROVIDER: "useAuth debe usarse dentro de un AuthProvider.",
};

export const JWT_CONFIG = {
    MILLISECONDS_PER_SECOND: 1000,
};

export const GOOGLE_AUTH_CONFIG = {
    SCRIPT_URL: "https://accounts.google.com/gsi/client",
    BUTTON_TEXT: {
        LOGIN: "continue_with",
        REGISTER: "signup_with",
    },
    BUTTON_THEME: "outline",
    BUTTON_SIZE: "large",
    BUTTON_SHAPE: "pill",
    BUTTON_LOGO_ALIGNMENT: "left",
};

export const AUTH_TEXTS = {
    BRAND: "SocialApp",

    FIELDS: {
        USER_NAME: "Nombre de usuario",
        EMAIL: "Email",
        PASSWORD: "Contrasena",
        CONFIRM_PASSWORD: "Confirmar contrasena",
    },

    PLACEHOLDERS: {
        USER_NAME: "Ingresa tu nombre de usuario",
        EMAIL: "tuemail@email.com",
        PASSWORD: "Tu contrasena",
        CONFIRM_PASSWORD: "Repite tu contrasena",
    },

    ACCESSIBILITY: {
        SHOW_PASSWORD: "Mostrar contrasena",
        HIDE_PASSWORD: "Ocultar contrasena",
    },

    LOGIN: {
        TITLE: "Iniciar sesion",
        SUBTITLE: "Entra a tu cuenta para ver el feed y publicar contenido.",
        EMAIL_LABEL: "Email",
        EMAIL_PLACEHOLDER: "tuemail@email.com",
        PASSWORD_LABEL: "Contrasena",
        PASSWORD_PLACEHOLDER: "Tu contrasena",
        SUBMIT_BUTTON: "Ingresar",
        SUBMITTING_BUTTON: "Ingresando...",
        FORGOT_PASSWORD_LINK: "Olvidaste tu contrasena?",
        SHOW_PASSWORD_ARIA: "Mostrar u ocultar contrasena",
        FOOTER_TEXT: "Todavia no tienes cuenta?",
        REGISTER_LINK: "Crear cuenta",
        HERO_EYEBROW: "SocialApp",
        HERO_TITLE: "Conecta, publica y reacciona en tiempo real.",
        HERO_DESCRIPTION:
            "Una red social moderna con feed, imagenes, comentarios, seguimientos y reacciones.",
        GOOGLE_BUTTON: "Continuar con Google",
    },

    REGISTER: {
        TITLE: "Crear cuenta",
        SUBTITLE: "Registrate para empezar a publicar y conectar con otros usuarios.",
        USER_NAME_LABEL: "Nombre de usuario",
        USER_NAME_PLACEHOLDER: "Ingresa tu nombre de usuario",
        EMAIL_LABEL: "Email",
        EMAIL_PLACEHOLDER: "tuemail@email.com",
        PASSWORD_LABEL: "Contrasena",
        PASSWORD_PLACEHOLDER: "Crea una contrasena",
        CONFIRM_PASSWORD_LABEL: "Confirmar contrasena",
        CONFIRM_PASSWORD_PLACEHOLDER: "Repite tu contrasena",
        SUBMIT_BUTTON: "Registrarme",
        SUBMITTING_BUTTON: "Creando cuenta...",
        LOADING_BUTTON: "Creando cuenta...",
        SHOW_PASSWORD_ARIA: "Mostrar u ocultar contrasena",
        FOOTER_TEXT: "Ya tienes cuenta?",
        HAVE_ACCOUNT: "Ya tienes cuenta?",
        LOGIN_LINK: "Iniciar sesion",
        HERO_EYEBROW: "SocialApp",
        HERO_TITLE: "Crea tu perfil y empieza a compartir.",
        HERO_DESCRIPTION:
            "Unete a una red social moderna con publicaciones, imagenes, comentarios, seguimientos y reacciones.",
        SUCCESS_MESSAGE: "Usuario registrado correctamente. Ahora puedes iniciar sesion.",
        GOOGLE_BUTTON: "Registrarse con Google",
    },

    GOOGLE: {
        SEPARATOR: "o",
        LOADING_BUTTON: "Cargando Google...",
        UNAVAILABLE: "Google Sign-In no esta disponible en este momento.",
        CONFIG_MISSING:
            "Configura VITE_GOOGLE_CLIENT_ID para habilitar Google Sign-In en desarrollo.",
    },

    FORGOT_PASSWORD: {
        TITLE: "Recuperar contrasena",
        SUBTITLE:
            "Ingresa tu email y te enviaremos instrucciones para restablecer el acceso.",
        EMAIL_LABEL: "Email",
        EMAIL_PLACEHOLDER: "tuemail@email.com",
        SUBMIT_BUTTON: "Enviar instrucciones",
        SUBMITTING_BUTTON: "Enviando...",
        SUCCESS_MESSAGE:
            "Si el email existe, enviaremos instrucciones para recuperar tu contrasena.",
        LOGIN_LINK: "Volver a iniciar sesion",
        HERO_EYEBROW: "SocialApp",
        HERO_TITLE: "Recupera el acceso a tu cuenta.",
        HERO_DESCRIPTION:
            "Solicita un enlace seguro para crear una nueva contrasena sin salir del flujo actual.",
    },

    RESET_PASSWORD: {
        TITLE: "Restablecer contrasena",
        SUBTITLE: "Define una nueva contrasena para volver a entrar a tu cuenta.",
        PASSWORD_LABEL: "Nueva contrasena",
        PASSWORD_PLACEHOLDER: "Crea una nueva contrasena",
        CONFIRM_PASSWORD_LABEL: "Confirmar contrasena",
        CONFIRM_PASSWORD_PLACEHOLDER: "Repite la nueva contrasena",
        SUBMIT_BUTTON: "Actualizar contrasena",
        SUBMITTING_BUTTON: "Actualizando...",
        SUCCESS_MESSAGE: "Contrasena actualizada correctamente.",
        LOGIN_LINK: "Ir a iniciar sesion",
        HERO_EYEBROW: "SocialApp",
        HERO_TITLE: "Crea una nueva contrasena segura.",
        HERO_DESCRIPTION:
            "Usa el enlace de recuperacion para confirmar el cambio y volver al feed.",
    },

    ERRORS: {
        USER_NAME_REQUIRED: "El nombre de usuario es obligatorio.",
        EMAIL_REQUIRED: "El email es obligatorio.",
        PASSWORD_REQUIRED: "La contrasena es obligatoria.",
        CONFIRM_PASSWORD_REQUIRED: "Debes confirmar la contrasena.",
        PASSWORD_MIN_LENGTH: "La contrasena debe tener al menos 6 caracteres.",
        PASSWORDS_DO_NOT_MATCH: "Las contrasenas no coinciden.",
        LOGIN_FAILED: "No se pudo iniciar sesion. Verifica tus credenciales.",
        GOOGLE_LOGIN_FAILED:
            "No pudimos iniciar sesion con Google. Intentalo nuevamente.",
        FORGOT_PASSWORD_FAILED:
            "No se pudo procesar la solicitud de recuperacion. Intenta nuevamente.",
        FORGOT_PASSWORD_TIMEOUT:
            "El servicio tardo demasiado en responder. Intentalo nuevamente.",
        FORGOT_PASSWORD_UNAVAILABLE:
            "El servicio de recuperacion no esta disponible en este momento.",
        REGISTER_FAILED: "No se pudo crear la cuenta. Intenta nuevamente.",
        GOOGLE_REGISTER_FAILED:
            "No pudimos completar el registro con Google. Intentalo nuevamente.",
        RESET_PASSWORD_FAILED:
            "No se pudo actualizar la contrasena. Intenta nuevamente.",
        RESET_TOKEN_REQUIRED:
            "El enlace de recuperacion no es valido o no incluye token.",
        RESET_TOKEN_INVALID:
            "El enlace de recuperacion no es valido o ya expiro.",
        TOKEN_NOT_FOUND: "La API no devolvio un token de autenticacion.",
    },
};

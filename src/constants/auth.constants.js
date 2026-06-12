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
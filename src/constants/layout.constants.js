import { ROUTES } from "./routes.constants";

export const APP_BRAND = {
    NAME: "Social App",
    LOGO: "S",
    TAGLINE: "Conecta. Comparte. Reacciona.",
};

export const SIDEBAR_NAV_ITEMS = [
    {
        label: "Inicio",
        path: ROUTES.HOME,
        icon: "🏠",
    },
    {
        label: "Perfil",
        path: ROUTES.PROFILE,
        icon: "👤",
    },
];

export const RIGHT_SIDEBAR_TEXTS = {
    SEARCH_TITLE: "Buscar usuarios",
    SEARCH_PLACEHOLDER: "Buscar por email o nombre...",
    SUGGESTIONS_TITLE: "Sugerencias",
    SUGGESTIONS_DESCRIPTION:
        "Más adelante mostraremos usuarios recomendados según tu red.",
};

export const LAYOUT_TEXTS = {
    LOGOUT: "Cerrar sesión",
    ACTIVE_SESSION: "Sesión activa",
    DEFAULT_USER: "Usuario",
};
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
        iconKey: "home",
    },
    {
        label: "Mensajes",
        path: ROUTES.MESSAGES,
        iconKey: "messages",
    },
    {
        label: "Perfil",
        path: ROUTES.PROFILE,
        iconKey: "profile",
    },
];

export const RIGHT_SIDEBAR_TEXTS = {
    SEARCH_TITLE: "Buscar usuarios",
    SEARCH_PLACEHOLDER: "Buscar por email o nombre...",
    SEARCH_RESULTS_TITLE: "Resultados",
    SEARCH_IDLE: "Escribe un nombre, email o bio para buscar usuarios.",
    SEARCH_LOADING: "Buscando usuarios...",
    SEARCH_EMPTY: "No se encontraron usuarios.",
    SEARCH_RESULTS_COUNT: (count) =>
        `${count} ${count === 1 ? "resultado" : "resultados"}`,
    SUGGESTIONS_TITLE: "Sugerencias",
    SUGGESTIONS_DESCRIPTION:
        "Mas adelante mostraremos usuarios recomendados segun tu red.",
    TRENDING_TITLE: "Actividad",
    TRENDING_DESCRIPTION:
        "Aqui mostraremos actividad reciente, nuevos usuarios y publicaciones destacadas.",
};

export const RIGHT_SIDEBAR_SEARCH = {
    DEBOUNCE_MS: 350,
    ERROR_TEXT: "No se pudo buscar usuarios.",
};

export const LAYOUT_TEXTS = {
    LOGOUT: "Cerrar sesion",
    MOBILE_LOGOUT: "Salir",
    ACTIVE_SESSION: "Sesion activa",
    DEFAULT_USER: "Usuario",
};

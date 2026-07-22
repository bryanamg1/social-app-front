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
    SEARCH_INPUT_LABEL: "Buscar usuarios por email, nombre o bio",
    SEARCH_PLACEHOLDER: "Buscar por email o nombre...",
    SEARCH_RESULTS_TITLE: "Resultados",
    SEARCH_RESULTS_ARIA: "Resultados de busqueda de usuarios",
    SEARCH_IDLE: "Escribe un nombre, email o bio para buscar usuarios.",
    SEARCH_LOADING: "Buscando usuarios...",
    SEARCH_EMPTY: "No se encontraron usuarios.",
    SEARCH_RESULTS_COUNT: (count) =>
        `${count} ${count === 1 ? "resultado" : "resultados"}`,
    SUGGESTIONS_TITLE: "Sugerencias",
    SUGGESTIONS_DESCRIPTION:
        "Perfiles sugeridos para ampliar tu red y descubrir mas actividad.",
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
    PRIMARY_NAV_ARIA: "Navegacion principal de la aplicacion",
    RIGHT_SIDEBAR_ARIA: "Panel lateral con busqueda, sugerencias y actividad",
    REFRESH_FEED: "Actualizar feed",
    REFRESHING_FEED: "Actualizando feed...",
};

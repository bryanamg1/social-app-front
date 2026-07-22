export const UI_TEXTS = {
    LOADER: {
        DEFAULT: "Cargando...",
        VERIFYING_SESSION: "Verificando sesion...",
        ROUTE_CHANGE: "Preparando la vista...",
    },

    ERRORS: {
        FEED_REFRESH_PROVIDER:
            "useFeedRefresh debe usarse dentro de FeedRefreshProvider.",
    },

    PAGES: {
        LOGIN_TITLE: "Login",
        REGISTER_TITLE: "Registro",
        PRIVATE_FEED_TITLE: "Feed privado",
        PROFILE_TITLE: "Perfil",
    },

    ERROR_404: {
        TITLE: "404 - Pagina no encontrada",
    },
};

export const UI_FEEDBACK = {
    AUTO_HIDE_MS: 4000,
};

export const OBSERVABILITY_TEXTS = {
    HTTP_SLOW: "HTTP request completed slower than expected.",
    HTTP_FAILED: "HTTP request failed.",
    SOCKET_EVENT: "Socket lifecycle event captured.",
    WEB_VITAL_CAPTURED: "Web vital captured.",
};

export const OBSERVABILITY_CONFIG = {
    STORAGE_KEY: "__SOCIAL_APP_OBSERVABILITY__",
    WEB_VITALS_STORAGE_KEY: "__SOCIAL_APP_WEB_VITALS__",
    MAX_EVENTS: 50,
    MAX_WEB_VITALS: 20,
    SLOW_REQUEST_MS: 2500,
    WEB_VITAL_THRESHOLDS: {
        CLS: {
            GOOD: 0.1,
            NEEDS_IMPROVEMENT: 0.25,
        },
        FCP: {
            GOOD: 1800,
            NEEDS_IMPROVEMENT: 3000,
        },
        INP: {
            GOOD: 200,
            NEEDS_IMPROVEMENT: 500,
        },
        LCP: {
            GOOD: 2500,
            NEEDS_IMPROVEMENT: 4000,
        },
        TTFB: {
            GOOD: 800,
            NEEDS_IMPROVEMENT: 1800,
        },
    },
};

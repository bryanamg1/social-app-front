export const FEED_TEXTS = {
    EYEBROW: "Inicio",
    TITLE: "Feed",
    COMPOSER_PLACEHOLDER: "¿Qué estás pensando?",
    CREATE_POST: "Crear publicación",
    PREVIEW_AUTHOR: "Social App",
    PREVIEW_SUBTITLE: "Vista previa del feed",
    PREVIEW_DESCRIPTION:
        "En la siguiente fase conectaremos esta sección con las publicaciones reales del backend.",

    HEADER: {
        TITLE: "Feed",
        SUBTITLE: "Comparte publicaciones, imágenes y reacciones.",
    },

    COMPOSER: {
        PLACEHOLDER: "¿Qué estás pensando?",
        IMAGE_BUTTON: "Imagen",
        SUBMIT_BUTTON: "Publicar",
        SUBMITTING_BUTTON: "Publicando...",
        HELPER_TEXT: "Puedes publicar texto, imagen o ambos.",
        PREVIEW_ALT: "Vista previa",
        REMOVE_IMAGE_ARIA: "Eliminar imagen",
    },

    POSTS: {
        DEFAULT_AUTHOR: "Usuario",
        IMAGE_ALT: "Publicación",
        LOADING: "Cargando publicaciones...",
        EMPTY_TITLE: "Todavía no hay publicaciones",
        EMPTY_DESCRIPTION: "Sé el primero en compartir algo con la comunidad.",
        DELETE_ARIA: "Eliminar publicación",
        REACT_BUTTON: "Reaccionar",
        COMMENTS_BUTTON: "Comentarios",
        DATE_FALLBACK: "Ahora",
    },

    REACTIONS: {
        LIKE: "LIKE",
        DISLIKE: "DISLIKE",
        LOVE: "LOVE",
        HAHA: "HAHA",
        WOW: "WOW",
        SAD: "SAD",
    },

    ERRORS: {
        LOAD_POSTS: "No se pudieron cargar las publicaciones.",
        CREATE_POST: "No se pudo crear la publicación.",
        DELETE_POST: "No se pudo eliminar la publicación.",
    },
};

export const PREVIEW_REACTIONS = ["👍 LIKE", "❤️ LOVE", "😮 WOW"];

export const FEED_REACTION_OPTIONS = [
    FEED_TEXTS.REACTIONS.LIKE,
    FEED_TEXTS.REACTIONS.LOVE,
    FEED_TEXTS.REACTIONS.WOW,
];
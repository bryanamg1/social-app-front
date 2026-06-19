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
        LOADING_MORE: "Cargando mas publicaciones...",
        EMPTY_TITLE: "Todavía no hay publicaciones",
        EMPTY_DESCRIPTION: "Sé el primero en compartir algo con la comunidad.",
        DELETE_ARIA: "Eliminar publicación",
        REACT_BUTTON: "Reaccionar",
        COMMENTS_BUTTON: "Comentarios",
        LOAD_MORE_BUTTON: "Cargar mas",
        END_OF_RESULTS: "No hay mas publicaciones para mostrar.",
        DATE_FALLBACK: "Ahora",
    },

    COMMENTS: {
        TITLE: "Comentarios",
        SHOW_BUTTON: "Ver comentarios",
        HIDE_BUTTON: "Ocultar comentarios",
        SHOW_ARIA: "Mostrar comentarios del post",
        HIDE_ARIA: "Ocultar comentarios del post",
        LOADING: "Cargando comentarios...",
        EMPTY_TITLE: "Todavia no hay comentarios",
        EMPTY_DESCRIPTION: "Los comentarios aparecerann aqui cuando esten disponibles.",
        INPUT_PLACEHOLDER: "Escribe un comentario...",
        SUBMIT_BUTTON: "Comentar",
        SUBMITTING_BUTTON: "Comentando...",
        EMPTY_VALIDATION: "Escribe un comentario antes de enviarlo.",
        AUTH_REQUIRED: "Inicia sesion para comentar.",
        DEFAULT_AUTHOR: "Usuario",
        COMMENT_SINGULAR: "comentario",
        COMMENT_PLURAL: "comentarios",
        DATE_FALLBACK: "Ahora",
    },

    REACTIONS: {
        LIKE: "LIKE",
        DISLIKE: "DISLIKE",
        LOVE: "LOVE",
        HAHA: "HAHA",
        WOW: "WOW",
        SAD: "SAD",
        TITLE: "Reacciones",
        TOTAL_SUFFIX: "reacciones",
        TOGGLE_ARIA_PREFIX: "Alternar reaccion",
        LOADING: "Cargando reacciones...",
        EMPTY_SUMMARY: "Sin reacciones",
    },

    ERRORS: {
        LOAD_POSTS: "No se pudieron cargar las publicaciones.",
        LOAD_MORE_POSTS: "No se pudieron cargar mas publicaciones.",
        LOAD_COMMENTS: "No se pudieron cargar los comentarios.",
        ADD_COMMENT: "No se pudo publicar el comentario.",
        LOAD_REACTIONS: "No se pudieron cargar las reacciones.",
        TOGGLE_REACTION: "No se pudo actualizar la reaccion.",
        REACTION_AUTH_REQUIRED: "Inicia sesion para reaccionar.",
        CREATE_POST: "No se pudo crear la publicación.",
        DELETE_POST: "No se pudo eliminar la publicación.",
    },
};

export const PREVIEW_REACTIONS = ["👍 LIKE", "❤️ LOVE", "😮 WOW"];

export const FEED_REACTION_OPTIONS = [
    {
        type: FEED_TEXTS.REACTIONS.LIKE,
        label: FEED_TEXTS.REACTIONS.LIKE,
        iconKey: "like",
    },
    {
        type: FEED_TEXTS.REACTIONS.DISLIKE,
        label: FEED_TEXTS.REACTIONS.DISLIKE,
        iconKey: "dislike",
    },
    {
        type: FEED_TEXTS.REACTIONS.LOVE,
        label: FEED_TEXTS.REACTIONS.LOVE,
        iconKey: "love",
    },
    {
        type: FEED_TEXTS.REACTIONS.HAHA,
        label: FEED_TEXTS.REACTIONS.HAHA,
        iconKey: "haha",
    },
    {
        type: FEED_TEXTS.REACTIONS.WOW,
        label: FEED_TEXTS.REACTIONS.WOW,
        iconKey: "wow",
    },
    {
        type: FEED_TEXTS.REACTIONS.SAD,
        label: FEED_TEXTS.REACTIONS.SAD,
        iconKey: "sad",
    },
];

export const FEED_KEYS = {
    POST_PREFIX: "post",
    POST_FALLBACK_PREFIX: "post-fallback",
    COMMENT_PREFIX: "comment",
    COMMENT_FALLBACK_PREFIX: "comment-fallback",
    NO_DATE: "no-date",
};

export const FEED_PAGINATION = {
    INITIAL_PAGE: 1,
    PAGE_SIZE: 10,
};

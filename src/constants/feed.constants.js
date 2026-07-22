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

    FILTERS: {
        TITLE: "Intencion del feed",
        ALL: "Todo",
    },

    COMPOSER: {
        PLACEHOLDER: "¿Qué estás pensando?",
        TYPE_LABEL: "Tipo de publicacion",
        IMAGE_BUTTON: "Imagen",
        SUBMIT_BUTTON: "Publicar",
        SUBMITTING_BUTTON: "Publicando...",
        HELPER_TEXT:
            "Puedes publicar texto, imagen o ambos. Elige una intencion para dar contexto al post.",
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
        FOLLOWING_EMPTY_TITLE: "Tu feed aun no tiene actividad",
        FOLLOWING_EMPTY_DESCRIPTION:
            "Sigue perfiles para ver sus publicaciones aqui junto con las tuyas.",
        DELETE_ARIA: "Eliminar publicación",
        REACT_BUTTON: "Reaccionar",
        COMMENTS_BUTTON: "Comentarios",
        LOAD_MORE_BUTTON: "Cargar mas",
        END_OF_RESULTS: "No hay mas publicaciones para mostrar.",
        DATE_FALLBACK: "Ahora",
        TYPE_BADGE_PREFIX: "Tipo",
    },

    COMMENTS: {
        TITLE: "Comentarios",
        SHOW_BUTTON: "Ver comentarios",
        HIDE_BUTTON: "Ocultar comentarios",
        SHOW_ARIA: "Mostrar comentarios del post",
        HIDE_ARIA: "Ocultar comentarios del post",
        SECTION_ARIA: "Seccion de comentarios",
        LOADING: "Cargando comentarios...",
        EMPTY_TITLE: "Todavia no hay comentarios",
        EMPTY_DESCRIPTION: "Los comentarios aparecerann aqui cuando esten disponibles.",
        INPUT_PLACEHOLDER: "Escribe un comentario...",
        INPUT_ARIA: "Escribe un comentario para esta publicacion",
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
        GROUP_ARIA: "Acciones de reacciones",
        SUMMARY_ARIA: "Resumen de reacciones",
        TOGGLE_ARIA_PREFIX: "Alternar reaccion",
        LOADING: "Cargando reacciones...",
        EMPTY_SUMMARY: "Sin reacciones",
        ACTIVE_SUMMARY_PREFIX: "Tu reaccion actual",
    },

    ERRORS: {
        LOAD_POSTS: "No se pudieron cargar las publicaciones.",
        LOAD_MORE_POSTS: "No se pudieron cargar mas publicaciones.",
        RATE_LIMIT_POSTS:
            "Hay demasiadas solicitudes al feed. Espera unos segundos e intenta de nuevo.",
        LOAD_COMMENTS: "No se pudieron cargar los comentarios.",
        ADD_COMMENT: "No se pudo publicar el comentario.",
        LOAD_REACTIONS: "No se pudieron cargar las reacciones.",
        TOGGLE_REACTION: "No se pudo actualizar la reaccion.",
        REACTION_AUTH_REQUIRED: "Inicia sesion para reaccionar.",
        CREATE_POST: "No se pudo crear la publicación.",
        DELETE_POST: "No se pudo eliminar la publicación.",
        INVALID_POST_TYPE: "El tipo de publicacion no es valido.",
    },
};

export const FEED_POST_TYPES = {
    ALL: "all",
    PERSONAL_UPDATE: "personal_update",
    PROJECT: "project",
    QUESTION: "question",
    LEARNING: "learning",
    HELP: "help",
    COLLABORATION: "collaboration",
    LAUNCH: "launch",
};

export const FEED_POST_TYPE_OPTIONS = [
    {
        value: FEED_POST_TYPES.PERSONAL_UPDATE,
        label: "Actualizacion personal",
        description: "Comparte una novedad personal o profesional.",
    },
    {
        value: FEED_POST_TYPES.PROJECT,
        label: "Proyecto",
        description: "Muestra avance, demo o estado de un proyecto.",
    },
    {
        value: FEED_POST_TYPES.QUESTION,
        label: "Pregunta",
        description: "Pide contexto, respuestas o criterio a la comunidad.",
    },
    {
        value: FEED_POST_TYPES.LEARNING,
        label: "Aprendizaje",
        description: "Documenta algo nuevo que aprendiste construyendo.",
    },
    {
        value: FEED_POST_TYPES.HELP,
        label: "Ayuda",
        description: "Solicita soporte puntual para destrabar un problema.",
    },
    {
        value: FEED_POST_TYPES.COLLABORATION,
        label: "Colaboracion",
        description: "Busca personas para construir algo contigo.",
    },
    {
        value: FEED_POST_TYPES.LAUNCH,
        label: "Lanzamiento",
        description: "Presenta una release, deploy o entrega relevante.",
    },
];

export const FEED_POST_TYPE_FILTER_OPTIONS = [
    {
        value: FEED_POST_TYPES.ALL,
        label: FEED_TEXTS.FILTERS.ALL,
    },
    ...FEED_POST_TYPE_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
    })),
];

export const getFeedPostTypeLabel = (postType) => {
    const normalizedType = `${postType ?? ""}`.trim().toLowerCase();
    const option = FEED_POST_TYPE_OPTIONS.find(
        (item) => item.value === normalizedType
    );

    return option?.label ?? FEED_POST_TYPE_OPTIONS[0].label;
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

export const FEED_MODES = {
    ALL: "all",
    FOLLOWING: "following",
};

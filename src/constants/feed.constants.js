export const FEED_TEXTS = {
    EYEBROW: "Inicio",
    TITLE: "Feed",
    COMPOSER_PLACEHOLDER: "Que estas pensando?",
    CREATE_POST: "Crear publicacion",
    PREVIEW_AUTHOR: "Social App",
    PREVIEW_SUBTITLE: "Vista previa del feed",
    PREVIEW_DESCRIPTION:
        "En la siguiente fase conectaremos esta seccion con las publicaciones reales del backend.",

    HEADER: {
        TITLE: "Feed",
        SUBTITLE: "Comparte publicaciones, imagenes y reacciones.",
    },

    FILTERS: {
        TITLE: "Intencion del feed",
        ALL: "Todo",
    },

    MODES: {
        TITLE: "Modo del feed",
        ALL: "Global",
        FOLLOWING: "Siguiendo",
        ALL_DESCRIPTION: "Muestra actividad reciente de toda la comunidad.",
        FOLLOWING_DESCRIPTION:
            "Prioriza publicaciones tuyas y de los perfiles que sigues.",
    },

    COMPOSER: {
        PLACEHOLDER: "Que estas pensando?",
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
        IMAGE_ALT: "Publicacion",
        LOADING: "Cargando publicaciones...",
        LOADING_MORE: "Cargando mas publicaciones...",
        EMPTY_TITLE: "Todavia no hay publicaciones",
        EMPTY_DESCRIPTION: "Se el primero en compartir algo con la comunidad.",
        FOLLOWING_EMPTY_TITLE: "Tu feed aun no tiene actividad",
        FOLLOWING_EMPTY_DESCRIPTION:
            "Sigue perfiles para ver sus publicaciones aqui junto con las tuyas.",
        DELETE_ARIA: "Eliminar publicacion",
        EDIT_BUTTON: "Editar",
        SAVE_BUTTON: "Guardar",
        SAVING_BUTTON: "Guardando...",
        CANCEL_BUTTON: "Cancelar",
        SAVE_POST_BUTTON: "Guardar post",
        UNSAVE_POST_BUTTON: "Quitar de guardados",
        PIN_POST_BUTTON: "Fijar",
        UNPIN_POST_BUTTON: "Desfijar",
        EDIT_CONTENT_LABEL: "Editar publicacion",
        EDIT_TYPE_LABEL: "Tipo de publicacion",
        EDIT_EMPTY_VALIDATION: "El contenido de la publicacion no puede quedar vacio.",
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
        EMPTY_DESCRIPTION: "Los comentarios apareceran aqui cuando esten disponibles.",
        INPUT_PLACEHOLDER: "Escribe un comentario...",
        INPUT_ARIA: "Escribe un comentario para esta publicacion",
        SUBMIT_BUTTON: "Comentar",
        SUBMITTING_BUTTON: "Comentando...",
        EDIT_BUTTON: "Editar",
        DELETE_BUTTON: "Eliminar",
        SAVE_BUTTON: "Guardar",
        SAVING_BUTTON: "Guardando...",
        CANCEL_BUTTON: "Cancelar",
        EDIT_PLACEHOLDER: "Edita tu comentario...",
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

    COMMENT_REACTIONS: {
        SUMMARY_ARIA: "Resumen de reacciones del comentario",
        GROUP_ARIA: "Acciones de reacciones del comentario",
        LOADING: "Cargando reacciones del comentario...",
        EMPTY_SUMMARY: "Sin reacciones en este comentario",
        ACTIVE_SUMMARY_PREFIX: "Tu reaccion en este comentario",
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
        CREATE_POST: "No se pudo crear la publicacion.",
        DELETE_POST: "No se pudo eliminar la publicacion.",
        UPDATE_POST: "No se pudo actualizar la publicacion.",
        SAVE_POST: "No se pudo actualizar el estado guardado del post.",
        PIN_POST: "No se pudo actualizar el estado fijado del post.",
        INVALID_POST_TYPE: "El tipo de publicacion no es valido.",
        LOAD_SAVED_POSTS: "No se pudieron cargar los posts guardados.",
        UPDATE_COMMENT: "No se pudo actualizar el comentario.",
        DELETE_COMMENT: "No se pudo eliminar el comentario.",
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

export const PREVIEW_REACTIONS = ["LIKE", "LOVE", "WOW"];

export const FEED_QUERY_PARAMS = {
    POST_ID: "postId",
};

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

export const FEED_MODE_OPTIONS = [
    {
        value: FEED_MODES.FOLLOWING,
        label: FEED_TEXTS.MODES.FOLLOWING,
        description: FEED_TEXTS.MODES.FOLLOWING_DESCRIPTION,
    },
    {
        value: FEED_MODES.ALL,
        label: FEED_TEXTS.MODES.ALL,
        description: FEED_TEXTS.MODES.ALL_DESCRIPTION,
    },
];

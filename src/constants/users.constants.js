export const PROFILE_TEXTS = {
    TITLE: "Mi perfil",
    DESCRIPTION: "Gestiona tus datos y revisa tus publicaciones.",
    PUBLIC_DESCRIPTION: "Perfil publico y publicaciones del usuario.",
    EDIT_PROFILE: "Editar perfil",
    CANCEL_EDIT: "Cancelar",
    SAVE_PROFILE: "Guardar cambios",
    SAVING_PROFILE: "Guardando...",
    LOADING: "Cargando perfil...",
    UPDATE_SUCCESS: "Perfil actualizado correctamente.",
    AVATAR_UPDATE_SUCCESS: "Avatar actualizado correctamente.",

    FOLLOW: {
        FOLLOW_BUTTON: "Seguir",
        FOLLOWING_BUTTON: "Siguiendo",
        STATUS_LOADING: "Cargando estado...",
        LOADING: "Procesando...",
        FOLLOW_SUCCESS: "Ahora sigues a este usuario.",
        UNFOLLOW_SUCCESS: "Dejaste de seguir a este usuario.",
        ALREADY_FOLLOWING: "Ya sigues a este usuario.",
        NOT_FOLLOWING: "Ya no sigues a este usuario.",
        FOLLOWING_HINT:
            "Veras sus publicaciones y actividad en tu experiencia social.",
        FOLLOW_HINT:
            "Puedes seguir este perfil para recibir mejor contexto de su actividad.",
        LOADING_HINT: "Actualizando estado de seguimiento...",
    },

    FIELDS: {
        EMAIL: "Email",
        MEMBER_SINCE: "Miembro desde",
        BIO: "Bio",
        LOCATION: "Ubicacion",
        BIO_FALLBACK: "Sin bio cargada.",
        LOCATION_FALLBACK: "Sin ubicacion cargada.",
    },

    FORM: {
        USER_NAME_LABEL: "Nombre de usuario",
        BIO_LABEL: "Bio",
        LOCATION_LABEL: "Ubicacion",
    },

    AVATAR: {
        CHANGE_BUTTON: "Cambiar avatar",
        CHANGING_BUTTON: "Subiendo avatar...",
        INPUT_ARIA: "Seleccionar imagen de avatar",
    },

    POSTS: {
        TITLE: "Publicaciones",
        SAVED_TITLE: "Posts guardados",
        COUNT_LABEL: "publicaciones",
        FILTER_LABEL: "Filtrar publicaciones",
        EMPTY_BY_TYPE: "No hay publicaciones de esta intencion todavia.",
        EMPTY_SAVED: "Todavia no guardaste posts en esta vista.",
        VIEW_LABEL: "Coleccion de posts",
    },

    ACTIVITY: {
        TITLE: "Actividad",
        DESCRIPTION:
            "Resumen rapido de como publica este perfil y donde pone mas foco.",
        EMPTY: "Todavia no hay actividad publicada para resumir.",
        DOMINANT_PREFIX: "Enfoque principal",
        POSTS_TOTAL: (count) =>
            `${count} ${count === 1 ? "post publicado" : "posts publicados"}`,
    },

    PROJECTS: {
        TITLE: "Proyectos",
        DESCRIPTION:
            "Muestra proyectos concretos, links y tecnologias para dar contexto real a tu perfil.",
        COUNT_LABEL: (count) =>
            `${count} ${count === 1 ? "proyecto visible" : "proyectos visibles"}`,
        EMPTY_TITLE: "Todavia no hay proyectos cargados",
        EMPTY_DESCRIPTION:
            "Agrega proyectos para que otros usuarios y recruiters entiendan mejor lo que estas construyendo.",
        PUBLIC_EMPTY_DESCRIPTION:
            "Este usuario todavia no publico proyectos visibles en su perfil.",
        ADD_BUTTON: "Agregar proyecto",
        EDIT_BUTTON: "Editar",
        DELETE_BUTTON: "Eliminar",
        CREATE_FORM_TITLE: "Nuevo proyecto",
        EDIT_FORM_TITLE: "Editar proyecto",
        CREATE_BUTTON: "Guardar proyecto",
        CREATING_BUTTON: "Guardando...",
        SAVE_BUTTON: "Actualizar proyecto",
        SAVING_BUTTON: "Actualizando...",
        CANCEL_BUTTON: "Cancelar",
        TITLE_LABEL: "Titulo",
        SUMMARY_LABEL: "Resumen",
        TECHNOLOGIES_LABEL: "Tecnologias",
        REPO_LABEL: "Repositorio",
        DEMO_LABEL: "Demo",
        STATUS_LABEL: "Estado",
        FILTER_LABEL: "Filtrar por estado",
        FILTER_ALL: "Todos",
        TECHNOLOGIES_HELPER:
            "Separa tecnologias con coma para mostrarlas como badges.",
        REPO_LINK: "Repositorio",
        DEMO_LINK: "Demo",
        SUMMARY_FALLBACK: "Sin resumen cargado todavia.",
        CREATE_SUCCESS: "Proyecto agregado correctamente.",
        UPDATE_SUCCESS: "Proyecto actualizado correctamente.",
        DELETE_SUCCESS: "Proyecto eliminado correctamente.",
        STATUS_PLANNED: "Planificado",
        STATUS_IN_PROGRESS: "En progreso",
        STATUS_LAUNCHED: "Lanzado",
        STATUS_PAUSED: "Pausado",
    },

    ERRORS: {
        AUTH_USER_MISSING: "No se encontro el usuario autenticado.",
        LOAD_PROFILE: "No se pudo cargar el perfil.",
        LOAD_POSTS: "No se pudieron cargar las publicaciones del usuario.",
        NO_PROFILE_CHANGES: "No hay cambios para guardar.",
        UPDATE_PROFILE: "No se pudo actualizar el perfil.",
        UPDATE_AVATAR: "No se pudo actualizar el avatar.",
        USER_NAME_EXIST: "Este nombre de usuario ya esta en uso.",
        FOLLOW_ACTION: "No se pudo actualizar el seguimiento.",
        FOLLOW_STATUS: "No se pudo consultar el estado de seguimiento.",
        LOAD_PROJECTS: "No se pudieron cargar los proyectos del perfil.",
        SAVE_PROJECT: "No se pudo guardar el proyecto.",
        DELETE_PROJECT: "No se pudo eliminar el proyecto.",
        PROJECT_TITLE_REQUIRED: "El titulo del proyecto es obligatorio.",
        PROJECT_STATUS_INVALID: "El estado del proyecto no es valido.",
        PROJECT_REPO_URL_INVALID: "La URL del repositorio no es valida.",
        PROJECT_DEMO_URL_INVALID: "La URL del demo no es valida.",
        AVATAR_INVALID_TYPE: "Selecciona una imagen JPG, PNG o WEBP.",
        AVATAR_FILE_TOO_LARGE: "La imagen supera el maximo permitido de 10 MB.",
    },
};

export const PROFILE_AVATAR_CONFIG = {
    MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024,
    ACCEPTED_FILE_TYPES: ["image/jpeg", "image/png", "image/webp"],
};

export const PROFILE_FORM_FIELDS = {
    USER_NAME: "userName",
    BIO: "bio",
    LOCATION: "location",
};

export const PROFILE_POST_VIEW_VALUES = {
    OWN: "own",
    SAVED: "saved",
};

export const PROFILE_POST_VIEW_OPTIONS = [
    {
        value: PROFILE_POST_VIEW_VALUES.OWN,
        label: PROFILE_TEXTS.POSTS.TITLE,
    },
    {
        value: PROFILE_POST_VIEW_VALUES.SAVED,
        label: PROFILE_TEXTS.POSTS.SAVED_TITLE,
    },
];

export const PROFILE_PROJECT_STATUS_VALUES = {
    PLANNED: "planned",
    IN_PROGRESS: "in_progress",
    LAUNCHED: "launched",
    PAUSED: "paused",
};

export const PROFILE_PROJECT_STATUS_OPTIONS = [
    {
        value: PROFILE_PROJECT_STATUS_VALUES.PLANNED,
        label: PROFILE_TEXTS.PROJECTS.STATUS_PLANNED,
    },
    {
        value: PROFILE_PROJECT_STATUS_VALUES.IN_PROGRESS,
        label: PROFILE_TEXTS.PROJECTS.STATUS_IN_PROGRESS,
    },
    {
        value: PROFILE_PROJECT_STATUS_VALUES.LAUNCHED,
        label: PROFILE_TEXTS.PROJECTS.STATUS_LAUNCHED,
    },
    {
        value: PROFILE_PROJECT_STATUS_VALUES.PAUSED,
        label: PROFILE_TEXTS.PROJECTS.STATUS_PAUSED,
    },
];

export const PROFILE_PROJECT_FILTER_VALUES = {
    ALL: "all",
    ...PROFILE_PROJECT_STATUS_VALUES,
};

export const PROFILE_PROJECT_FILTER_OPTIONS = [
    {
        value: PROFILE_PROJECT_FILTER_VALUES.ALL,
        label: PROFILE_TEXTS.PROJECTS.FILTER_ALL,
    },
    ...PROFILE_PROJECT_STATUS_OPTIONS,
];

export const PROFILE_PROJECT_SUMMARY_ORDER = [
    PROFILE_PROJECT_STATUS_VALUES.IN_PROGRESS,
    PROFILE_PROJECT_STATUS_VALUES.LAUNCHED,
    PROFILE_PROJECT_STATUS_VALUES.PLANNED,
    PROFILE_PROJECT_STATUS_VALUES.PAUSED,
];

export const getProfileProjectStatusLabel = (status) => {
    const normalizedStatus = `${status ?? ""}`.trim().toLowerCase();
    const option = PROFILE_PROJECT_STATUS_OPTIONS.find(
        (item) => item.value === normalizedStatus
    );

    return option?.label ?? PROFILE_TEXTS.PROJECTS.STATUS_IN_PROGRESS;
};

export const USER_SUGGESTIONS_TEXTS = {
    TITLE: "Sugerencias",
    DESCRIPTION:
        "Personas que quizas conozcas para mejorar tu feed social.",
    LIST_ARIA: "Lista de sugerencias de usuarios",
    REFRESH_ARIA: "Actualizar sugerencias",
    REFRESH_TOOLTIP: "Actualizar sugerencias",
    RETRY_BUTTON: "Reintentar",
    LOADING: "Cargando sugerencias...",
    EMPTY: "No hay sugerencias disponibles por ahora.",
    ERROR: "No se pudieron cargar las sugerencias.",
    UNAVAILABLE:
        "Las sugerencias no estan disponibles en este entorno todavia.",
    TIMEOUT:
        "La carga de sugerencias tardo demasiado. Intenta nuevamente.",
    AUTH_REQUIRED: "Inicia sesion nuevamente para cargar sugerencias.",
    FOLLOW_ACTION_ERROR: "No se pudo seguir al usuario sugerido.",
    FOLLOW_BUTTON: "Seguir",
    FOLLOWING_BUTTON: "Siguiendo...",
    FOLLOW_BUTTON_ARIA: (userName) => `Seguir a ${userName}`,
    FOLLOWERS_COUNT: (count) =>
        `${count} ${count === 1 ? "seguidor" : "seguidores"}`,
    PROJECTS_COUNT: (count) =>
        `${count} ${count === 1 ? "proyecto" : "proyectos"}`,
    PROJECT_SIGNAL_PREFIX: "Proyecto activo",
    PROJECT_FALLBACK: "Perfil con actividad de proyectos para seguir de cerca.",
    INTENT_SIGNAL_PREFIX: "Publica sobre",
    INTENT_SIGNAL_COUNT: (count) =>
        `${count} ${count === 1 ? "post" : "posts"}`,
    BIO_FALLBACK: "Perfil disponible para ampliar tu red.",
};

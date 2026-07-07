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

    POSTS: {
        TITLE: "Publicaciones",
        COUNT_LABEL: "publicaciones",
    },

    ERRORS: {
        AUTH_USER_MISSING: "No se encontro el usuario autenticado.",
        LOAD_PROFILE: "No se pudo cargar el perfil.",
        LOAD_POSTS: "No se pudieron cargar las publicaciones del usuario.",
        NO_PROFILE_CHANGES: "No hay cambios para guardar.",
        UPDATE_PROFILE: "No se pudo actualizar el perfil.",
        USER_NAME_EXIST: "Este nombre de usuario ya esta en uso.",
        FOLLOW_ACTION: "No se pudo actualizar el seguimiento.",
        FOLLOW_STATUS: "No se pudo consultar el estado de seguimiento.",
    },
};

export const PROFILE_FORM_FIELDS = {
    USER_NAME: "userName",
    BIO: "bio",
    LOCATION: "location",
};

export const USER_SUGGESTIONS_TEXTS = {
    TITLE: "Sugerencias",
    DESCRIPTION:
        "Personas que quizas conozcas para mejorar tu feed social.",
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
    FOLLOWERS_COUNT: (count) =>
        `${count} ${count === 1 ? "seguidor" : "seguidores"}`,
    BIO_FALLBACK: "Perfil disponible para ampliar tu red.",
};

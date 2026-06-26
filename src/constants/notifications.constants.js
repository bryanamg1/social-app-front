export const NOTIFICATIONS_SOCKET_NAMESPACE = "/notifications";

export const NOTIFICATIONS_SOCKET_EVENTS = {
    SUBSCRIBE: "subscribe",
    SUBSCRIBED: "notification:subscribed",
    NEW: "notification:new",
    COUNT: "notification:count",
    ERROR: "notification:error",
};

export const NOTIFICATIONS_TYPES = {
    FOLLOW_USER: "FOLLOW_USER",
    COMMENT_POST: "COMMENT_POST",
    REACTION_POST: "REACTION_POST",
    REACTION_COMMENT: "REACTION_COMMENT",
    REPLY_COMMENT: "REPLY_COMMENT",
    REPOST: "REPOST",
    MENTION_USER: "MENTION_USER",
    MESSAGE: "MESSAGE",
};

export const NOTIFICATIONS_TYPE_ALIASES = {
    follow: NOTIFICATIONS_TYPES.FOLLOW_USER,
    comment: NOTIFICATIONS_TYPES.COMMENT_POST,
    reaction: NOTIFICATIONS_TYPES.REACTION_POST,
    message: NOTIFICATIONS_TYPES.MESSAGE,
};

export const NOTIFICATIONS_ERRORS = {
    SOCKET: "No se pudo conectar el canal de notificaciones.",
    SUBSCRIBE: "No se pudo suscribir el canal de notificaciones.",
    LOAD: "No se pudo cargar el historial de notificaciones.",
    MARK_SEEN: "No se pudo marcar la notificacion como leida.",
    MARK_ALL_SEEN: "No se pudieron marcar todas como leidas.",
};

export const NOTIFICATIONS_MESSAGES = {
    USE_NOTIFICATIONS_OUTSIDE_PROVIDER:
        "useNotifications debe usarse dentro de NotificationProvider.",
};

export const NOTIFICATIONS_TEXTS = {
    TOGGLE_LABEL: "Notificaciones",
    PANEL_TITLE: "Notificaciones",
    PANEL_SUBTITLE: "Actividad reciente en tiempo real.",
    CLOSE_PANEL: "Cerrar panel de notificaciones",
    LOADING_HISTORY: "Cargando historial de notificaciones...",
    EMPTY_TITLE: "Todavia no hay notificaciones",
    EMPTY_DESCRIPTION: "Las novedades de tu cuenta apareceran aqui.",
    CONNECTING: "Conectando canal realtime...",
    DISCONNECTED: "Canal realtime sin conexion.",
    ERROR_FALLBACK: "No se pudo cargar el panel de notificaciones.",
    STATUS_ONLINE: "Realtime activo",
    STATUS_OFFLINE: "Realtime inactivo",
    MARK_ALL_READ: "Marcar todo",
    MARK_READ: "Marcar leida",
    READ_LABEL: "Leida",
    NOW: "Ahora",
    FROM_USER: (userId) => `Usuario #${userId}`,
    RELATED_ENTITY: (relateId) => `Referencia #${relateId}`,
    TYPE_LABELS: {
        FOLLOW_USER: "Nuevo seguidor",
        COMMENT_POST: "Nuevo comentario",
        REACTION_POST: "Nueva reaccion",
        REACTION_COMMENT: "Nueva reaccion en comentario",
        REPLY_COMMENT: "Nueva respuesta",
        REPOST: "Nuevo repost",
        MENTION_USER: "Nueva mencion",
        MESSAGE: "Nuevo mensaje",
        default: "Nueva actividad",
    },
    TYPE_DESCRIPTIONS: {
        FOLLOW_USER: (fromUserLabel) => `${fromUserLabel} comenzo a seguirte.`,
        COMMENT_POST: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} comento en ${relatedLabel}.`,
        REACTION_POST: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} reacciono en ${relatedLabel}.`,
        REACTION_COMMENT: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} reacciono en ${relatedLabel}.`,
        REPLY_COMMENT: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} respondio en ${relatedLabel}.`,
        REPOST: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} republico ${relatedLabel}.`,
        MENTION_USER: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} te menciono en ${relatedLabel}.`,
        MESSAGE: (fromUserLabel) => `${fromUserLabel} te envio un mensaje.`,
        default: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} genero actividad en ${relatedLabel}.`,
    },
};

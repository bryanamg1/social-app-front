export const NOTIFICATIONS_SOCKET_NAMESPACE = "/notifications";

export const NOTIFICATIONS_SOCKET_EVENTS = {
    SUBSCRIBE: "subscribe",
    SUBSCRIBED: "notification:subscribed",
    NEW: "notification:new",
    COUNT: "notification:count",
    ERROR: "notification:error",
};

export const NOTIFICATIONS_TYPES = {
    FOLLOW: "follow",
    COMMENT: "comment",
    REACTION: "reaction",
    MESSAGE: "message",
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
        follow: "Nuevo seguidor",
        comment: "Nuevo comentario",
        reaction: "Nueva reaccion",
        message: "Nuevo mensaje",
        default: "Nueva actividad",
    },
    TYPE_DESCRIPTIONS: {
        follow: (fromUserLabel) => `${fromUserLabel} comenzo a seguirte.`,
        comment: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} comento en ${relatedLabel}.`,
        reaction: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} reacciono en ${relatedLabel}.`,
        message: (fromUserLabel) => `${fromUserLabel} te envio un mensaje.`,
        default: (fromUserLabel, relatedLabel) =>
            `${fromUserLabel} genero actividad en ${relatedLabel}.`,
    },
};

export const MESSAGES_TEXTS = {
    PAGE_TITLE: "Mensajes",
    PAGE_SUBTITLE: "Conversa en tiempo real con otros usuarios.",
    LIST_TITLE: "Conversaciones",
    LIST_EMPTY: "Todavia no tienes conversaciones.",
    LIST_LOADING: "Cargando conversaciones...",
    THREAD_EMPTY: "Selecciona una conversacion para ver los mensajes.",
    THREAD_LOADING: "Cargando mensajes...",
    THREAD_WELCOME: "Inicia la conversacion desde un perfil publico o abre una conversacion existente.",
    INPUT_PLACEHOLDER: "Escribe un mensaje...",
    SEND_BUTTON: "Enviar",
    SENDING_BUTTON: "Enviando...",
    START_BUTTON: "Mensaje",
    STARTING_BUTTON: "Abriendo...",
    CREATED_AT_LABEL: "Creada",
    NO_MESSAGES: "Todavia no hay mensajes en esta conversacion.",
    CONVERSATION_FALLBACK: (conversationId) => `Conversacion #${conversationId}`,
    LAST_MESSAGE_EMPTY: "Sin mensajes todavia.",
    RESULTS_FROM_PROFILE: "Conversacion iniciada desde perfil publico.",
    SOCKET_ONLINE: "Realtime conectado.",
    SOCKET_OFFLINE: "Realtime desconectado.",
};

export const MESSAGES_ERRORS = {
    LOAD_CONVERSATIONS: "No se pudieron cargar las conversaciones.",
    LOAD_MESSAGES: "No se pudieron cargar los mensajes.",
    CREATE_CONVERSATION: "No se pudo abrir la conversacion.",
    SEND_MESSAGE: "No se pudo enviar el mensaje.",
    SOCKET: "No se pudo conectar el canal realtime.",
};

export const MESSAGES_QUERY_PARAMS = {
    CONVERSATION_ID: "conversationId",
};

export const MESSAGES_API_DEFAULTS = {
    PAGE_SIZE: 50,
    INITIAL_OFFSET: 0,
};

export const MESSAGES_SOCKET_EVENTS = {
    JOIN: "messages:join",
    JOINED: "messages:joined",
    SEND: "messages:send",
    NEW: "messages:new",
    SENT: "messages:sent",
    ERROR: "messages:error",
};

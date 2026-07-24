export const REPORT_TARGET_TYPES = {
    USER: "user",
    POST: "post",
    COMMENT: "comment",
};

export const REPORT_REASON_CODES = {
    SPAM: "spam",
    HARASSMENT: "harassment",
    HATE: "hate",
    IMPERSONATION: "impersonation",
    MISINFORMATION: "misinformation",
    OTHER: "other",
};

export const REPORT_TEXTS = {
    BUTTON: "Reportar",
    DIALOG_TITLE: "Reportar contenido",
    DIALOG_DESCRIPTION:
        "Describe por que este contenido necesita revision. El reporte quedara en cola de moderacion.",
    REASON_LABEL: "Motivo",
    DETAILS_LABEL: "Detalle adicional",
    DETAILS_PLACEHOLDER: "Agrega contexto concreto para ayudar a la revision.",
    CANCEL_BUTTON: "Cancelar",
    SUBMIT_BUTTON: "Enviar reporte",
    SUBMITTING_BUTTON: "Enviando reporte...",
    SUCCESS: "Reporte enviado correctamente.",
    DUPLICATE_SUCCESS: "Ya existia un reporte pendiente para este contenido.",
    ERRORS: {
        CREATE: "No se pudo enviar el reporte.",
        INVALID: "Selecciona un motivo antes de enviar el reporte.",
    },
    TARGET_LABELS: {
        [REPORT_TARGET_TYPES.USER]: "este perfil",
        [REPORT_TARGET_TYPES.POST]: "esta publicacion",
        [REPORT_TARGET_TYPES.COMMENT]: "este comentario",
    },
};

export const REPORT_REASON_OPTIONS = [
    {
        value: REPORT_REASON_CODES.SPAM,
        label: "Spam",
    },
    {
        value: REPORT_REASON_CODES.HARASSMENT,
        label: "Acoso",
    },
    {
        value: REPORT_REASON_CODES.HATE,
        label: "Discurso de odio",
    },
    {
        value: REPORT_REASON_CODES.IMPERSONATION,
        label: "Suplantacion",
    },
    {
        value: REPORT_REASON_CODES.MISINFORMATION,
        label: "Desinformacion",
    },
    {
        value: REPORT_REASON_CODES.OTHER,
        label: "Otro",
    },
];

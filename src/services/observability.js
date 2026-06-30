import {
    HTTP_HEADERS,
    HTTP_STATUS,
    OBSERVABILITY_CONFIG,
} from "../constants";

const isBrowser = typeof window !== "undefined";

const getNowIso = () => new Date().toISOString();

const getConsoleMethod = (level) => {
    if (level === "error") return console.error;
    if (level === "warn") return console.warn;
    return console.info;
};

const normalizeHeaders = (headers) => {
    if (!headers) return {};
    if (typeof headers.toJSON === "function") return headers.toJSON();
    return headers;
};

const getHeaderValue = (headers, headerName) => {
    const normalizedHeaders = normalizeHeaders(headers);

    return (
        normalizedHeaders?.[headerName] ??
        normalizedHeaders?.[headerName.toLowerCase()] ??
        null
    );
};

const getEventStore = () => {
    if (!isBrowser) return [];

    const currentStore = window[OBSERVABILITY_CONFIG.STORAGE_KEY];

    if (Array.isArray(currentStore)) {
        return currentStore;
    }

    window[OBSERVABILITY_CONFIG.STORAGE_KEY] = [];
    return window[OBSERVABILITY_CONFIG.STORAGE_KEY];
};

export const recordObservabilityEvent = ({
    scope,
    type,
    level = "info",
    message,
    context = {},
}) => {
    const event = {
        timestamp: getNowIso(),
        scope,
        type,
        level,
        message,
        context,
    };

    if (isBrowser) {
        const nextEvents = [...getEventStore(), event].slice(
            -OBSERVABILITY_CONFIG.MAX_EVENTS
        );

        window[OBSERVABILITY_CONFIG.STORAGE_KEY] = nextEvents;
    }

    if (import.meta.env.DEV) {
        const log = getConsoleMethod(level);
        log("[observability]", event);
    }

    return event;
};

const getRequestDuration = (config) => {
    const startedAt = config?.metadata?.startedAt;

    if (!startedAt) return null;

    return Date.now() - startedAt;
};

const getRequestContext = (config) => ({
    method: String(config?.method ?? "GET").toUpperCase(),
    url: config?.url ?? "",
    baseURL: config?.baseURL ?? "",
    durationMs: getRequestDuration(config),
});

export const recordHttpSuccess = (scope, response) => {
    const durationMs = getRequestDuration(response?.config);

    if (
        durationMs === null ||
        durationMs < OBSERVABILITY_CONFIG.SLOW_REQUEST_MS
    ) {
        return null;
    }

    return recordObservabilityEvent({
        scope,
        type: "http:slow",
        level: "warn",
        message: "HTTP request completed slower than expected.",
        context: {
            ...getRequestContext(response?.config),
            status: response?.status ?? null,
            requestId: getHeaderValue(response?.headers, HTTP_HEADERS.REQUEST_ID),
        },
    });
};

export const recordHttpError = (scope, error) => {
    const status = error?.response?.status ?? null;
    const level =
        status === HTTP_STATUS.TOO_MANY_REQUESTS || status >= 500 ? "error" : "warn";

    return recordObservabilityEvent({
        scope,
        type: "http:error",
        level,
        message: error?.message || "HTTP request failed.",
        context: {
            ...getRequestContext(error?.config),
            status,
            code:
                error?.response?.data?.error?.code ??
                error?.response?.data?.code ??
                null,
            requestId: getHeaderValue(error?.response?.headers, HTTP_HEADERS.REQUEST_ID),
            retryAfter: getHeaderValue(
                error?.response?.headers,
                HTTP_HEADERS.RETRY_AFTER
            ),
        },
    });
};

export const recordSocketEvent = (scope, type, details = {}, level = "warn") => {
    return recordObservabilityEvent({
        scope,
        type,
        level,
        message: "Socket lifecycle event captured.",
        context: details,
    });
};

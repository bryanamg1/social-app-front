export const getAuthTextValue = (value, fallback = "") => {
    if (!value) return "";

    if (typeof value === "string") return value;

    if (Array.isArray(value)) {
        return value
            .map((item) => getAuthTextValue(item, fallback))
            .filter(Boolean)
            .join(" ");
    }

    if (typeof value === "object") {
        if (typeof value.message === "string") return value.message;
        if (typeof value.error === "string") return value.error;
        if (value.details) return getAuthTextValue(value.details, fallback);

        try {
            return JSON.stringify(value);
        } catch {
            return fallback;
        }
    }

    return String(value);
};

export const getAuthApiErrorMessage = (error, fallback) => {
    const data = error?.response?.data;

    return (
        getAuthTextValue(data?.error?.message, fallback) ||
        getAuthTextValue(data?.message, fallback) ||
        getAuthTextValue(data?.error, fallback) ||
        getAuthTextValue(data?.details, fallback) ||
        getAuthTextValue(data, fallback) ||
        getAuthTextValue(error?.message, fallback) ||
        fallback
    );
};

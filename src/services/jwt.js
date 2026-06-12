import { JWT_CONFIG } from "../constants";

export function getJwtPayload(token) {
    try {
        const payload = token.split(".")[1];

        if (!payload) return null;

        const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = atob(normalizedPayload);

        return JSON.parse(decodedPayload);
    } catch {
        return null;
    }
}

export function isTokenExpired(token) {
    const payload = getJwtPayload(token);

    if (!payload?.exp) return false;

    return Date.now() >= payload.exp * JWT_CONFIG.MILLISECONDS_PER_SECOND;
}
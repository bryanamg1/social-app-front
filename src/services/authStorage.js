import { STORAGE_KEYS } from "../constants";

export const authStorage = {
    getToken() {
        return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    },

    setToken(token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    },

    getUser() {
        const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

        if (!storedUser) return null;

        try {
        return JSON.parse(storedUser);
        } catch {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        return null;
        }
    },

    setUser(user) {
        if (!user) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        return;
        }

        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    },

    clear() {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    },
};
import { createContext, useEffect, useMemo, useState } from "react";

import { STORAGE_KEYS } from "../constants";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

        if (storedToken) {
        setToken(storedToken);
        }

        if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        }
        }

        setLoadingAuth(false);
    }, []);

    const login = ({ token, user }) => {
        setToken(token);
        setUser(user || null);

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

        if (user) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
        } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    };

    const value = useMemo(
        () => ({
        token,
        user,
        loadingAuth,
        isAuthenticated: Boolean(token),
        login,
        logout,
        }),
        [token, user, loadingAuth]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
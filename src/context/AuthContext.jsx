import { createContext, useCallback, useMemo, useState } from "react";
import { authService } from "../components/auth/services/authService";
import { AUTH_MESSAGES } from "../constants";
import { authStorage } from "../services/authStorage";
import { isTokenExpired } from "../services/jwt";

export const AuthContext = createContext(null);

function getInitialAuthState() {
    const storedToken = authStorage.getToken();

    if (!storedToken || isTokenExpired(storedToken)) {
        authStorage.clear();

        return {
        token: null,
        user: null,
        };
    }

    return {
        token: storedToken,
        user: authStorage.getUser(),
    };
}

function extractTokenFromResponse(data) {
    return data?.token || data?.Token || data?.accessToken || null;
}

function extractUserFromResponse(data) {
    return data?.user || data?.usuario || data?.data?.user || null;
}

export function AuthProvider({ children }) {
    const [session, setSession] = useState(getInitialAuthState);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    const saveSession = useCallback((token, user = null) => {
        authStorage.setToken(token);
        authStorage.setUser(user);

        setSession({
        token,
        user,
        });
    }, []);

    const login = useCallback(
        async (credentials) => {
        setAuthLoading(true);
        setAuthError(null);

        try {
            const data = await authService.login(credentials);

            const token = extractTokenFromResponse(data);
            const user = extractUserFromResponse(data);

            if (!token) {
            throw new Error(AUTH_MESSAGES.TOKEN_NOT_FOUND);
            }

            saveSession(token, user);

            return data;
        } catch (error) {
            setAuthError(error.message || AUTH_MESSAGES.LOGIN_ERROR);
            throw error;
        } finally {
            setAuthLoading(false);
        }
        },
        [saveSession]
    );

    const register = useCallback(async (payload) => {
        setAuthLoading(true);
        setAuthError(null);

        try {
        const data = await authService.register(payload);
        return data;
        } catch (error) {
        setAuthError(error.message || AUTH_MESSAGES.REGISTER_ERROR);
        throw error;
        } finally {
        setAuthLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authStorage.clear();

        setSession({
        token: null,
        user: null,
        });

        setAuthError(null);
    }, []);

    const updateAuthUser = useCallback((user) => {
        authStorage.setUser(user);

        setSession((currentSession) => ({
        ...currentSession,
        user,
        }));
    }, []);

    const refreshSession = useCallback(() => {
        const nextSession = getInitialAuthState();
        setSession(nextSession);

        return Boolean(nextSession.token);
    }, []);

    const value = useMemo(
        () => ({
        token: session.token,
        user: session.user,
        isAuthenticated: Boolean(session.token),
        authLoading,
        authError,
        login,
        register,
        logout,
        updateAuthUser,
        refreshSession,
        }),
        [
        session.token,
        session.user,
        authLoading,
        authError,
        login,
        register,
        logout,
        updateAuthUser,
        refreshSession,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
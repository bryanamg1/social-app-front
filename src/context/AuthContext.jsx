import { useCallback, useMemo, useState } from "react";

import { authStorage } from "../services/authStorage";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => authStorage.getToken());
    const [user, setUser] = useState(() => authStorage.getUser());
    const [loadingAuth] = useState(false);

    const login = useCallback(({ token, user }) => {
        setToken(token);
        setUser(user || null);

        authStorage.setToken(token);
        authStorage.setUser(user);
    }, []);

    const updateUser = useCallback((nextUser) => {
        setUser((currentUser) => {
        const updatedUser = {
            ...(currentUser || {}),
            ...(nextUser || {}),
        };

        authStorage.setUser(updatedUser);

        return updatedUser;
        });
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);

        authStorage.clear();
    }, []);

    const value = useMemo(
        () => ({
        token,
        user,
        loadingAuth,
        isAuthenticated: Boolean(token),
        login,
        updateUser,
        logout,
        }),
        [token, user, loadingAuth, login, updateUser, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

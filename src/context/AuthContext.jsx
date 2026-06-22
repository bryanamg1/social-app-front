import { useMemo, useState } from "react";

import { authStorage } from "../services/authStorage";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => authStorage.getToken());
    const [user, setUser] = useState(() => authStorage.getUser());
    const [loadingAuth] = useState(false);

    const login = ({ token, user }) => {
        setToken(token);
        setUser(user || null);

        authStorage.setToken(token);
        authStorage.setUser(user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);

        authStorage.clear();
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

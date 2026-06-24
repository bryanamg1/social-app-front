import { useContext } from "react";
import { AUTH_MESSAGES } from "../constants";
import { AuthContext } from "../context/AuthContextValue";

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(AUTH_MESSAGES.USE_AUTH_OUTSIDE_PROVIDER);
    }

    return context;
}

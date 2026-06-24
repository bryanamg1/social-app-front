import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTES.FEED} replace />;
    }

    return <Outlet />;
}

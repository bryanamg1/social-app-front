import { Navigate, Outlet, useLocation } from "react-router-dom";
import { FullPageLoader } from "../components/ui/Loader/FullPageLoader";
import { ROUTES, UI_TEXTS } from "../constants";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
    const { isAuthenticated, loadingAuth } = useAuth();
    const location = useLocation();

    if (loadingAuth) {
        return <FullPageLoader text={UI_TEXTS.LOADER.VERIFYING_SESSION} />;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
    }

    return <Outlet />;
}
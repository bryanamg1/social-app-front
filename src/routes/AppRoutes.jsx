import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { FullPageLoader } from "../components/ui/Loader/FullPageLoader";
import { ROUTES, UI_TEXTS } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

const LoginPage = lazy(() => import("../components/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../components/auth/pages/RegisterPage"));
const FeedPage = lazy(() => import("../components/feed/pages/FeedPage"));
const MainLayout = lazy(() =>
    import("../components/layout/components/MainLayout").then((module) => ({
        default: module.MainLayout,
    }))
);
const MessagesPage = lazy(() =>
    import("../components/messages/pages/MessagesPage").then((module) => ({
        default: module.MessagesPage,
    }))
);
const ProfilePage = lazy(() =>
    import("../components/users/pages/ProfilePage").then((module) => ({
        default: module.ProfilePage,
    }))
);
const PublicProfilePage = lazy(() =>
    import("../components/users/pages/PublicProfilePage").then((module) => ({
        default: module.PublicProfilePage,
    }))
);

function RootRouteRedirect() {
    const { isAuthenticated } = useAuth();

    return (
        <Navigate
            to={isAuthenticated ? ROUTES.FEED : ROUTES.LOGIN}
            replace
        />
    );
}

export function AppRoutes() {
    return (
        <Suspense
            fallback={<FullPageLoader text={UI_TEXTS.LOADER.ROUTE_CHANGE} />}
        >
            <Routes>
            <Route path={ROUTES.ROOT} element={<RootRouteRedirect />} />

            <Route element={<PublicRoute />}>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                <Route path={ROUTES.HOME} element={<FeedPage />} />
                <Route path={ROUTES.MESSAGES} element={<MessagesPage />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                <Route
                    path={ROUTES.PROFILE_DETAIL}
                    element={<PublicProfilePage />}
                />
                </Route>
            </Route>

            <Route
                path={ROUTES.NOT_FOUND}
                element={<h1>{UI_TEXTS.ERROR_404.TITLE}</h1>}
            />
            </Routes>
        </Suspense>
    );
}

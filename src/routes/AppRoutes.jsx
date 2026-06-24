import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../components/auth/pages/LoginPage";
import RegisterPage from "../components/auth/pages/RegisterPage";
import FeedPage from "../components/feed/pages/FeedPage";
import { MainLayout } from "../components/layout/components/MainLayout";
import { MessagesPage } from "../components/messages/pages/MessagesPage";
import { ProfilePage } from "../components/users/pages/ProfilePage";
import { PublicProfilePage } from "../components/users/pages/PublicProfilePage";
import { ROUTES, UI_TEXTS } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

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
            <Route path={ROUTES.PROFILE_DETAIL} element={<PublicProfilePage />} />
            </Route>
        </Route>

        <Route
            path={ROUTES.NOT_FOUND}
            element={<h1>{UI_TEXTS.ERROR_404.TITLE}</h1>}
        />
        </Routes>
    );
}

import { Route, Routes } from "react-router-dom";

import LoginPage from "../components/auth/pages/LoginPage";
import RegisterPage from "../components/auth/pages/RegisterPage";
import FeedPage from "../components/feed/pages/FeedPage";
import { MainLayout } from "../components/layout/components/MainLayout";
import { ProfilePage } from "../components/users/pages/ProfilePage";
import { ROUTES, UI_TEXTS } from "../constants";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRoutes() {
    return (
        <Routes>
        <Route element={<PublicRoute />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<FeedPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Route>
        </Route>

        <Route
            path={ROUTES.NOT_FOUND}
            element={<h1>{UI_TEXTS.ERROR_404.TITLE}</h1>}
        />
        </Routes>
    );
}
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "../constants";

import LoginPage from "../components/auth/pages/LoginPage";
import RegisterPage from "../components/auth/pages/RegisterPage";
import FeedPage from "../components/feed/pages/FeedPage";
import {ProfilePage} from "../components/users/pages/ProfilePage";

import { MainLayout } from "../components/layout/components/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Navigate to={ROUTES.FEED} replace />} />

        <Route element={<PublicRoute />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
            <Route path={ROUTES.FEED} element={<FeedPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.FEED} replace />} />
        </Routes>
    );
}
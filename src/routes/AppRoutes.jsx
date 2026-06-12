import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRoutes() {
    return (
        <Routes>
        <Route element={<PublicRoute />}>
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/register" element={<h1>Registro</h1>} />
        </Route>

        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<h1>Feed privado</h1>} />
            <Route path="/profile" element={<h1>Perfil</h1>} />
        </Route>

        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    );
}
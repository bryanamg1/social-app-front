import { LAYOUT_TEXTS } from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { LeftSidebar } from "./LeftSidebar";

export function LeftSidebarContainer() {
    const { logout, user } = useAuth();

    const userInitial = user?.email?.charAt(0)?.toUpperCase() || "U";

    const userData = {
        name: user?.name || LAYOUT_TEXTS.DEFAULT_USER,
        email: user?.email || LAYOUT_TEXTS.ACTIVE_SESSION,
        initial: userInitial,
    };

    return <LeftSidebar user={userData} onLogout={logout} />;
}
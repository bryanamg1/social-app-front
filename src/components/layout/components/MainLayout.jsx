import { Suspense, lazy, useId } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import {
  APP_BRAND,
  ROUTES,
  LAYOUT_TEXTS,
  RIGHT_SIDEBAR_TEXTS,
  SIDEBAR_NAV_ITEMS,
} from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { useFeedRefresh } from "../../../hooks/useFeedRefresh";
import { useNotifications } from "../../../hooks/useNotifications";
import { useUserSearch } from "../../users/hooks/useUserSearch";
import { useUserSuggestions } from "../../users/hooks/useUserSuggestions";
import { getUserId } from "../../users/utils/userProfileAdapter";
import { NotificationToggleButton } from "../../notifications/components/NotificationToggleButton";
import { useNotificationPanel } from "../../notifications/hooks/useNotificationPanel";
import { SidebarPanelSkeleton } from "./SidebarPanelSkeleton";

import styles from "../styles/MainLayout.module.css";
import notificationStyles from "../../notifications/styles/Notifications.module.css";

const UserSearchPanel = lazy(() =>
    import("./UserSearchPanel").then((module) => ({
        default: module.UserSearchPanel,
    }))
);
const UserSuggestionsPanel = lazy(() =>
    import("../../users/components/UserSuggestionsPanel").then((module) => ({
        default: module.UserSuggestionsPanel,
    }))
);
const NotificationPanel = lazy(() =>
    import("../../notifications/components/NotificationPanel").then((module) => ({
        default: module.NotificationPanel,
    }))
);

const ICONS_BY_KEY = {
    home: <HomeOutlinedIcon />,
    messages: <MailOutlineRoundedIcon />,
    profile: <PersonOutlineOutlinedIcon />,
};

const getUserDisplayName = (user) => {
    return (
        user?.name ??
        user?.username ??
        user?.email ??
        LAYOUT_TEXTS.DEFAULT_USER
    );
};

export function MainLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const feedRefresh = useFeedRefresh();
    const notificationPanel = useNotificationPanel();
    const notificationsState = useNotifications();
    const notificationsPanelId = useId();

    const userDisplayName = getUserDisplayName(user);
    const currentUserId = getUserId(user);
    const userSearch = useUserSearch({ currentUserId });
    const suggestionsState = useUserSuggestions({ currentUserId });
    const avatarLetter = userDisplayName.charAt(0).toUpperCase();
    const isFeedRoute = location.pathname === ROUTES.FEED;

    const handleFeedRefresh = async () => {
        if (isFeedRoute) {
            await feedRefresh.requestRefresh();
            return;
        }

        navigate(ROUTES.FEED);
    };

    const handleNavItemClick = (item) => async (event) => {
        if (item.path !== ROUTES.FEED || !isFeedRoute) return;

        event.preventDefault();
        await feedRefresh.requestRefresh();
    };

    return (
        <div className={styles.appShell}>
        <aside className={styles.leftSidebar}>
            <div className={styles.leftSidebarInner}>
            <button
                type="button"
                className={styles.brandButton}
                aria-label={
                    feedRefresh.isRefreshing
                        ? LAYOUT_TEXTS.REFRESHING_FEED
                        : LAYOUT_TEXTS.REFRESH_FEED
                }
                title={
                    feedRefresh.isRefreshing
                        ? LAYOUT_TEXTS.REFRESHING_FEED
                        : LAYOUT_TEXTS.REFRESH_FEED
                }
                disabled={feedRefresh.isRefreshing}
                onClick={handleFeedRefresh}
            >
                <span className={styles.brandLogo}>{APP_BRAND.LOGO}</span>

                <div className={styles.brandText}>
                <p className={styles.brandName}>{APP_BRAND.NAME}</p>
                <p className={styles.brandTagline}>
                    {feedRefresh.isRefreshing
                        ? LAYOUT_TEXTS.REFRESHING_FEED
                        : APP_BRAND.TAGLINE}
                </p>
                </div>
            </button>

            <nav
                className={styles.navMenu}
                aria-label={LAYOUT_TEXTS.PRIMARY_NAV_ARIA}
            >
                {SIDEBAR_NAV_ITEMS.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavItemClick(item)}
                    className={({ isActive }) =>
                    isActive ? styles.navItemActive : styles.navItem
                    }
                >
                    <span className={styles.navIcon}>
                    {ICONS_BY_KEY[item.iconKey]}
                    </span>

                    <span className={styles.navLabel}>{item.label}</span>
                </NavLink>
                ))}

                <NotificationToggleButton
                isOpen={notificationPanel.isOpen}
                unreadCount={notificationsState.unreadCount}
                panelId={notificationsPanelId}
                onToggle={notificationPanel.togglePanel}
                buttonClassName={
                    notificationPanel.isOpen
                    ? styles.navActionButtonActive
                    : styles.navActionButton
                }
                iconClassName={styles.navIcon}
                labelClassName={styles.navLabel}
                badgeClassName={styles.navBadge}
                />

                <button
                type="button"
                className={styles.mobileLogoutButton}
                onClick={logout}
                aria-label={LAYOUT_TEXTS.LOGOUT}
                >
                <span className={styles.navIcon}>
                    <LogoutOutlinedIcon />
                </span>

                <span className={styles.navLabel}>
                    {LAYOUT_TEXTS.MOBILE_LOGOUT}
                </span>
                </button>
            </nav>

            <div className={styles.sessionCard}>
                <div className={styles.avatar}>{avatarLetter}</div>

                <div className={styles.sessionInfo}>
                <p className={styles.sessionLabel}>
                    {LAYOUT_TEXTS.ACTIVE_SESSION}
                </p>

                <p className={styles.sessionUser}>{userDisplayName}</p>
                </div>

                <button
                type="button"
                className={styles.logoutButton}
                onClick={logout}
                aria-label={LAYOUT_TEXTS.LOGOUT}
                >
                <LogoutOutlinedIcon />
                </button>
            </div>
            </div>
        </aside>

        <main className={styles.mainContent}>
            <Outlet context={{ suggestionsState }} />
        </main>

        <Suspense fallback={null}>
            <NotificationPanel
            panelId={notificationsPanelId}
            isOpen={notificationPanel.isOpen}
            notifications={notificationsState.notifications}
            unreadCount={notificationsState.unreadCount}
            isConnected={notificationsState.isConnected}
            isSubscribed={notificationsState.isSubscribed}
            loadingHistory={notificationsState.loadingHistory}
            markingAllAsSeen={notificationsState.markingAllAsSeen}
            error={notificationsState.error}
            onMarkSeen={notificationsState.markNotificationSeen}
            onMarkAllSeen={notificationsState.markAllNotificationsSeen}
            onClose={notificationPanel.closePanel}
            styles={notificationStyles}
            />
        </Suspense>

        <aside
            className={styles.rightSidebar}
            aria-label={LAYOUT_TEXTS.RIGHT_SIDEBAR_ARIA}
        >
            <div className={styles.rightSidebarInner}>
            <Suspense fallback={<SidebarPanelSkeleton withSearch lines={4} />}>
                <UserSearchPanel search={userSearch} />
            </Suspense>

            <Suspense fallback={<SidebarPanelSkeleton lines={5} />}>
                <UserSuggestionsPanel suggestionsState={suggestionsState} />
            </Suspense>

            <section className={styles.rightCard}>
                <h3 className={styles.rightCardTitle}>
                {RIGHT_SIDEBAR_TEXTS.TRENDING_TITLE}
                </h3>

                <p className={styles.rightCardText}>
                {RIGHT_SIDEBAR_TEXTS.TRENDING_DESCRIPTION}
                </p>
            </section>
            </div>
        </aside>
        </div>
    );
}

import { NavLink, Outlet } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import {
  APP_BRAND,
  LAYOUT_TEXTS,
  RIGHT_SIDEBAR_TEXTS,
  SIDEBAR_NAV_ITEMS,
} from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { useUserSearch } from "../../users/hooks/useUserSearch";
import { getUserId } from "../../users/utils/userProfileAdapter";
import { UserSearchPanel } from "./UserSearchPanel";

import styles from "../styles/MainLayout.module.css";

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

    const userDisplayName = getUserDisplayName(user);
    const currentUserId = getUserId(user);
    const userSearch = useUserSearch({ currentUserId });
    const avatarLetter = userDisplayName.charAt(0).toUpperCase();

    return (
        <div className={styles.appShell}>
        <aside className={styles.leftSidebar}>
            <div className={styles.leftSidebarInner}>
            <div className={styles.brand}>
                <span className={styles.brandLogo}>{APP_BRAND.LOGO}</span>

                <div className={styles.brandText}>
                <p className={styles.brandName}>{APP_BRAND.NAME}</p>
                <p className={styles.brandTagline}>{APP_BRAND.TAGLINE}</p>
                </div>
            </div>

            <nav className={styles.navMenu}>
                {SIDEBAR_NAV_ITEMS.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
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
            </nav>

            <button type="button" className={styles.createPostButton}>
                {APP_BRAND.LOGO}
            </button>

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
            <Outlet />
        </main>

        <aside className={styles.rightSidebar}>
            <div className={styles.rightSidebarInner}>
            <UserSearchPanel search={userSearch} />

            <section className={styles.rightCard}>
                <h3 className={styles.rightCardTitle}>
                {RIGHT_SIDEBAR_TEXTS.SUGGESTIONS_TITLE}
                </h3>

                <p className={styles.rightCardText}>
                {RIGHT_SIDEBAR_TEXTS.TRENDING_DESCRIPTION}
                </p>
            </section>

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

import { NavLink } from "react-router-dom";
import { APP_BRAND, LAYOUT_TEXTS, SIDEBAR_NAV_ITEMS } from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import styles from "../styles/LeftSidebar.module.css";

export function LeftSidebar() {
    const { logout, user } = useAuth();

    const userInitial = user?.email?.charAt(0)?.toUpperCase() || "U";

    return (
        <aside className={styles.sidebar}>
        <div>
            <div className={styles.brand}>
            <span className={styles.logo}>{APP_BRAND.LOGO}</span>

            <div className={styles.brandText}>
                <strong>{APP_BRAND.NAME}</strong>
                <small>{APP_BRAND.TAGLINE}</small>
            </div>
            </div>

            <nav className={styles.nav}>
            {SIDEBAR_NAV_ITEMS.map((item) => (
                <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                }
                >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
                </NavLink>
            ))}
            </nav>
        </div>

        <div className={styles.footer}>
            <div className={styles.userCard}>
            <div className={styles.avatar}>{userInitial}</div>

            <div className={styles.userInfo}>
                <strong>{user?.name || LAYOUT_TEXTS.DEFAULT_USER}</strong>
                <small>{user?.email || LAYOUT_TEXTS.ACTIVE_SESSION}</small>
            </div>
            </div>

            <button type="button" className={styles.logoutButton} onClick={logout}>
            {LAYOUT_TEXTS.LOGOUT}
            </button>
        </div>
        </aside>
    );
}
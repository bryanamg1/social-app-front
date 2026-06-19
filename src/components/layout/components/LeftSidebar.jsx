import { Avatar, Button, Tooltip } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { NavLink } from "react-router-dom";
import { APP_BRAND, LAYOUT_TEXTS, SIDEBAR_NAV_ITEMS } from "../../../constants";
import styles from "../styles/LeftSidebar.module.css";

const SIDEBAR_ICONS = {
    home: <HomeRoundedIcon fontSize="small" />,
    profile: <PersonRoundedIcon fontSize="small" />,
};

export function LeftSidebar({ user, onLogout }) {
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
                <Tooltip key={item.path} title={item.label} placement="right">
                <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                    isActive
                        ? `${styles.navItem} ${styles.active}`
                        : styles.navItem
                    }
                >
                    <span className={styles.icon}>{SIDEBAR_ICONS[item.iconKey]}</span>
                    <span className={styles.label}>{item.label}</span>
                </NavLink>
                </Tooltip>
            ))}
            </nav>
        </div>

        <div className={styles.footer}>
            <div className={styles.userCard}>
            <Avatar
                sx={{
                width: 42,
                height: 42,
                bgcolor: "background.default",
                color: "primary.main",
                fontWeight: 900,
                }}
            >
                {user.initial}
            </Avatar>

            <div className={styles.userInfo}>
                <strong>{user.name}</strong>
                <small>{user.email}</small>
            </div>
            </div>

            <Button
            type="button"
            variant="outlined"
            color="error"
            startIcon={<LogoutRoundedIcon />}
            className={styles.logoutButton}
            onClick={onLogout}
            >
            {LAYOUT_TEXTS.LOGOUT}
            </Button>
        </div>
        </aside>
    );
}
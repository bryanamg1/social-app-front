import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { NOTIFICATIONS_TEXTS } from "../../../constants";

export const NotificationToggleButton = ({
    isOpen,
    unreadCount,
    onToggle,
    buttonClassName,
    iconClassName,
    labelClassName,
    badgeClassName,
}) => {
    const hasUnread = unreadCount > 0;

    return (
        <button
        type="button"
        className={buttonClassName}
        onClick={onToggle}
        aria-label={NOTIFICATIONS_TEXTS.TOGGLE_LABEL}
        aria-expanded={isOpen}
        >
        <span className={iconClassName}>
            <NotificationsNoneOutlinedIcon />

            {hasUnread && (
            <span className={badgeClassName}>
                {unreadCount > 99 ? "99+" : unreadCount}
            </span>
            )}
        </span>

        <span className={labelClassName}>{NOTIFICATIONS_TEXTS.TOGGLE_LABEL}</span>
        </button>
    );
};

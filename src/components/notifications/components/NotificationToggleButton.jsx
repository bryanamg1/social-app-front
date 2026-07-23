import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { NOTIFICATIONS_TEXTS } from "../../../constants";

export const NotificationToggleButton = ({
    isOpen,
    unreadCount,
    panelId,
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
        aria-label={NOTIFICATIONS_TEXTS.TOGGLE_LABEL_WITH_COUNT(unreadCount)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
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

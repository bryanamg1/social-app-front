import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { NOTIFICATIONS_TEXTS } from "../../../constants";
import { getNotificationKey } from "../utils/notificationAdapter";
import { NotificationItem } from "./NotificationItem";

export const NotificationPanel = ({
    isOpen,
    notifications,
    unreadCount,
    isConnected,
    isSubscribed,
    loadingHistory,
    markingAllAsSeen,
    error,
    onMarkSeen,
    onMarkAllSeen,
    onClose,
    styles,
}) => {
    if (!isOpen) return null;

    const isLoading = isConnected && !isSubscribed;
    const statusText = isConnected
        ? NOTIFICATIONS_TEXTS.STATUS_ONLINE
        : NOTIFICATIONS_TEXTS.STATUS_OFFLINE;

    return (
        <>
        <button
            type="button"
            className={styles.panelBackdrop}
            onClick={onClose}
            aria-label={NOTIFICATIONS_TEXTS.CLOSE_PANEL}
        />

        <section className={styles.panel} aria-label={NOTIFICATIONS_TEXTS.PANEL_TITLE}>
            <div className={styles.panelHeader}>
            <div className={styles.panelHeaderCopy}>
                <p className={styles.panelTitle}>{NOTIFICATIONS_TEXTS.PANEL_TITLE}</p>
                <p className={styles.panelSubtitle}>
                {NOTIFICATIONS_TEXTS.PANEL_SUBTITLE}
                </p>
            </div>

            <div className={styles.panelHeaderActions}>
                <button
                type="button"
                className={styles.panelActionButton}
                onClick={onMarkAllSeen}
                disabled={!notifications.length || !unreadCount || markingAllAsSeen}
                >
                {NOTIFICATIONS_TEXTS.MARK_ALL_READ}
                </button>

                <span className={styles.panelCount}>
                {unreadCount > 99 ? "99+" : unreadCount}
                </span>

                <button
                type="button"
                className={styles.panelCloseButton}
                onClick={onClose}
                aria-label={NOTIFICATIONS_TEXTS.CLOSE_PANEL}
                >
                <CloseRoundedIcon fontSize="small" />
                </button>
            </div>
            </div>

            <div className={styles.panelStatusRow}>
            <span
                className={
                isConnected ? styles.statusDotConnected : styles.statusDotDisconnected
                }
            />

            <span className={styles.panelStatusText}>{statusText}</span>
            </div>

            {error ? (
            <div className={styles.panelState}>
                <p className={styles.panelStateTitle}>{NOTIFICATIONS_TEXTS.ERROR_FALLBACK}</p>
                <p className={styles.panelStateText}>{error}</p>
            </div>
            ) : loadingHistory ? (
            <div className={styles.panelState}>
                <p className={styles.panelStateTitle}>{NOTIFICATIONS_TEXTS.LOADING_HISTORY}</p>
                <p className={styles.panelStateText}>{NOTIFICATIONS_TEXTS.PANEL_SUBTITLE}</p>
            </div>
            ) : isLoading ? (
            <div className={styles.panelState}>
                <p className={styles.panelStateTitle}>{NOTIFICATIONS_TEXTS.CONNECTING}</p>
                <p className={styles.panelStateText}>{NOTIFICATIONS_TEXTS.PANEL_SUBTITLE}</p>
            </div>
            ) : !isConnected ? (
            <div className={styles.panelState}>
                <p className={styles.panelStateTitle}>{NOTIFICATIONS_TEXTS.DISCONNECTED}</p>
                <p className={styles.panelStateText}>{NOTIFICATIONS_TEXTS.PANEL_SUBTITLE}</p>
            </div>
            ) : !notifications.length ? (
            <div className={styles.panelState}>
                <p className={styles.panelStateTitle}>{NOTIFICATIONS_TEXTS.EMPTY_TITLE}</p>
                <p className={styles.panelStateText}>
                {NOTIFICATIONS_TEXTS.EMPTY_DESCRIPTION}
                </p>
            </div>
            ) : (
            <div className={styles.panelList}>
                {notifications.map((notification, index) => (
                <NotificationItem
                    key={getNotificationKey(notification, index)}
                    notification={notification}
                    styles={styles}
                    onMarkSeen={onMarkSeen}
                />
                ))}
            </div>
            )}
        </section>
        </>
    );
};

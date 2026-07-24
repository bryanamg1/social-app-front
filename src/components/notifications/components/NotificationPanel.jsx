import { useId } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { NOTIFICATIONS_TEXTS } from "../../../constants";
import {
    getNotificationKey,
    getNotificationTarget,
} from "../utils/notificationAdapter";
import { NotificationItem } from "./NotificationItem";

export const NotificationPanel = ({
    isOpen,
    panelId,
    notifications,
    unreadCount,
    isConnected,
    isSubscribed,
    loadingHistory,
    markingAllAsSeen,
    error,
    onMarkSeen,
    onMarkAllSeen,
    onOpenNotification,
    onClose,
    styles,
}) => {
    const titleId = useId();
    const descriptionId = useId();
    if (!isOpen) return null;

    const isLoading = isConnected && !isSubscribed;
    const statusText = isConnected
        ? NOTIFICATIONS_TEXTS.STATUS_ONLINE
        : NOTIFICATIONS_TEXTS.STATUS_OFFLINE;
    const actionText = markingAllAsSeen
        ? NOTIFICATIONS_TEXTS.MARKING_ALL_READ
        : NOTIFICATIONS_TEXTS.MARK_ALL_READ;

    return (
        <>
        <button
            type="button"
            className={styles.panelBackdrop}
            onClick={onClose}
            aria-label={NOTIFICATIONS_TEXTS.CLOSE_PANEL}
        />

        <section
            id={panelId}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
        >
            <div className={styles.panelHeader}>
            <div className={styles.panelHeaderCopy}>
                <p id={titleId} className={styles.panelTitle}>
                    {NOTIFICATIONS_TEXTS.PANEL_TITLE}
                </p>
                <p id={descriptionId} className={styles.panelSubtitle}>
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
                {actionText}
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

            <div className={styles.panelStatusRow} role="status" aria-live="polite">
            <div className={styles.panelStatusMeta}>
                <span
                className={
                    isConnected
                    ? styles.statusDotConnected
                    : styles.statusDotDisconnected
                }
                />

                <span className={styles.panelStatusText}>{statusText}</span>
            </div>

            <span className={styles.panelStatusSummary}>
                {NOTIFICATIONS_TEXTS.STATUS_SUMMARY(unreadCount)}
            </span>
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
                {notifications.map((notification, index) => {
                    const notificationTarget = getNotificationTarget(notification);

                    return (
                        <NotificationItem
                            key={getNotificationKey(notification, index)}
                            notification={notification}
                            styles={styles}
                            canOpen={Boolean(notificationTarget)}
                            onMarkSeen={onMarkSeen}
                            onOpen={
                                notificationTarget
                                    ? () =>
                                          onOpenNotification(
                                              notification,
                                              notificationTarget
                                          )
                                    : undefined
                            }
                        />
                    );
                })}
            </div>
            )}
        </section>
        </>
    );
};

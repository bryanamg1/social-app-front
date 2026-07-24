import { useId, useMemo, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { NOTIFICATIONS_TEXTS } from "../../../constants";
import {
    groupNotifications,
    getNotificationTarget,
} from "../utils/notificationAdapter";
import { NotificationItem } from "./NotificationItem";
import { NotificationPreferencesSection } from "./NotificationPreferencesSection";

export const NotificationPanel = ({
    isOpen,
    panelId,
    notifications,
    unreadCount,
    isConnected,
    isSubscribed,
    loadingHistory,
    preferences,
    loadingPreferences,
    markingAllAsSeen,
    updatingPreferences,
    error,
    onMarkManySeen,
    onMarkAllSeen,
    onUpdatePreference,
    onOpenNotification,
    onClose,
    styles,
}) => {
    const titleId = useId();
    const descriptionId = useId();
    const [showPreferences, setShowPreferences] = useState(false);
    const groupedNotifications = useMemo(
        () => groupNotifications(notifications),
        [notifications]
    );
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
                onClick={() => setShowPreferences((currentValue) => !currentValue)}
                >
                {NOTIFICATIONS_TEXTS.PREFERENCES_OPEN}
                </button>

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

            {showPreferences ? (
                <NotificationPreferencesSection
                    preferences={preferences}
                    loading={loadingPreferences}
                    updating={updatingPreferences}
                    onChange={(preferenceKey, checked) =>
                        onUpdatePreference({
                            [preferenceKey]: checked,
                        })
                    }
                    styles={styles}
                />
            ) : null}

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
                {groupedNotifications.map((group) => {
                    const notificationTarget = getNotificationTarget(group.notification);
                    const unseenIds = group.items
                        .filter((item) => !item?.seen)
                        .map((item) => item?.id);

                    return (
                        <NotificationItem
                            key={group.id}
                            notification={group.notification}
                            styles={styles}
                            totalCount={group.totalCount}
                            unreadCount={group.unreadCount}
                            canOpen={Boolean(notificationTarget)}
                            onMarkSeen={() => onMarkManySeen(unseenIds)}
                            onOpen={
                                notificationTarget
                                    ? () =>
                                          onOpenNotification(
                                              group.items,
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

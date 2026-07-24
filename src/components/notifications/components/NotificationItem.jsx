import {
    formatNotificationDate,
    getNotificationDescription,
    getNotificationTitle,
    getNotificationCreatedAt,
    isNotificationSeen,
} from "../utils/notificationAdapter";
import { NOTIFICATIONS_TEXTS } from "../../../constants";

export const NotificationItem = ({
    notification,
    styles,
    onMarkSeen,
    onOpen,
    canOpen = false,
    totalCount = 1,
    unreadCount = 0,
}) => {
    const createdAt = getNotificationCreatedAt(notification);
    const seen = unreadCount === 0 || isNotificationSeen(notification);

    return (
        <article
        className={seen ? styles.notificationItemSeen : styles.notificationItem}
        >
        <div className={styles.notificationAccent} />

        <div className={styles.notificationBody}>
            <div className={styles.notificationHeader}>
            <p className={styles.notificationTitle}>
                {getNotificationTitle(notification)}
            </p>
            <div className={styles.notificationHeaderMeta}>
                {totalCount > 1 ? (
                    <span className={styles.notificationGroupBadge}>
                        {NOTIFICATIONS_TEXTS.GROUP_COUNT(totalCount)}
                    </span>
                ) : null}

                <span className={styles.notificationDate}>
                    {formatNotificationDate(createdAt)}
                </span>
            </div>
            </div>

            <p className={styles.notificationText}>
            {getNotificationDescription(notification)}
            </p>

            <div className={styles.notificationFooter}>
                <div className={styles.notificationFooterActions}>
                    {canOpen ? (
                        <button
                            type="button"
                            className={styles.notificationSecondaryButton}
                            onClick={onOpen}
                        >
                            {NOTIFICATIONS_TEXTS.OPEN_ACTION}
                        </button>
                    ) : null}

                    {seen ? (
                        <span className={styles.notificationSeenLabel}>
                            {NOTIFICATIONS_TEXTS.READ_LABEL}
                        </span>
                    ) : (
                        <button
                            type="button"
                            className={styles.notificationActionButton}
                            onClick={onMarkSeen}
                        >
                            {NOTIFICATIONS_TEXTS.MARK_READ}
                        </button>
                    )}
                </div>
            </div>
        </div>
        </article>
    );
};

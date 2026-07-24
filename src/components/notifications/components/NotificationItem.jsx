import {
    formatNotificationDate,
    getNotificationDescription,
    getNotificationId,
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
}) => {
    const createdAt = getNotificationCreatedAt(notification);
    const notificationId = getNotificationId(notification);
    const seen = isNotificationSeen(notification);

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

            <span className={styles.notificationDate}>
                {formatNotificationDate(createdAt)}
            </span>
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
                            onClick={() => onMarkSeen(notificationId)}
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

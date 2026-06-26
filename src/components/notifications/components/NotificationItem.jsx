import {
    formatNotificationDate,
    getNotificationDescription,
    getNotificationTitle,
    getNotificationCreatedAt,
} from "../utils/notificationAdapter";

export const NotificationItem = ({ notification, styles }) => {
    const createdAt = getNotificationCreatedAt(notification);

    return (
        <article className={styles.notificationItem}>
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
        </div>
        </article>
    );
};

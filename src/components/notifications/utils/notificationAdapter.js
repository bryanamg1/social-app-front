import { NOTIFICATIONS_TEXTS } from "../../../constants";

export const getNotificationId = (notification) => {
    return notification?.id ?? notification?.notificationId ?? notification?._id;
};

export const getNotificationType = (notification) => {
    return String(notification?.type ?? notification?.notification_type ?? "")
        .trim()
        .toLowerCase();
};

export const getNotificationCreatedAt = (notification) => {
    return notification?.created_at ?? notification?.createdAt ?? null;
};

export const isNotificationSeen = (notification) => {
    return Boolean(notification?.seen ?? notification?.isSeen ?? false);
};

export const getNotificationKey = (notification, index = 0) => {
    return (
        getNotificationId(notification) ??
        `${getNotificationType(notification)}-${getNotificationCreatedAt(notification) ?? "now"}-${index}`
    );
};

export const formatNotificationDate = (date) => {
    if (!date) return NOTIFICATIONS_TEXTS.NOW;

    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

export const getNotificationTitle = (notification) => {
    const type = getNotificationType(notification);

    return (
        NOTIFICATIONS_TEXTS.TYPE_LABELS[type] ??
        NOTIFICATIONS_TEXTS.TYPE_LABELS.default
    );
};

const getFromUserLabel = (notification) => {
    return NOTIFICATIONS_TEXTS.FROM_USER(
        notification?.from_userId ?? notification?.fromUserId ?? "?"
    );
};

const getRelatedLabel = (notification) => {
    return NOTIFICATIONS_TEXTS.RELATED_ENTITY(
        notification?.relate_id ?? notification?.relateId ?? "?"
    );
};

export const getNotificationDescription = (notification) => {
    const type = getNotificationType(notification);
    const fromUserLabel = getFromUserLabel(notification);
    const relatedLabel = getRelatedLabel(notification);
    const formatter =
        NOTIFICATIONS_TEXTS.TYPE_DESCRIPTIONS[type] ??
        NOTIFICATIONS_TEXTS.TYPE_DESCRIPTIONS.default;

    return formatter(fromUserLabel, relatedLabel);
};

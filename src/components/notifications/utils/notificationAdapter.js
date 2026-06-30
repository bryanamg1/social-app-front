import {
    NOTIFICATIONS_TEXTS,
    NOTIFICATIONS_TYPE_ALIASES,
    NOTIFICATIONS_TYPES,
} from "../../../constants";

const VALID_NOTIFICATION_TYPES = new Set(Object.values(NOTIFICATIONS_TYPES));

const normalizeNotificationType = (type) => {
    const rawType = String(type ?? "").trim();

    if (!rawType) {
        return "";
    }

    if (VALID_NOTIFICATION_TYPES.has(rawType)) {
        return rawType;
    }

    return NOTIFICATIONS_TYPE_ALIASES[rawType.toLowerCase()] ?? rawType;
};

export const getNotificationId = (notification) => {
    return notification?.id ?? notification?.notificationId ?? notification?._id;
};

export const getNotificationType = (notification) => {
    return normalizeNotificationType(
        notification?.type ?? notification?.notification_type ?? ""
    );
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

const getStringValue = (...values) => {
    const match = values.find((value) => typeof value === "string" && value.trim());
    return match?.trim() ?? "";
};

const getNotificationSnippet = (notification) => {
    const snippet = getStringValue(
        notification?.post_content,
        notification?.postContent,
        notification?.comment_content,
        notification?.commentContent,
        notification?.message_preview,
        notification?.messagePreview,
        notification?.content
    );

    if (!snippet) return "";

    return snippet.length > 48 ? `${snippet.slice(0, 45)}...` : snippet;
};

const getFromUserLabel = (notification) => {
    return (
        getStringValue(
            notification?.from_user_name,
            notification?.fromUserName,
            notification?.from_user_username,
            notification?.fromUserUsername,
            notification?.sender_name,
            notification?.senderName,
            notification?.user_name,
            notification?.userName,
            notification?.fromUser?.user_name,
            notification?.fromUser?.userName,
            notification?.fromUser?.name
        ) || NOTIFICATIONS_TEXTS.UNKNOWN_USER
    );
};

const getRelatedLabel = (notification, type) => {
    const snippet = getNotificationSnippet(notification);

    if (snippet) {
        return `"${snippet}"`;
    }

    switch (type) {
        case NOTIFICATIONS_TYPES.COMMENT_POST:
        case NOTIFICATIONS_TYPES.REACTION_POST:
            return NOTIFICATIONS_TEXTS.RELATED_POST;
        case NOTIFICATIONS_TYPES.REACTION_COMMENT:
        case NOTIFICATIONS_TYPES.REPLY_COMMENT:
            return NOTIFICATIONS_TEXTS.RELATED_COMMENT;
        case NOTIFICATIONS_TYPES.REPOST:
        case NOTIFICATIONS_TYPES.MENTION_USER:
            return NOTIFICATIONS_TEXTS.RELATED_CONTENT;
        default:
            return NOTIFICATIONS_TEXTS.RELATED_CONTENT;
    }
};

export const getNotificationDescription = (notification) => {
    const type = getNotificationType(notification);
    const fromUserLabel = getFromUserLabel(notification);
    const relatedLabel = getRelatedLabel(notification, type);
    const formatter =
        NOTIFICATIONS_TEXTS.TYPE_DESCRIPTIONS[type] ??
        NOTIFICATIONS_TEXTS.TYPE_DESCRIPTIONS.default;

    return formatter(fromUserLabel, relatedLabel);
};

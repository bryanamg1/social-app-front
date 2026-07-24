import {
    FEED_QUERY_PARAMS,
    MESSAGES_QUERY_PARAMS,
    NOTIFICATIONS_TEXTS,
    NOTIFICATIONS_TYPE_ALIASES,
    NOTIFICATIONS_TYPES,
    ROUTES,
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

const getNumberValue = (...values) => {
    const match = values.find((value) => value !== null && value !== undefined && `${value}`.trim());
    const nextValue = Number(match);

    return Number.isFinite(nextValue) && nextValue > 0 ? nextValue : null;
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

const buildSearch = (params) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") return;
        searchParams.set(key, String(value));
    });

    const search = searchParams.toString();

    return search ? `?${search}` : "";
};

export const getNotificationTarget = (notification) => {
    const type = getNotificationType(notification);
    const relatedUserId = getNumberValue(
        notification?.from_user_id,
        notification?.from_userId,
        notification?.relate_id
    );
    const relatedConversationId = getNumberValue(
        notification?.conversation_id,
        notification?.relate_id
    );
    const relatedPostId = getNumberValue(
        notification?.post_id,
        notification?.relate_id
    );

    switch (type) {
        case NOTIFICATIONS_TYPES.FOLLOW_USER:
            return relatedUserId
                ? {
                      pathname: ROUTES.USER_PROFILE(relatedUserId),
                  }
                : null;
        case NOTIFICATIONS_TYPES.MESSAGE:
            return relatedConversationId
                ? {
                      pathname: ROUTES.MESSAGES,
                      search: buildSearch({
                          [MESSAGES_QUERY_PARAMS.CONVERSATION_ID]:
                              relatedConversationId,
                      }),
                  }
                : null;
        case NOTIFICATIONS_TYPES.COMMENT_POST:
        case NOTIFICATIONS_TYPES.REACTION_POST:
        case NOTIFICATIONS_TYPES.REACTION_COMMENT:
        case NOTIFICATIONS_TYPES.REPLY_COMMENT:
        case NOTIFICATIONS_TYPES.REPOST:
        case NOTIFICATIONS_TYPES.MENTION_USER:
            return relatedPostId
                ? {
                      pathname: ROUTES.FEED,
                      search: buildSearch({
                          [FEED_QUERY_PARAMS.POST_ID]: relatedPostId,
                      }),
                  }
                : {
                      pathname: ROUTES.FEED,
                  };
        default:
            return null;
    }
};

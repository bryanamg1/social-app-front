export const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
};

export const HTTP_HEADERS = {
    REQUEST_ID: "x-request-id",
    RETRY_AFTER: "retry-after",
};

export const HTTP_TIMEOUTS = {
    AUTH_GOOGLE_MS: 15000,
    AUTH_PASSWORD_RECOVERY_MS: 15000,
    USER_SUGGESTIONS_MS: 8000,
};

export const HTTP_ERROR_MESSAGES = {
    DEFAULT: "Ocurrió un error inesperado.",
};

export const API_ERROR_CODES = {
    USER_NAME_EXIST: "USER_NAME_EXIST",
    FOLLOW_USER: "FOLLOW_USER",
    NOT_FOLLOWING: "NOT_FOLLOWING",
    FOLLOW_STATUS_READ_FAILED: "FOLLOW_STATUS_READ_FAILED",
};

export const API_ENDPOINTS = {
    AUTH: {
        FORGOT_PASSWORD: "/auth/forgot-password",
        GOOGLE: "/auth/google",
        LOGIN: "/auth/login",
        MY_PROFILE: "/auth/me/profile",
        PROFILE: (userId) => `/auth/users/${userId}`,
        PROFILE_PROJECTS: (userId) => `/auth/users/${userId}/projects`,
        PROFILE_PROJECT_DETAIL: (userId, projectId) =>
            `/auth/users/${userId}/projects/${projectId}`,
        REGISTER: "/auth/register",
        RESET_PASSWORD: "/auth/reset-password",
        UPDATE_MY_PROFILE: "/auth/me/profile",
        SEARCH_USERS: "/auth/usersSearch",
    },

    CONVERSATIONS: {
        CREATE_OR_GET: "/conversations/addConversations",
        LIST: "/conversations/myConversations",
        MESSAGES: (conversationId) => `/conversations/readMessage/${conversationId}/message`,
        SEND: "/conversations/sendMessage",
    },

    FOLLOWS: {
        FEED: "/follows/feed",
        SUGGESTIONS: "/follows/suggestions",
        STATUS: (userId) => `/follows/users/${userId}/status`,
        FOLLOW_USER: (userId) => `/follows/users/${userId}/follow`,
        UNFOLLOW_USER: (userId) => `/follows/users/${userId}/unfollow`,
    },

    POSTS: {
        ALL: "/posts/allpost",
        CREATE: "/posts",
        BY_USER: (userId) => `/posts/postByUserId/${userId}`,
        DETAIL: (postId) => `/posts/postById/${postId}`,
        UPDATE: (postId) => `/posts/${postId}`,
        SAVED: "/posts/saved",
        SAVED_IDS: "/posts/saved/ids",
        SAVE: (postId) => `/posts/${postId}/save`,
        PIN: (postId) => `/posts/${postId}/pin`,
        REMOVE: (postId) => `/posts/removePost/${postId}`,
    },

    COMMENTS: {
        READ_BY_POST: (postId) => `/comments/readComment/${postId}`,
        ADD: (postId) => `/comments/${postId}`,
        UPDATE: (commentId) => `/comments/${commentId}`,
        REMOVE: (commentId) => `/comments/${commentId}`,
    },

    REACTIONS: {
        TOGGLE_POST: (postId) => `/reactions/posts/${postId}`,
        BY_POST: (postId) => `/reactions/reactionsPost/${postId}`,
        MY_POST: (postId) => `/reactions/posts/${postId}/mine`,
        TOGGLE_COMMENT: (commentId) => `/reactions/comments/${commentId}`,
        BY_COMMENT: (commentId) => `/reactions/reactionComment/${commentId}`,
        MY_COMMENT: (commentId) => `/reactions/comments/${commentId}/mine`,
    },

    NOTIFICATIONS: {
        LIST: "/notifications",
        MARK_SEEN: (notificationId) => `/notifications/${notificationId}/seen`,
        MARK_ALL_SEEN: "/notifications/seen-all",
    },

    IMAGES: {
        AVATAR: "/image/avatar",
    },
};

export const API_BODY_FIELDS = {
    PROFILE: {
        USER_NAME: "user_name",
        BIO: "bio",
        LOCATION: "location",
    },

    PROJECTS: {
        TITLE: "title",
        SUMMARY: "summary",
        TECHNOLOGIES: "technologies",
        REPO_URL: "repo_url",
        DEMO_URL: "demo_url",
        STATUS: "status",
    },

    CONVERSATIONS: {
        USER_ID: "user_id",
        OTHER_USER_ID: "other_user_id",
        SENDER_ID: "senderId",
        CONVERSATION_ID: "conversationId",
        CONTENT: "content",
    },

    COMMENTS: {
        TEXT: "comment_text",
    },

    POSTS: {
        TYPE: "post_type",
    },

    REACTIONS: {
        STATUS: "status",
    },
};

export const API_QUERY_PARAMS = {
    PAGINATION: {
        PAGE: "page",
        LIMIT: "limit",
    },

    SEARCH: {
        QUERY: "query",
        LIMIT: "limit",
    },

    CONVERSATIONS: {
        USER_ID: "uid",
        LIMIT: "limit",
        OFFSET: "offset",
    },

    POSTS: {
        TYPE: "postType",
    },
};

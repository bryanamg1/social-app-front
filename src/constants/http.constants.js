export const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
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
        LOGIN: "/auth/login",
        PROFILE: (userId) => `/auth/users/${userId}`,
        REGISTER: "/auth/register",
        UPDATE_PROFILE: (userId) => `/auth/update/${userId}`,
        SEARCH_USERS: "/auth/usersSearch",
    },

    FOLLOWS: {
        FEED: "/follows/feed",
        STATUS: (userId) => `/follows/users/${userId}/status`,
        FOLLOW_USER: (userId) => `/follows/users/${userId}/follow`,
        UNFOLLOW_USER: (userId) => `/follows/users/${userId}/unfollow`,
    },

    POSTS: {
        ALL: "/posts/allpost",
        CREATE: (userId) => `/posts/CreatePost/${userId}`,
        BY_USER: (userId) => `/posts/postByUserId/${userId}`,
        REMOVE: (postId) => `/posts/removePost/${postId}`,
    },

    COMMENTS: {
        READ_BY_POST: (postId) => `/comments/readComment/${postId}`,
        ADD: (userId, postId) => `/comments/addComment/${userId}/${postId}`,
    },

    REACTIONS: {
        TOGGLE_POST: (userId, postId) =>
            `/reactions/toggleReaction/${userId}/${postId}`,
        BY_POST: (postId) => `/reactions/reactionsPost/${postId}`,
        MY_POST: (userId, postId) =>
            `/reactions/${userId}/${postId}/byUserInPost`,
    },
};

export const API_BODY_FIELDS = {
    PROFILE: {
        USER_NAME: "user_name",
        BIO: "bio",
        LOCATION: "location",
    },

    COMMENTS: {
        TEXT: "comment_text",
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
};

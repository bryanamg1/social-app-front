export const HTTP_STATUS = {
    UNAUTHORIZED: 401,
};

export const HTTP_ERROR_MESSAGES = {
    DEFAULT: "Ocurrió un error inesperado.",
};

export const API_ENDPOINTS = {
    FOLLOWS: {
        FEED: "/follows/feed",
    },

    POSTS: {
        ALL: "/posts/allpost",
        CREATE: (userId) => `/posts/CreatePost/${userId}`,
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

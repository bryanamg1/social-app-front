import apiClient from "../../../services/apiClient";
import {
    API_BODY_FIELDS,
    API_ENDPOINTS,
    API_QUERY_PARAMS,
} from "../../../constants";
import {
    getCommentReactionsFromResponse,
    getCommentsFromResponse,
    getMyReactionFromResponse,
    getPostFromResponse,
    getPostReactionsFromResponse,
    getPostsFromResponse,
} from "../utils/postAdapter";

const pendingPostsRequests = new Map();

const getPostsRequestKey = ({ page, limit, postType } = {}) => {
    return `${API_ENDPOINTS.POSTS.ALL}:${page ?? ""}:${limit ?? ""}:${postType ?? ""}`;
};

const getFollowingFeedRequestKey = ({ page, limit, postType } = {}) => {
    return `${API_ENDPOINTS.FOLLOWS.FEED}:${page ?? ""}:${limit ?? ""}:${postType ?? ""}`;
};

export const getAllPosts = async ({ page, limit, postType } = {}) => {
    const requestKey = getPostsRequestKey({ page, limit, postType });

    if (pendingPostsRequests.has(requestKey)) {
        return pendingPostsRequests.get(requestKey);
    }

    const request = apiClient.get(API_ENDPOINTS.POSTS.ALL, {
        params: {
        [API_QUERY_PARAMS.PAGINATION.PAGE]: page,
        [API_QUERY_PARAMS.PAGINATION.LIMIT]: limit,
        [API_QUERY_PARAMS.POSTS.TYPE]: postType || undefined,
        },
    })
        .then((response) => getPostsFromResponse(response))
        .finally(() => {
        pendingPostsRequests.delete(requestKey);
        });

    pendingPostsRequests.set(requestKey, request);

    return request;
};

export const getFollowingFeed = async ({ page, limit, postType } = {}) => {
    const requestKey = getFollowingFeedRequestKey({ page, limit, postType });

    if (pendingPostsRequests.has(requestKey)) {
        return pendingPostsRequests.get(requestKey);
    }

    const request = apiClient
        .get(API_ENDPOINTS.FOLLOWS.FEED, {
            params: {
                [API_QUERY_PARAMS.PAGINATION.PAGE]: page,
                [API_QUERY_PARAMS.PAGINATION.LIMIT]: limit,
                [API_QUERY_PARAMS.POSTS.TYPE]: postType || undefined,
            },
        })
        .then((response) => getPostsFromResponse(response))
        .finally(() => {
            pendingPostsRequests.delete(requestKey);
        });

    pendingPostsRequests.set(requestKey, request);

    return request;
};

export const createPost = async ({ content, image, postType }) => {
    const formData = new FormData();

    if (content?.trim()) {
        formData.append("content", content.trim());
        formData.append("description", content.trim());
    }

    if (image) {
        formData.append("image", image);
    }

    if (postType) {
        formData.append(API_BODY_FIELDS.POSTS.TYPE, postType);
    }

    const response = await apiClient.post(API_ENDPOINTS.POSTS.CREATE, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const removePost = async (postId) => {
    const response = await apiClient.delete(API_ENDPOINTS.POSTS.REMOVE(postId));
    return response.data;
};

export const updatePost = async ({ postId, content, postType }) => {
    const response = await apiClient.patch(API_ENDPOINTS.POSTS.UPDATE(postId), {
        content: content.trim(),
        [API_BODY_FIELDS.POSTS.TYPE]: postType,
    });

    return getPostFromResponse(response);
};

export const getPostById = async (postId) => {
    const response = await apiClient.get(API_ENDPOINTS.POSTS.DETAIL(postId));

    return getPostFromResponse(response);
};

export const getSavedPosts = async ({ page, limit, postType } = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.POSTS.SAVED, {
        params: {
            [API_QUERY_PARAMS.PAGINATION.PAGE]: page,
            [API_QUERY_PARAMS.PAGINATION.LIMIT]: limit,
            [API_QUERY_PARAMS.POSTS.TYPE]: postType || undefined,
        },
    });

    return getPostsFromResponse(response);
};

export const getSavedPostIds = async () => {
    const response = await apiClient.get(API_ENDPOINTS.POSTS.SAVED_IDS);
    const savedPostIds = response?.data?.data ?? [];

    if (!Array.isArray(savedPostIds)) {
        return [];
    }

    return savedPostIds.map((postId) => Number(postId)).filter(Boolean);
};

export const savePostById = async (postId) => {
    const response = await apiClient.post(API_ENDPOINTS.POSTS.SAVE(postId));

    return response?.data?.data?.savedPostIds ?? response?.data?.data ?? [];
};

export const unsavePostById = async (postId) => {
    const response = await apiClient.delete(API_ENDPOINTS.POSTS.SAVE(postId));
    return response.data;
};

export const togglePinnedPost = async ({ postId, pinned }) => {
    const response = await apiClient.patch(API_ENDPOINTS.POSTS.PIN(postId), {
        pinned,
    });

    return getPostFromResponse(response);
};

export const getCommentsByPostId = async (postId) => {
    const response = await apiClient.get(API_ENDPOINTS.COMMENTS.READ_BY_POST(postId));

    return getCommentsFromResponse(response);
};

export const createComment = async ({ postId, commentText }) => {
    const response = await apiClient.post(API_ENDPOINTS.COMMENTS.ADD(postId), {
        [API_BODY_FIELDS.COMMENTS.TEXT]: commentText.trim(),
    });

    return response.data;
};

export const updateCommentById = async ({ commentId, commentText }) => {
    const response = await apiClient.patch(API_ENDPOINTS.COMMENTS.UPDATE(commentId), {
        [API_BODY_FIELDS.COMMENTS.TEXT]: commentText.trim(),
    });

    return getPostFromResponse(response);
};

export const deleteCommentById = async (commentId) => {
    const response = await apiClient.delete(API_ENDPOINTS.COMMENTS.REMOVE(commentId));
    return response.data;
};

export const getPostReactions = async (postId) => {
    const response = await apiClient.get(API_ENDPOINTS.REACTIONS.BY_POST(postId));

    return getPostReactionsFromResponse(response);
};

export const getMyPostReaction = async ({ postId }) => {
    const response = await apiClient.get(API_ENDPOINTS.REACTIONS.MY_POST(postId));

    return getMyReactionFromResponse(response);
};

export const togglePostReaction = async ({ postId, reactionType }) => {
    const response = await apiClient.post(
        API_ENDPOINTS.REACTIONS.TOGGLE_POST(postId),
        {
        [API_BODY_FIELDS.REACTIONS.STATUS]: reactionType,
        }
    );

    return response.data;
};

export const getCommentReactions = async (commentId) => {
    const response = await apiClient.get(API_ENDPOINTS.REACTIONS.BY_COMMENT(commentId));

    return getCommentReactionsFromResponse(response);
};

export const getMyCommentReaction = async ({ commentId }) => {
    const response = await apiClient.get(API_ENDPOINTS.REACTIONS.MY_COMMENT(commentId));

    return getMyReactionFromResponse(response);
};

export const toggleCommentReaction = async ({ commentId, reactionType }) => {
    const response = await apiClient.post(
        API_ENDPOINTS.REACTIONS.TOGGLE_COMMENT(commentId),
        {
            [API_BODY_FIELDS.REACTIONS.STATUS]: reactionType,
        }
    );

    return response.data;
};

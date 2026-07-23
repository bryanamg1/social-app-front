import apiClient from "../../../services/apiClient";
import {
    API_BODY_FIELDS,
    API_ENDPOINTS,
    API_QUERY_PARAMS,
} from "../../../constants";
import {
    getCommentsFromResponse,
    getMyReactionFromResponse,
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

export const createPost = async ({ userId, content, image, postType }) => {
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

    const response = await apiClient.post(API_ENDPOINTS.POSTS.CREATE(userId), formData, {
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

export const getCommentsByPostId = async (postId) => {
    const response = await apiClient.get(API_ENDPOINTS.COMMENTS.READ_BY_POST(postId));

    return getCommentsFromResponse(response);
};

export const createComment = async ({ userId, postId, commentText }) => {
    const response = await apiClient.post(API_ENDPOINTS.COMMENTS.ADD(userId, postId), {
        [API_BODY_FIELDS.COMMENTS.TEXT]: commentText.trim(),
    });

    return response.data;
};

export const getPostReactions = async (postId) => {
    const response = await apiClient.get(API_ENDPOINTS.REACTIONS.BY_POST(postId));

    return getPostReactionsFromResponse(response);
};

export const getMyPostReaction = async ({ userId, postId }) => {
    const response = await apiClient.get(API_ENDPOINTS.REACTIONS.MY_POST(userId, postId));

    return getMyReactionFromResponse(response);
};

export const togglePostReaction = async ({ userId, postId, reactionType }) => {
    const response = await apiClient.post(
        API_ENDPOINTS.REACTIONS.TOGGLE_POST(userId, postId),
        {
        [API_BODY_FIELDS.REACTIONS.STATUS]: reactionType,
        }
    );

    return response.data;
};

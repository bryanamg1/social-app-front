import apiClient from "../../../services/apiClient";

const extractPostsArray = (response) => {
    const payload = response?.data?.data ?? response?.data;

    if (Array.isArray(payload)) return payload;

    if (Array.isArray(payload?.posts)) return payload.posts;
    if (Array.isArray(payload?.feed)) return payload.feed;
    if (Array.isArray(payload?.results)) return payload.results;

    return [];
};

export const getAllPosts = async () => {
    const response = await apiClient.get("/posts/allpost");
    return extractPostsArray(response);
};

export const getFollowingFeed = async () => {
    const response = await apiClient.get("/follows/feed");
    return extractPostsArray(response);
};

export const createPost = async ({ userId, content, image }) => {
    const formData = new FormData();

    if (content?.trim()) {
        formData.append("content", content.trim());
        formData.append("description", content.trim());
    }

    if (image) {
        formData.append("image", image);
    }

    const response = await apiClient.post(`/posts/CreatePost/${userId}`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const removePost = async (postId) => {
    const response = await apiClient.delete(`/posts/removePost/${postId}`);
    return response.data;
};
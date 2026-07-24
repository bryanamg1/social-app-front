import apiClient from "../../../services/apiClient";
import { API_ENDPOINTS } from "../../../constants";

const normalizeRelationshipStatus = (data) => {
    return {
        isFollowing: Boolean(data?.isFollowing),
        isBlocked: Boolean(data?.isBlocked),
        isBlockedByUser: Boolean(data?.isBlockedByUser),
    };
};

export const getRelationshipStatus = async (userId) => {
    const response = await apiClient.get(API_ENDPOINTS.FOLLOWS.STATUS(userId));

    return normalizeRelationshipStatus(response?.data?.data);
};

export const followUser = async (userId) => {
    const response = await apiClient.post(API_ENDPOINTS.FOLLOWS.FOLLOW_USER(userId));

    return response.data;
};

export const unfollowUser = async (userId) => {
    const response = await apiClient.post(
        API_ENDPOINTS.FOLLOWS.UNFOLLOW_USER(userId)
    );

    return response.data;
};

export const blockUser = async (userId) => {
    const response = await apiClient.post(API_ENDPOINTS.FOLLOWS.BLOCK_USER(userId));

    return response.data;
};

export const unblockUser = async (userId) => {
    const response = await apiClient.post(
        API_ENDPOINTS.FOLLOWS.UNBLOCK_USER(userId)
    );

    return response.data;
};

import apiClient from "../../../services/apiClient";
import { API_ENDPOINTS } from "../../../constants";

export const getFollowStatus = async (userId) => {
    const response = await apiClient.get(API_ENDPOINTS.FOLLOWS.STATUS(userId));

    return Boolean(response?.data?.data?.isFollowing);
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

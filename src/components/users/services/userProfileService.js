import apiClient from "../../../services/apiClient";
import { API_BODY_FIELDS, API_ENDPOINTS, API_QUERY_PARAMS } from "../../../constants";
import {
    getProfileFormChanges,
    getProfileFromResponse,
    getUpdatedProfileFromResponse,
    getUserPostsFromResponse,
} from "../utils/userProfileAdapter";

export const getUserProfile = async (userId) => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE(userId));

    return getProfileFromResponse(response);
};

export const updateUserProfile = async ({
    userId,
    userName,
    bio,
    location,
    currentProfile,
}) => {
    const changes = getProfileFormChanges(currentProfile, {
        userName,
        bio,
        location,
    });
    const payload = {};

    if (changes.userNameChanged) {
        payload[API_BODY_FIELDS.PROFILE.USER_NAME] = changes.values.userName;
    }

    if (changes.bioChanged) {
        payload[API_BODY_FIELDS.PROFILE.BIO] = changes.values.bio;
    }

    if (changes.locationChanged) {
        payload[API_BODY_FIELDS.PROFILE.LOCATION] = changes.values.location;
    }

    const response = await apiClient.patch(
        API_ENDPOINTS.AUTH.UPDATE_PROFILE(userId),
        payload
    );

    return getUpdatedProfileFromResponse(response, currentProfile);
};

export const getPostsByUserId = async ({ userId, page, limit }) => {
    const response = await apiClient.get(API_ENDPOINTS.POSTS.BY_USER(userId), {
        params: {
        [API_QUERY_PARAMS.PAGINATION.PAGE]: page,
        [API_QUERY_PARAMS.PAGINATION.LIMIT]: limit,
        },
    });

    return getUserPostsFromResponse(response);
};

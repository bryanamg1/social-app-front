import apiClient from "../../../services/apiClient";
import { API_BODY_FIELDS, API_ENDPOINTS, API_QUERY_PARAMS } from "../../../constants";
import {
    getProjectFromResponse,
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

export const uploadUserAvatar = async ({ file, currentProfile }) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await apiClient.post(API_ENDPOINTS.IMAGES.AVATAR, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return getUpdatedProfileFromResponse(
        {
            data: {
                data: {
                    ...(currentProfile || {}),
                    avatar_url:
                        response?.data?.avatar_url ??
                        response?.data?.data?.avatar_url ??
                        "",
                },
            },
        },
        currentProfile
    );
};

export const getPostsByUserId = async ({ userId, page, limit, postType = null }) => {
    const params = {
        [API_QUERY_PARAMS.PAGINATION.PAGE]: page,
        [API_QUERY_PARAMS.PAGINATION.LIMIT]: limit,
    };

    if (postType) {
        params[API_QUERY_PARAMS.POSTS.TYPE] = postType;
    }

    const response = await apiClient.get(API_ENDPOINTS.POSTS.BY_USER(userId), {
        params,
    });

    return getUserPostsFromResponse(response);
};

export const createUserProject = async ({ userId, project }) => {
    const response = await apiClient.post(
        API_ENDPOINTS.AUTH.PROFILE_PROJECTS(userId),
        {
            [API_BODY_FIELDS.PROJECTS.TITLE]: project.title,
            [API_BODY_FIELDS.PROJECTS.SUMMARY]: project.summary,
            [API_BODY_FIELDS.PROJECTS.TECHNOLOGIES]: project.technologies,
            [API_BODY_FIELDS.PROJECTS.REPO_URL]: project.repoUrl,
            [API_BODY_FIELDS.PROJECTS.DEMO_URL]: project.demoUrl,
            [API_BODY_FIELDS.PROJECTS.STATUS]: project.status,
        }
    );

    return getProjectFromResponse(response);
};

export const updateUserProject = async ({ userId, projectId, project }) => {
    const response = await apiClient.patch(
        API_ENDPOINTS.AUTH.PROFILE_PROJECT_DETAIL(userId, projectId),
        {
            [API_BODY_FIELDS.PROJECTS.TITLE]: project.title,
            [API_BODY_FIELDS.PROJECTS.SUMMARY]: project.summary,
            [API_BODY_FIELDS.PROJECTS.TECHNOLOGIES]: project.technologies,
            [API_BODY_FIELDS.PROJECTS.REPO_URL]: project.repoUrl,
            [API_BODY_FIELDS.PROJECTS.DEMO_URL]: project.demoUrl,
            [API_BODY_FIELDS.PROJECTS.STATUS]: project.status,
        }
    );

    return getProjectFromResponse(response);
};

export const deleteUserProject = async ({ userId, projectId }) => {
    const response = await apiClient.delete(
        API_ENDPOINTS.AUTH.PROFILE_PROJECT_DETAIL(userId, projectId)
    );

    return response.data;
};

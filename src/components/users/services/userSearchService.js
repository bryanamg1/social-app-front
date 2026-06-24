import apiClient from "../../../services/apiClient";
import { API_ENDPOINTS, API_QUERY_PARAMS } from "../../../constants";
import { normalizeUserProfile } from "../utils/userProfileAdapter";

export const searchUsers = async (query) => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.SEARCH_USERS, {
        params: {
            [API_QUERY_PARAMS.SEARCH.QUERY]: query,
        },
    });
    const users = Array.isArray(response?.data?.users) ? response.data.users : [];

    return {
        count: Number(response?.data?.count) || users.length,
        users: users.map(normalizeUserProfile),
    };
};

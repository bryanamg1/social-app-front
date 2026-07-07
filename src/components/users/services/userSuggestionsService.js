import apiClient from "../../../services/apiClient";
import {
    API_ENDPOINTS,
    API_QUERY_PARAMS,
    HTTP_TIMEOUTS,
} from "../../../constants";
import { normalizeUserProfile } from "../utils/userProfileAdapter";

export const getUserSuggestions = async ({ limit } = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.FOLLOWS.SUGGESTIONS, {
        params: {
            [API_QUERY_PARAMS.SEARCH.LIMIT]: limit,
        },
        timeout: HTTP_TIMEOUTS.USER_SUGGESTIONS_MS,
    });

    const users = Array.isArray(response?.data?.data) ? response.data.data : [];

    return {
        users: users.map(normalizeUserProfile),
    };
};

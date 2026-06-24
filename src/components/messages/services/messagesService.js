import apiClient from "../../../services/apiClient";
import {
    API_BODY_FIELDS,
    API_ENDPOINTS,
    API_QUERY_PARAMS,
    MESSAGES_API_DEFAULTS,
} from "../../../constants";
import {
    getConversationIdFromResponse,
    getConversationsFromResponse,
    getMessagesFromResponse,
} from "../utils/messagesAdapter";

export const createOrGetConversation = async ({ userId, otherUserId }) => {
    const response = await apiClient.post(API_ENDPOINTS.CONVERSATIONS.CREATE_OR_GET, {
        [API_BODY_FIELDS.CONVERSATIONS.USER_ID]: userId,
        [API_BODY_FIELDS.CONVERSATIONS.OTHER_USER_ID]: otherUserId,
    });

    return getConversationIdFromResponse(response);
};

export const getMyConversations = async (userId) => {
    const response = await apiClient.get(API_ENDPOINTS.CONVERSATIONS.LIST, {
        params: {
            [API_QUERY_PARAMS.CONVERSATIONS.USER_ID]: userId,
        },
    });

    return getConversationsFromResponse(response);
};

export const getConversationMessages = async ({
    conversationId,
    userId,
    limit = MESSAGES_API_DEFAULTS.PAGE_SIZE,
    offset = MESSAGES_API_DEFAULTS.INITIAL_OFFSET,
}) => {
    const response = await apiClient.get(
        API_ENDPOINTS.CONVERSATIONS.MESSAGES(conversationId),
        {
            params: {
                [API_QUERY_PARAMS.CONVERSATIONS.USER_ID]: userId,
                [API_QUERY_PARAMS.CONVERSATIONS.LIMIT]: limit,
                [API_QUERY_PARAMS.CONVERSATIONS.OFFSET]: offset,
            },
        }
    );

    return getMessagesFromResponse(response);
};

import { normalizeUserProfile } from "../../users/utils/userProfileAdapter";

export const normalizeConversation = (conversation) => {
    if (!conversation) return null;

    return {
        id: conversation.conversation_id ?? conversation.id ?? null,
        conversation_id: conversation.conversation_id ?? conversation.id ?? null,
        created_at: conversation.created_at ?? null,
        modified_at: conversation.modified_at ?? null,
        last_message: conversation.last_message ?? "",
        last_message_at: conversation.last_message_at ?? conversation.created_at ?? null,
        participant_user_id: conversation.participant_user_id ?? null,
        participant_user_name: conversation.participant_user_name ?? null,
        participant_email: conversation.participant_email ?? "",
        participant_avatar_url: conversation.participant_avatar_url ?? "",
    };
};

export const normalizeMessage = (message) => {
    if (!message) return null;

    return {
        id: message.message_id ?? message.id ?? null,
        message_id: message.message_id ?? message.id ?? null,
        conversation_id: message.conversation_id ?? null,
        sender_id: message.sender_id ?? message.senderId ?? null,
        content: message.content ?? "",
        created_at: message.created_at ?? null,
        modified_at: message.modified_at ?? null,
    };
};

export const getConversationsFromResponse = (response) => {
    const conversations = response?.data?.data?.conversations;

    return Array.isArray(conversations)
        ? conversations.map(normalizeConversation).filter(Boolean)
        : [];
};

export const getMessagesFromResponse = (response) => {
    const messages = response?.data?.data?.messages;

    return Array.isArray(messages)
        ? messages.map(normalizeMessage).filter(Boolean)
        : [];
};

export const getConversationIdFromResponse = (response) => {
    return response?.data?.data?.conversationId ?? null;
};

export const normalizeConversationTarget = (user) => {
    return normalizeUserProfile(user);
};

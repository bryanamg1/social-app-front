import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    MESSAGES_ERRORS,
    MESSAGES_QUERY_PARAMS,
    MESSAGES_TEXTS,
    ROUTES,
    UI_FEEDBACK,
} from "../../../constants";
import { createOrGetConversation } from "../services/messagesService";
import { normalizeConversationTarget } from "../utils/messagesAdapter";

export const useConversationLauncher = ({ currentUserId, targetUser }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const targetUserId = targetUser?.user_id ?? targetUser?.id;
    const isOwnProfile =
        currentUserId &&
        targetUserId &&
        String(currentUserId) === String(targetUserId);
    const isVisible = Boolean(currentUserId && targetUserId && !isOwnProfile);

    const handleStartConversation = async () => {
        if (!isVisible || loading) return;

        try {
            setLoading(true);
            setError(null);

            const conversationId = await createOrGetConversation({
                otherUserId: targetUserId,
            });

            navigate(
                `${ROUTES.MESSAGES}?${MESSAGES_QUERY_PARAMS.CONVERSATION_ID}=${conversationId}`,
                {
                    state: {
                        conversationId,
                        targetUser: normalizeConversationTarget(targetUser),
                        source: MESSAGES_TEXTS.RESULTS_FROM_PROFILE,
                    },
                }
            );
        } catch {
            setError(MESSAGES_ERRORS.CREATE_CONVERSATION);
            window.setTimeout(() => {
                setError(null);
            }, UI_FEEDBACK.AUTO_HIDE_MS);
        } finally {
            setLoading(false);
        }
    };

    return {
        isVisible,
        label: loading
            ? MESSAGES_TEXTS.STARTING_BUTTON
            : MESSAGES_TEXTS.START_BUTTON,
        loading,
        error,
        onClick: handleStartConversation,
    };
};

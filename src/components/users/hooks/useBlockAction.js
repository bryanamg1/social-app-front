import { useCallback, useEffect, useMemo, useState } from "react";

import { PROFILE_TEXTS, UI_FEEDBACK } from "../../../constants";
import { blockUser, unblockUser } from "../services/userFollowService";

export const useBlockAction = ({
    targetUserId,
    currentUserId,
    relationshipStatus,
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const isOwnProfile = useMemo(() => {
        return Boolean(
            targetUserId &&
            currentUserId &&
            String(targetUserId) === String(currentUserId)
        );
    }, [targetUserId, currentUserId]);
    const isVisible = Boolean(targetUserId && currentUserId && !isOwnProfile);
    const isBlocked = Boolean(relationshipStatus?.status?.isBlocked);
    const isBlockedByUser = Boolean(relationshipStatus?.status?.isBlockedByUser);

    useEffect(() => {
        if (!message && !error) return undefined;

        const timeoutId = window.setTimeout(() => {
            setMessage(null);
            setError(null);
        }, UI_FEEDBACK.AUTO_HIDE_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [error, message]);

    const handleToggleBlock = useCallback(async () => {
        if (!isVisible || loading || isBlockedByUser) {
            return;
        }

        if (!isBlocked && !window.confirm(PROFILE_TEXTS.BLOCK.CONFIRM_BLOCK)) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setMessage(null);

            if (isBlocked) {
                await unblockUser(targetUserId);
                relationshipStatus?.setStatus((currentStatus) => ({
                    ...(currentStatus || {}),
                    isBlocked: false,
                }));
                setMessage(PROFILE_TEXTS.BLOCK.UNBLOCK_SUCCESS);
                return;
            }

            await blockUser(targetUserId);
            relationshipStatus?.setStatus((currentStatus) => ({
                ...(currentStatus || {}),
                isFollowing: false,
                isBlocked: true,
            }));
            setMessage(PROFILE_TEXTS.BLOCK.BLOCK_SUCCESS);
        } catch {
            setError(PROFILE_TEXTS.ERRORS.BLOCK_ACTION);
        } finally {
            setLoading(false);
        }
    }, [
        isBlocked,
        isBlockedByUser,
        isVisible,
        loading,
        relationshipStatus,
        targetUserId,
    ]);

    return {
        isVisible: isVisible && !isBlockedByUser,
        isBlocked,
        isBlockedByUser,
        loading,
        error,
        message,
        onToggle: handleToggleBlock,
    };
};

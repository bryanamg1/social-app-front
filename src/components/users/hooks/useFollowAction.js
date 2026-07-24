import { useCallback, useEffect, useMemo, useState } from "react";

import { API_ERROR_CODES, PROFILE_TEXTS, UI_FEEDBACK } from "../../../constants";
import { followUser, unfollowUser } from "../services/userFollowService";

const getApiErrorCode = (error) => {
    return error?.response?.data?.code;
};

export const useFollowAction = ({
    targetUserId,
    currentUserId,
    relationshipStatus,
}) => {
    const isOwnProfile = useMemo(() => {
        return Boolean(
            targetUserId &&
            currentUserId &&
            String(targetUserId) === String(currentUserId)
        );
    }, [targetUserId, currentUserId]);
    const isBlockedRelationship = Boolean(
        relationshipStatus?.status?.isBlocked ||
            relationshipStatus?.status?.isBlockedByUser
    );
    const isVisible = Boolean(
        targetUserId &&
            currentUserId &&
            !isOwnProfile &&
            !isBlockedRelationship
    );
    const [loadingAction, setLoadingAction] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const isFollowing = Boolean(relationshipStatus?.status?.isFollowing);
    const loadingStatus = Boolean(relationshipStatus?.loading);

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

    const handleToggleFollow = useCallback(async () => {
        if (!isVisible || loadingStatus || loadingAction) return;

        try {
            setLoadingAction(true);
            setError(null);
            setMessage(null);

            if (isFollowing) {
                await unfollowUser(targetUserId);
                relationshipStatus?.setStatus((currentStatus) => ({
                    ...(currentStatus || {}),
                    isFollowing: false,
                }));
                setMessage(PROFILE_TEXTS.FOLLOW.UNFOLLOW_SUCCESS);
                return;
            }

            await followUser(targetUserId);
            relationshipStatus?.setStatus((currentStatus) => ({
                ...(currentStatus || {}),
                isFollowing: true,
            }));
            setMessage(PROFILE_TEXTS.FOLLOW.FOLLOW_SUCCESS);
        } catch (actionError) {
            const errorCode = getApiErrorCode(actionError);

            if (errorCode === API_ERROR_CODES.FOLLOW_USER) {
                relationshipStatus?.setStatus((currentStatus) => ({
                    ...(currentStatus || {}),
                    isFollowing: true,
                }));
                setMessage(PROFILE_TEXTS.FOLLOW.ALREADY_FOLLOWING);
                return;
            }

            if (errorCode === API_ERROR_CODES.NOT_FOLLOWING) {
                relationshipStatus?.setStatus((currentStatus) => ({
                    ...(currentStatus || {}),
                    isFollowing: false,
                }));
                setMessage(PROFILE_TEXTS.FOLLOW.NOT_FOLLOWING);
                return;
            }

            setError(PROFILE_TEXTS.ERRORS.FOLLOW_ACTION);
        } finally {
            setLoadingAction(false);
        }
    }, [
        isFollowing,
        isVisible,
        loadingAction,
        loadingStatus,
        relationshipStatus,
        targetUserId,
    ]);

    return {
        isVisible,
        isOwnProfile,
        isFollowing,
        loading: loadingStatus || loadingAction,
        loadingStatus,
        error:
            error ||
            (relationshipStatus?.error
                ? PROFILE_TEXTS.ERRORS.FOLLOW_STATUS
                : null),
        message,
        onToggle: handleToggleFollow,
    };
};

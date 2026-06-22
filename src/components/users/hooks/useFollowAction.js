import { useCallback, useEffect, useMemo, useState } from "react";

import {
    API_ERROR_CODES,
    PROFILE_TEXTS,
    UI_FEEDBACK,
} from "../../../constants";
import {
    followUser,
    getFollowStatus,
    unfollowUser,
} from "../services/userFollowService";

const getApiErrorCode = (error) => {
    return error?.response?.data?.code;
};

export const useFollowAction = ({ targetUserId, currentUserId }) => {
    const isOwnProfile = useMemo(() => {
        return Boolean(
            targetUserId &&
            currentUserId &&
            String(targetUserId) === String(currentUserId)
        );
    }, [targetUserId, currentUserId]);
    const isVisible = Boolean(targetUserId && currentUserId && !isOwnProfile);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

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

    useEffect(() => {
        if (!isVisible) return;

        let isActive = true;

        const loadFollowStatus = async () => {
            try {
                setLoadingStatus(true);
                setError(null);
                setMessage(null);

                const nextIsFollowing = await getFollowStatus(targetUserId);

                if (!isActive) return;

                setIsFollowing(nextIsFollowing);
            } catch (statusError) {
                if (!isActive) return;

                const errorCode = getApiErrorCode(statusError);

                if (errorCode === API_ERROR_CODES.FOLLOW_STATUS_READ_FAILED) {
                    setError(PROFILE_TEXTS.ERRORS.FOLLOW_STATUS);
                    return;
                }

                setError(PROFILE_TEXTS.ERRORS.FOLLOW_STATUS);
            } finally {
                if (isActive) {
                    setLoadingStatus(false);
                }
            }
        };

        loadFollowStatus();

        return () => {
            isActive = false;
        };
    }, [isVisible, targetUserId]);

    const handleToggleFollow = useCallback(async () => {
        if (!isVisible || loadingStatus || loadingAction) return;

        try {
            setLoadingAction(true);
            setError(null);
            setMessage(null);

            if (isFollowing) {
                await unfollowUser(targetUserId);
                setIsFollowing(false);
                setMessage(PROFILE_TEXTS.FOLLOW.UNFOLLOW_SUCCESS);
                return;
            }

            await followUser(targetUserId);
            setIsFollowing(true);
            setMessage(PROFILE_TEXTS.FOLLOW.FOLLOW_SUCCESS);
        } catch (actionError) {
            const errorCode = getApiErrorCode(actionError);

            if (errorCode === API_ERROR_CODES.FOLLOW_USER) {
                setIsFollowing(true);
                setMessage(PROFILE_TEXTS.FOLLOW.ALREADY_FOLLOWING);
                return;
            }

            if (errorCode === API_ERROR_CODES.NOT_FOLLOWING) {
                setIsFollowing(false);
                setMessage(PROFILE_TEXTS.FOLLOW.NOT_FOLLOWING);
                return;
            }

            setError(PROFILE_TEXTS.ERRORS.FOLLOW_ACTION);
        } finally {
            setLoadingAction(false);
        }
    }, [isFollowing, isVisible, loadingAction, loadingStatus, targetUserId]);

    return {
        isVisible,
        isOwnProfile,
        isFollowing,
        loading: loadingStatus || loadingAction,
        loadingStatus,
        error,
        message,
        onToggle: handleToggleFollow,
    };
};

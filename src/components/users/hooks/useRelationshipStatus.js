import { useCallback, useEffect, useMemo, useState } from "react";

import {
    API_ERROR_CODES,
    PROFILE_TEXTS,
    UI_FEEDBACK,
} from "../../../constants";
import { getRelationshipStatus } from "../services/userFollowService";

const INITIAL_STATUS = {
    isFollowing: false,
    isBlocked: false,
    isBlockedByUser: false,
};

const getApiErrorCode = (error) => {
    return error?.response?.data?.code;
};

export const useRelationshipStatus = ({ targetUserId, currentUserId }) => {
    const isOwnProfile = useMemo(() => {
        return Boolean(
            targetUserId &&
            currentUserId &&
            String(targetUserId) === String(currentUserId)
        );
    }, [targetUserId, currentUserId]);
    const isVisible = Boolean(targetUserId && currentUserId && !isOwnProfile);
    const [status, setStatus] = useState(INITIAL_STATUS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refreshStatus = useCallback(async () => {
        if (!isVisible) {
            setStatus(INITIAL_STATUS);
            setError(null);
            return INITIAL_STATUS;
        }

        try {
            setLoading(true);
            setError(null);

            const nextStatus = await getRelationshipStatus(targetUserId);

            setStatus(nextStatus);
            return nextStatus;
        } catch (statusError) {
            const errorCode = getApiErrorCode(statusError);

            if (
                errorCode === API_ERROR_CODES.FOLLOW_STATUS_READ_FAILED ||
                errorCode === API_ERROR_CODES.BLOCK_RELATIONSHIP_FORBIDDEN
            ) {
                setError(PROFILE_TEXTS.ERRORS.RELATIONSHIP_STATUS);
            } else {
                setError(PROFILE_TEXTS.ERRORS.RELATIONSHIP_STATUS);
            }

            return INITIAL_STATUS;
        } finally {
            setLoading(false);
        }
    }, [isVisible, targetUserId]);

    useEffect(() => {
        if (!isVisible) {
            return undefined;
        }

        let active = true;

        const load = async () => {
            const nextStatus = await refreshStatus();

            if (!active) {
                return;
            }

            setStatus(nextStatus);
        };

        load();

        return () => {
            active = false;
        };
    }, [isVisible, refreshStatus]);

    useEffect(() => {
        if (!error) return undefined;

        const timeoutId = window.setTimeout(() => {
            setError(null);
        }, UI_FEEDBACK.AUTO_HIDE_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [error]);

    return {
        isVisible,
        isOwnProfile,
        status: isVisible ? status : INITIAL_STATUS,
        loading,
        error: isVisible ? error : null,
        refreshStatus,
        setStatus,
    };
};

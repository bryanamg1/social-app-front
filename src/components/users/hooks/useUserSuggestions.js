import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
    HTTP_STATUS,
    ROUTES,
    USER_SUGGESTIONS_TEXTS,
} from "../../../constants";
import { followUser } from "../services/userFollowService";
import { getUserSuggestions } from "../services/userSuggestionsService";
import {
    getUserBio,
    getUserId,
} from "../utils/userProfileAdapter";

const DEFAULT_SUGGESTIONS_LIMIT = 4;
const SUGGESTIONS_TIMEOUT_CODE = "ECONNABORTED";

const getProfilePath = (userId, currentUserId) => {
    if (String(userId) === String(currentUserId)) {
        return ROUTES.PROFILE;
    }

    return ROUTES.USER_PROFILE(userId);
};

export const useUserSuggestions = ({ currentUserId }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [followingUserId, setFollowingUserId] = useState(null);
    const [error, setError] = useState(null);
    const requestIdRef = useRef(0);
    const inFlightRef = useRef(false);

    const getSuggestionsErrorText = useCallback((requestError) => {
        const status = requestError?.response?.status;
        const errorCode = requestError?.code;

        if (status === HTTP_STATUS.NOT_FOUND) {
            return USER_SUGGESTIONS_TEXTS.UNAVAILABLE;
        }

        if (status === HTTP_STATUS.UNAUTHORIZED) {
            return USER_SUGGESTIONS_TEXTS.AUTH_REQUIRED;
        }

        if (errorCode === SUGGESTIONS_TIMEOUT_CODE) {
            return USER_SUGGESTIONS_TEXTS.TIMEOUT;
        }

        return USER_SUGGESTIONS_TEXTS.ERROR;
    }, []);

    const loadSuggestions = useCallback(
        async ({ silent = false } = {}) => {
            if (!currentUserId) return [];
            if (inFlightRef.current) return [];

            const requestId = requestIdRef.current + 1;
            requestIdRef.current = requestId;
            inFlightRef.current = true;

            if (silent) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError(null);

            try {
                const response = await getUserSuggestions({
                    limit: DEFAULT_SUGGESTIONS_LIMIT,
                });

                if (requestIdRef.current !== requestId) {
                    return [];
                }

                setSuggestions(response.users);
                return response.users;
            } catch (requestError) {
                if (requestIdRef.current !== requestId) {
                    return [];
                }

                setSuggestions([]);
                setError(getSuggestionsErrorText(requestError));
                return [];
            } finally {
                if (requestIdRef.current === requestId) {
                    setLoading(false);
                    setRefreshing(false);
                }

                inFlightRef.current = false;
            }
        },
        [currentUserId, getSuggestionsErrorText]
    );

    useEffect(() => {
        if (!currentUserId) return;

        const timeoutId = window.setTimeout(() => {
            void loadSuggestions();
        }, 0);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [currentUserId, loadSuggestions]);

    const refreshSuggestions = useCallback(async () => {
        await loadSuggestions({ silent: suggestions.length > 0 });
    }, [loadSuggestions, suggestions.length]);

    const handleFollowSuggestion = useCallback(
        async (targetUserId) => {
            if (!targetUserId || followingUserId) return;

            try {
                setFollowingUserId(String(targetUserId));
                setError(null);

                await followUser(targetUserId);
                await loadSuggestions({ silent: true });
            } catch {
                setError(USER_SUGGESTIONS_TEXTS.FOLLOW_ACTION_ERROR);
            } finally {
                setFollowingUserId(null);
            }
        },
        [followingUserId, loadSuggestions]
    );

    const mappedSuggestions = useMemo(() => {
        return suggestions.map((user) => {
            const userId = getUserId(user);
            const bio = getUserBio(user)?.trim();

            return {
                ...user,
                id: userId,
                bio: bio || USER_SUGGESTIONS_TEXTS.BIO_FALLBACK,
                profilePath: getProfilePath(userId, currentUserId),
                isFollowingAction: String(followingUserId) === String(userId),
            };
        });
    }, [currentUserId, followingUserId, suggestions]);

    return {
        suggestions: mappedSuggestions,
        loading,
        refreshing,
        error,
        isEmpty: !loading && !error && mappedSuggestions.length === 0,
        canRetry: Boolean(error),
        onRefresh: refreshSuggestions,
        onFollow: handleFollowSuggestion,
    };
};

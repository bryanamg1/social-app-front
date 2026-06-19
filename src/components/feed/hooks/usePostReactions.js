import { useCallback, useEffect, useMemo, useState } from "react";

import { FEED_KEYS, FEED_TEXTS } from "../../../constants";
import {
    getMyPostReaction,
    getPostReactions,
    togglePostReaction,
} from "../services/feedService";
import { getPostCreatedAt, getPostId } from "../utils/postAdapter";

const EMPTY_REACTION_STATE = {
    counts: {},
    total: 0,
    activeReaction: null,
    loading: false,
    toggling: false,
    error: null,
    loaded: false,
};

const getPostKey = ({ post, index }) => {
    const postId = getPostId(post);
    const createdAt = getPostCreatedAt(post);

    return postId
        ? `${FEED_KEYS.POST_PREFIX}-${postId}`
        : `${FEED_KEYS.POST_FALLBACK_PREFIX}-${index}-${createdAt || FEED_KEYS.NO_DATE}`;
};

export const usePostReactions = ({ posts = [], currentUserId }) => {
    const [reactionsByPostId, setReactionsByPostId] = useState({});

    const postDescriptors = useMemo(
        () =>
        posts.map((post, index) => ({
            postKey: getPostKey({ post, index }),
            postId: getPostId(post),
        })),
        [posts]
    );

    const setPostReactionState = useCallback((postKey, nextState) => {
        setReactionsByPostId((currentReactions) => ({
        ...currentReactions,
        [postKey]: {
            ...EMPTY_REACTION_STATE,
            ...currentReactions[postKey],
            ...nextState,
        },
        }));
    }, []);

    const getReactionState = useCallback(
        (postKey) => reactionsByPostId[postKey] ?? EMPTY_REACTION_STATE,
        [reactionsByPostId]
    );

    const loadReactionState = useCallback(
        async ({ postKey, postId }) => {
        if (!postId) return;

        try {
            setPostReactionState(postKey, {
            loading: true,
            error: null,
            });

            const summary = await getPostReactions(postId);
            const activeReaction = currentUserId
            ? await getMyPostReaction({ userId: currentUserId, postId })
            : null;

            setPostReactionState(postKey, {
            ...summary,
            activeReaction,
            loading: false,
            loaded: true,
            });
        } catch {
            setPostReactionState(postKey, {
            loading: false,
            loaded: true,
            error: FEED_TEXTS.ERRORS.LOAD_REACTIONS,
            });
        }
        },
        [currentUserId, setPostReactionState]
    );

    useEffect(() => {
        postDescriptors.forEach((postDescriptor) => {
        loadReactionState(postDescriptor);
        });
    }, [loadReactionState, postDescriptors]);

    const handleToggleReaction = useCallback(
        async ({ postKey, postId, reactionType }) => {
        if (!currentUserId) {
            setPostReactionState(postKey, {
            error: FEED_TEXTS.ERRORS.REACTION_AUTH_REQUIRED,
            });
            return;
        }

        if (!postId || !reactionType) {
            setPostReactionState(postKey, {
            error: FEED_TEXTS.ERRORS.TOGGLE_REACTION,
            });
            return;
        }

        try {
            setPostReactionState(postKey, {
            toggling: true,
            error: null,
            });

            const result = await togglePostReaction({
            userId: currentUserId,
            postId,
            reactionType,
            });
            const summary = await getPostReactions(postId);

            setPostReactionState(postKey, {
            ...summary,
            activeReaction: result?.data?.reaction ?? null,
            toggling: false,
            loaded: true,
            });
        } catch {
            setPostReactionState(postKey, {
            toggling: false,
            error: FEED_TEXTS.ERRORS.TOGGLE_REACTION,
            });
        }
        },
        [currentUserId, setPostReactionState]
    );

    return {
        getReactionState,
        handleToggleReaction,
    };
};

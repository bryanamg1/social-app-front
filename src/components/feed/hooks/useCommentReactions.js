import { useCallback, useEffect, useMemo, useState } from "react";

import { FEED_KEYS, FEED_TEXTS } from "../../../constants";
import {
    getCommentReactions,
    getMyCommentReaction,
    toggleCommentReaction,
} from "../services/feedService";
import { getCommentCreatedAt, getCommentId } from "../utils/postAdapter";

const EMPTY_REACTION_STATE = {
    counts: {},
    total: 0,
    activeReaction: null,
    loading: false,
    toggling: false,
    error: null,
    loaded: false,
};

export const getCommentReactionKey = ({ comment, index }) => {
    const commentId = getCommentId(comment);
    const createdAt = getCommentCreatedAt(comment);

    return commentId
        ? `${FEED_KEYS.COMMENT_PREFIX}-${commentId}`
        : `${FEED_KEYS.COMMENT_FALLBACK_PREFIX}-${index}-${createdAt || FEED_KEYS.NO_DATE}`;
};

export const useCommentReactions = ({ comments = [], currentUserId }) => {
    const [reactionsByCommentId, setReactionsByCommentId] = useState({});

    const commentDescriptors = useMemo(
        () =>
            comments.map((comment, index) => ({
                commentKey: getCommentReactionKey({ comment, index }),
                commentId: getCommentId(comment),
            })),
        [comments]
    );

    const setCommentReactionState = useCallback((commentKey, nextState) => {
        setReactionsByCommentId((currentReactions) => ({
            ...currentReactions,
            [commentKey]: {
                ...EMPTY_REACTION_STATE,
                ...currentReactions[commentKey],
                ...nextState,
            },
        }));
    }, []);

    const getReactionState = useCallback(
        (commentKey) => reactionsByCommentId[commentKey] ?? EMPTY_REACTION_STATE,
        [reactionsByCommentId]
    );

    const loadReactionState = useCallback(
        async ({ commentKey, commentId }) => {
            if (!commentId) return;

            try {
                setCommentReactionState(commentKey, {
                    loading: true,
                    error: null,
                });

                const summary = await getCommentReactions(commentId);
                const activeReaction = currentUserId
                    ? await getMyCommentReaction({ commentId })
                    : null;

                setCommentReactionState(commentKey, {
                    ...summary,
                    activeReaction,
                    loading: false,
                    loaded: true,
                });
            } catch {
                setCommentReactionState(commentKey, {
                    loading: false,
                    loaded: true,
                    error: FEED_TEXTS.ERRORS.LOAD_REACTIONS,
                });
            }
        },
        [currentUserId, setCommentReactionState]
    );

    useEffect(() => {
        commentDescriptors.forEach((commentDescriptor) => {
            loadReactionState(commentDescriptor);
        });
    }, [commentDescriptors, loadReactionState]);

    const handleToggleReaction = useCallback(
        async ({ commentKey, commentId, reactionType }) => {
            if (!currentUserId) {
                setCommentReactionState(commentKey, {
                    error: FEED_TEXTS.ERRORS.REACTION_AUTH_REQUIRED,
                });
                return;
            }

            if (!commentId || !reactionType) {
                setCommentReactionState(commentKey, {
                    error: FEED_TEXTS.ERRORS.TOGGLE_REACTION,
                });
                return;
            }

            try {
                setCommentReactionState(commentKey, {
                    toggling: true,
                    error: null,
                });

                const result = await toggleCommentReaction({
                    commentId,
                    reactionType,
                });
                const summary = await getCommentReactions(commentId);

                setCommentReactionState(commentKey, {
                    ...summary,
                    activeReaction: result?.data?.reaction ?? null,
                    toggling: false,
                    loaded: true,
                });
            } catch {
                setCommentReactionState(commentKey, {
                    toggling: false,
                    error: FEED_TEXTS.ERRORS.TOGGLE_REACTION,
                });
            }
        },
        [currentUserId, setCommentReactionState]
    );

    return {
        getReactionState,
        handleToggleReaction,
    };
};

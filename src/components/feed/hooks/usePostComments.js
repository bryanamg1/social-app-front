import { useCallback, useState } from "react";

import { FEED_TEXTS } from "../../../constants";
import { getCommentId } from "../utils/postAdapter";
import { createComment, getCommentsByPostId } from "../services/feedService";

const getCurrentUserDisplayName = (user) => {
    return user?.name ?? user?.username ?? user?.email ?? "";
};

const hasCommentAuthorData = (comment) => {
    return Boolean(
        comment?.user_name ??
        comment?.userName ??
        comment?.user?.name ??
        comment?.user?.user_name ??
        comment?.user?.userName ??
        comment?.user?.username ??
        comment?.user?.email ??
        comment?.author?.name ??
        comment?.author?.user_name ??
        comment?.author?.userName ??
        comment?.author?.username ??
        comment?.author_name ??
        comment?.authorName ??
        comment?.username ??
        comment?.name ??
        comment?.email
    );
};

export const usePostComments = () => {
    const [expandedPostIds, setExpandedPostIds] = useState(() => new Set());
    const [commentsByPostId, setCommentsByPostId] = useState({});
    const [loadingPostIds, setLoadingPostIds] = useState(() => new Set());
    const [errorsByPostId, setErrorsByPostId] = useState({});
    const [commentDraftsByPostId, setCommentDraftsByPostId] = useState({});
    const [creatingPostIds, setCreatingPostIds] = useState(() => new Set());
    const [createErrorsByPostId, setCreateErrorsByPostId] = useState({});
    const [commentsApiUnavailable, setCommentsApiUnavailable] = useState(false);

    const isCommentsOpen = useCallback(
        (postKey) => expandedPostIds.has(String(postKey)),
        [expandedPostIds]
    );

    const getCommentsState = useCallback(
        (postKey) => {
        const normalizedPostKey = String(postKey);

        return {
            comments: commentsByPostId[normalizedPostKey] ?? [],
            loading: loadingPostIds.has(normalizedPostKey),
            error: errorsByPostId[normalizedPostKey] ?? null,
        };
        },
        [commentsByPostId, errorsByPostId, loadingPostIds]
    );

    const getCommentFormState = useCallback(
        (postKey) => {
        const normalizedPostKey = String(postKey);
        const value = commentDraftsByPostId[normalizedPostKey] ?? "";

        return {
            value,
            canSubmit: Boolean(value.trim()),
            creating: creatingPostIds.has(normalizedPostKey),
            error: createErrorsByPostId[normalizedPostKey] ?? null,
        };
        },
        [commentDraftsByPostId, createErrorsByPostId, creatingPostIds]
    );

    const setPostLoading = useCallback((postKey, loading) => {
        setLoadingPostIds((currentIds) => {
        const nextIds = new Set(currentIds);

        if (loading) {
            nextIds.add(postKey);
        } else {
            nextIds.delete(postKey);
        }

        return nextIds;
        });
    }, []);

    const setPostCreating = useCallback((postKey, creating) => {
        setCreatingPostIds((currentIds) => {
        const nextIds = new Set(currentIds);

        if (creating) {
            nextIds.add(postKey);
        } else {
            nextIds.delete(postKey);
        }

        return nextIds;
        });
    }, []);

    const handleCommentDraftChange = useCallback((postKey, value) => {
        const normalizedPostKey = String(postKey);

        setCommentDraftsByPostId((currentDrafts) => ({
        ...currentDrafts,
        [normalizedPostKey]: value,
        }));

        setCreateErrorsByPostId((currentErrors) => ({
        ...currentErrors,
        [normalizedPostKey]: null,
        }));
    }, []);

    const loadComments = useCallback(
        async ({ postKey, postId, fallbackComments = [], forceRequest = false }) => {
        const normalizedPostKey = String(postKey);

        if (!postId || (commentsApiUnavailable && !forceRequest)) {
            setCommentsByPostId((currentComments) => ({
            ...currentComments,
            [normalizedPostKey]: fallbackComments,
            }));
            return fallbackComments;
        }

        try {
            setPostLoading(normalizedPostKey, true);

            const comments = await getCommentsByPostId(postId);

            setCommentsByPostId((currentComments) => ({
            ...currentComments,
            [normalizedPostKey]: comments,
            }));
            setCommentsApiUnavailable(false);

            return comments;
        } catch (error) {
            const status = error?.response?.status;

            if (status >= 500) {
            setCommentsApiUnavailable(true);
            setCommentsByPostId((currentComments) => ({
                ...currentComments,
                [normalizedPostKey]: fallbackComments,
            }));
            return fallbackComments;
            }

            setErrorsByPostId((currentErrors) => ({
            ...currentErrors,
            [normalizedPostKey]: FEED_TEXTS.ERRORS.LOAD_COMMENTS,
            }));

            return [];
        } finally {
            setPostLoading(normalizedPostKey, false);
        }
        },
        [commentsApiUnavailable, setPostLoading]
    );

    const toggleComments = useCallback(
        async ({ postKey, postId, fallbackComments = [] }) => {
        const normalizedPostKey = String(postKey);
        const isOpen = expandedPostIds.has(normalizedPostKey);

        setExpandedPostIds((currentIds) => {
            const nextIds = new Set(currentIds);

            if (isOpen) {
            nextIds.delete(normalizedPostKey);
            } else {
            nextIds.add(normalizedPostKey);
            }

            return nextIds;
        });

        if (isOpen || commentsByPostId[normalizedPostKey]) return;

        setErrorsByPostId((currentErrors) => ({
            ...currentErrors,
            [normalizedPostKey]: null,
        }));

        await loadComments({ postKey: normalizedPostKey, postId, fallbackComments });
        },
        [commentsByPostId, expandedPostIds, loadComments]
    );

    const submitComment = useCallback(
        async ({ postKey, postId, userId, currentUser }) => {
        const normalizedPostKey = String(postKey);
        const commentText = (commentDraftsByPostId[normalizedPostKey] ?? "").trim();

        if (!userId) {
            setCreateErrorsByPostId((currentErrors) => ({
            ...currentErrors,
            [normalizedPostKey]: FEED_TEXTS.COMMENTS.AUTH_REQUIRED,
            }));
            return;
        }

        if (!commentText) {
            setCreateErrorsByPostId((currentErrors) => ({
            ...currentErrors,
            [normalizedPostKey]: FEED_TEXTS.COMMENTS.EMPTY_VALIDATION,
            }));
            return;
        }

        if (!postId) {
            setCreateErrorsByPostId((currentErrors) => ({
            ...currentErrors,
            [normalizedPostKey]: FEED_TEXTS.ERRORS.ADD_COMMENT,
            }));
            return;
        }

        try {
            setPostCreating(normalizedPostKey, true);
            setCreateErrorsByPostId((currentErrors) => ({
            ...currentErrors,
            [normalizedPostKey]: null,
            }));

            const createdComment = await createComment({ userId, postId, commentText });
            const comments = await loadComments({
            postKey: normalizedPostKey,
            postId,
            forceRequest: true,
            });

            const createdCommentId = createdComment?.commentId ?? createdComment?.data?.commentId;
            const currentUserName = getCurrentUserDisplayName(currentUser);

            if (createdCommentId && currentUserName) {
            setCommentsByPostId((currentComments) => {
                const nextComments = (currentComments[normalizedPostKey] ?? comments).map(
                (comment) => {
                    if (String(getCommentId(comment)) !== String(createdCommentId)) {
                    return comment;
                    }

                    if (hasCommentAuthorData(comment)) {
                    return comment;
                    }

                    return {
                    ...comment,
                    authorName: currentUserName,
                    };
                }
                );

                return {
                ...currentComments,
                [normalizedPostKey]: nextComments,
                };
            });
            }

            setCommentDraftsByPostId((currentDrafts) => ({
            ...currentDrafts,
            [normalizedPostKey]: "",
            }));
        } catch {
            setCreateErrorsByPostId((currentErrors) => ({
            ...currentErrors,
            [normalizedPostKey]: FEED_TEXTS.ERRORS.ADD_COMMENT,
            }));
        } finally {
            setPostCreating(normalizedPostKey, false);
        }
        },
        [commentDraftsByPostId, loadComments, setPostCreating]
    );

    return {
        isCommentsOpen,
        getCommentsState,
        getCommentFormState,
        handleCommentDraftChange,
        submitComment,
        toggleComments,
    };
};

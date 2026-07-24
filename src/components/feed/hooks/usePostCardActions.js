import { useCallback, useState } from "react";

import { FEED_TEXTS } from "../../../constants";
import {
    getPostContent,
    getPostId,
    getPostPinnedState,
    getPostType,
} from "../utils/postAdapter";

const createPostDraft = (post) => ({
    content: getPostContent(post),
    postType: getPostType(post),
});

const createEmptyState = () => ({
    content: "",
    postType: "",
});

export const usePostCardActions = ({
    isSavedPost,
    isSavingPost,
    onTogglePinnedPost,
    onToggleSavedPost,
    onUpdatePost,
}) => {
    const [editingPostId, setEditingPostId] = useState(null);
    const [draftByPostId, setDraftByPostId] = useState({});
    const [updatingPostId, setUpdatingPostId] = useState(null);
    const [pinningPostIds, setPinningPostIds] = useState(() => new Set());
    const [errorsByPostId, setErrorsByPostId] = useState({});

    const setPostPinning = useCallback((postId, pinning) => {
        const normalizedPostId = String(postId);

        setPinningPostIds((currentIds) => {
            const nextIds = new Set(currentIds);

            if (pinning) {
                nextIds.add(normalizedPostId);
            } else {
                nextIds.delete(normalizedPostId);
            }

            return nextIds;
        });
    }, []);

    const clearPostError = useCallback((postId) => {
        const normalizedPostId = String(postId);

        setErrorsByPostId((currentErrors) => ({
            ...currentErrors,
            [normalizedPostId]: null,
        }));
    }, []);

    const startEditingPost = useCallback((post) => {
        const postId = getPostId(post);
        const normalizedPostId = String(postId);

        setEditingPostId(normalizedPostId);
        setDraftByPostId((currentDrafts) => ({
            ...currentDrafts,
            [normalizedPostId]: createPostDraft(post),
        }));
        clearPostError(postId);
    }, [clearPostError]);

    const cancelEditingPost = useCallback((postId) => {
        const normalizedPostId = String(postId);

        setEditingPostId((currentEditingPostId) =>
            currentEditingPostId === normalizedPostId ? null : currentEditingPostId
        );
        clearPostError(postId);
    }, [clearPostError]);

    const handlePostDraftChange = useCallback((postId, field, value) => {
        const normalizedPostId = String(postId);

        setDraftByPostId((currentDrafts) => ({
            ...currentDrafts,
            [normalizedPostId]: {
                ...(currentDrafts[normalizedPostId] ?? createEmptyState()),
                [field]: value,
            },
        }));
        clearPostError(postId);
    }, [clearPostError]);

    const submitPostEdit = useCallback(async (post) => {
        const postId = getPostId(post);
        const normalizedPostId = String(postId);
        const draft = draftByPostId[normalizedPostId] ?? createPostDraft(post);
        const nextContent = `${draft.content ?? ""}`.trim();

        if (!nextContent) {
            setErrorsByPostId((currentErrors) => ({
                ...currentErrors,
                [normalizedPostId]: FEED_TEXTS.POSTS.EDIT_EMPTY_VALIDATION,
            }));
            return;
        }

        try {
            setUpdatingPostId(normalizedPostId);
            clearPostError(postId);
            await onUpdatePost(postId, {
                content: nextContent,
                postType: draft.postType,
            });
            setEditingPostId(null);
        } catch {
            setErrorsByPostId((currentErrors) => ({
                ...currentErrors,
                [normalizedPostId]: FEED_TEXTS.ERRORS.UPDATE_POST,
            }));
        } finally {
            setUpdatingPostId(null);
        }
    }, [clearPostError, draftByPostId, onUpdatePost]);

    const handleTogglePinnedPost = useCallback(async (post) => {
        const postId = getPostId(post);
        const nextPinnedState = !getPostPinnedState(post);
        const normalizedPostId = String(postId);

        try {
            setPostPinning(postId, true);
            clearPostError(postId);
            await onTogglePinnedPost(postId, nextPinnedState);
        } catch {
            setErrorsByPostId((currentErrors) => ({
                ...currentErrors,
                [normalizedPostId]: FEED_TEXTS.ERRORS.PIN_POST,
            }));
        } finally {
            setPostPinning(postId, false);
        }
    }, [clearPostError, onTogglePinnedPost, setPostPinning]);

    const handleToggleSavedPost = useCallback(async (postId) => {
        const normalizedPostId = String(postId);

        try {
            clearPostError(postId);
            await onToggleSavedPost(postId);
        } catch {
            setErrorsByPostId((currentErrors) => ({
                ...currentErrors,
                [normalizedPostId]: FEED_TEXTS.ERRORS.SAVE_POST,
            }));
        }
    }, [clearPostError, onToggleSavedPost]);

    const getPostActionState = useCallback((post) => {
        const postId = getPostId(post);
        const normalizedPostId = String(postId);

        return {
            isEditing: editingPostId === normalizedPostId,
            draft: draftByPostId[normalizedPostId] ?? createPostDraft(post),
            updating: updatingPostId === normalizedPostId,
            pinning: pinningPostIds.has(normalizedPostId),
            saving: isSavingPost(postId),
            isSaved: isSavedPost(postId),
            error: errorsByPostId[normalizedPostId] ?? null,
        };
    }, [draftByPostId, editingPostId, errorsByPostId, isSavedPost, isSavingPost, pinningPostIds, updatingPostId]);

    return {
        getPostActionState,
        startEditingPost,
        cancelEditingPost,
        handlePostDraftChange,
        submitPostEdit,
        handleTogglePinnedPost,
        handleToggleSavedPost,
    };
};

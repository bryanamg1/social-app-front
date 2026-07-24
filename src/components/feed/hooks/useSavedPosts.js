import { useCallback, useEffect, useMemo, useState } from "react";

import { HTTP_STATUS } from "../../../constants";
import {
    getSavedPostIds,
    savePostById,
    unsavePostById,
} from "../services/feedService";

const createSavedIdsSet = (postIds = []) => {
    return new Set(postIds.map((postId) => String(postId)).filter(Boolean));
};

export const useSavedPosts = ({ currentUserId }) => {
    const [savedPostIds, setSavedPostIds] = useState(() => new Set());
    const [loadingSavedPosts, setLoadingSavedPosts] = useState(false);
    const [savingPostIds, setSavingPostIds] = useState(() => new Set());

    const setPostSaving = useCallback((postId, saving) => {
        const normalizedPostId = String(postId);

        setSavingPostIds((currentIds) => {
            const nextIds = new Set(currentIds);

            if (saving) {
                nextIds.add(normalizedPostId);
            } else {
                nextIds.delete(normalizedPostId);
            }

            return nextIds;
        });
    }, []);

    const loadSavedPosts = useCallback(async () => {
        if (!currentUserId) {
            setSavedPostIds(new Set());
            return;
        }

        try {
            setLoadingSavedPosts(true);
            const nextSavedPostIds = await getSavedPostIds();
            setSavedPostIds(createSavedIdsSet(nextSavedPostIds));
        } catch (error) {
            if (error?.response?.status === HTTP_STATUS.NOT_FOUND) {
                setSavedPostIds(new Set());
                return;
            }

            throw error;
        } finally {
            setLoadingSavedPosts(false);
        }
    }, [currentUserId]);

    const isSavedPost = useCallback(
        (postId) => savedPostIds.has(String(postId)),
        [savedPostIds]
    );

    const toggleSavedPost = useCallback(
        async (postId) => {
            const normalizedPostId = String(postId);
            const currentlySaved = savedPostIds.has(normalizedPostId);

            setPostSaving(postId, true);

            try {
                if (currentlySaved) {
                    await unsavePostById(postId);
                } else {
                    await savePostById(postId);
                }

                setSavedPostIds((currentIds) => {
                    const nextIds = new Set(currentIds);

                    if (currentlySaved) {
                        nextIds.delete(normalizedPostId);
                    } else {
                        nextIds.add(normalizedPostId);
                    }

                    return nextIds;
                });

                return !currentlySaved;
            } finally {
                setPostSaving(postId, false);
            }
        },
        [savedPostIds, setPostSaving]
    );

    const removeSavedPostId = useCallback((postId) => {
        const normalizedPostId = String(postId);

        setSavedPostIds((currentIds) => {
            const nextIds = new Set(currentIds);
            nextIds.delete(normalizedPostId);
            return nextIds;
        });
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadSavedPosts().catch(() => {
            setSavedPostIds(new Set());
        });
    }, [loadSavedPosts]);

    const savedPostIdsList = useMemo(() => {
        return Array.from(savedPostIds);
    }, [savedPostIds]);

    return {
        savedPostIds,
        savedPostIdsList,
        loadingSavedPosts,
        savingPostIds,
        isSavedPost,
        loadSavedPosts,
        toggleSavedPost,
        removeSavedPostId,
    };
};

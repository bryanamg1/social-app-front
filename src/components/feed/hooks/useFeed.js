import { useCallback, useEffect, useState } from "react";

import { FEED_PAGINATION, FEED_TEXTS } from "../../../constants";
import {
  createPost,
  getAllPosts,
  getFollowingFeed,
  removePost,
} from "../services/feedService";
import { getPostId } from "../utils/postAdapter";

const getUniquePosts = (currentPosts, nextPosts) => {
    const seenPostIds = new Set(
        currentPosts.map((post) => String(getPostId(post))).filter(Boolean)
    );

    return [
        ...currentPosts,
        ...nextPosts.filter((post) => {
        const postId = getPostId(post);

        if (!postId) return true;

        const normalizedPostId = String(postId);

        if (seenPostIds.has(normalizedPostId)) return false;

        seenPostIds.add(normalizedPostId);
        return true;
        }),
    ];
};

const getHasMore = ({ page, totalPages, receivedPostsCount, limit }) => {
    if (Number.isFinite(totalPages)) {
        return page < totalPages;
    }

    return receivedPostsCount >= limit;
};

export const useFeed = ({ mode = "all" } = {}) => {
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [creatingPost, setCreatingPost] = useState(false);
    const [deletingPostId, setDeletingPostId] = useState(null);
    const [error, setError] = useState(null);
    const [paginationError, setPaginationError] = useState(null);
    const [pagination, setPagination] = useState({
        page: FEED_PAGINATION.INITIAL_PAGE,
        limit: FEED_PAGINATION.PAGE_SIZE,
        total: null,
        totalPages: null,
        hasMore: false,
    });

    const loadPosts = useCallback(
        async ({ page = FEED_PAGINATION.INITIAL_PAGE, append = false } = {}) => {
        try {
            if (append) {
            setLoadingMorePosts(true);
            setPaginationError(null);
            } else {
            setLoadingPosts(true);
            setError(null);
            setPaginationError(null);
            }

            const postsData =
            mode === "following"
                ? await getFollowingFeed()
                : await getAllPosts({
                    page,
                    limit: FEED_PAGINATION.PAGE_SIZE,
                });

            const nextPosts = postsData.posts;
            const nextMeta = postsData.meta;
            const nextPage = Number(nextMeta.page) || page;
            const nextLimit =
            Number(nextMeta.limit) || FEED_PAGINATION.PAGE_SIZE;
            const nextTotal = Number.isFinite(Number(nextMeta.total))
            ? Number(nextMeta.total)
            : null;
            const nextTotalPages = Number.isFinite(Number(nextMeta.totalPages))
            ? Number(nextMeta.totalPages)
            : null;

            setPosts((currentPosts) =>
            append ? getUniquePosts(currentPosts, nextPosts) : nextPosts
            );

            setPagination({
            page: nextPage,
            limit: nextLimit,
            total: nextTotal,
            totalPages: nextTotalPages,
            hasMore:
                mode === "following"
                ? false
                : getHasMore({
                    page: nextPage,
                    totalPages: nextTotalPages,
                    receivedPostsCount: nextPosts.length,
                    limit: nextLimit,
                    }),
            });
        } catch {
            if (append) {
            setPaginationError(FEED_TEXTS.ERRORS.LOAD_MORE_POSTS);
            } else {
            setError(FEED_TEXTS.ERRORS.LOAD_POSTS);
            }
        } finally {
            setLoadingPosts(false);
            setLoadingMorePosts(false);
        }
        },
        [mode]
    );

    const loadMorePosts = async () => {
        if (loadingMorePosts || !pagination.hasMore) return;

        await loadPosts({
        page: pagination.page + 1,
        append: true,
        });
    };

    const handleCreatePost = async ({ userId, content, image }) => {
        try {
        setCreatingPost(true);
        setError(null);
        setPaginationError(null);

        await createPost({
            userId,
            content,
            image,
        });

        await loadPosts();
        } catch {
        setError(FEED_TEXTS.ERRORS.CREATE_POST);
        } finally {
        setCreatingPost(false);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
        setDeletingPostId(postId);
        setError(null);
        setPaginationError(null);

        await removePost(postId);

        setPosts((currentPosts) =>
            currentPosts.filter((post) => String(getPostId(post)) !== String(postId))
        );
        } catch {
        setError(FEED_TEXTS.ERRORS.DELETE_POST);
        } finally {
        setDeletingPostId(null);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPosts();
    }, [loadPosts]);

    return {
        posts,
        loadingPosts,
        loadingMorePosts,
        creatingPost,
        deletingPostId,
        error,
        paginationError,
        pagination,
        loadPosts,
        loadMorePosts,
        handleCreatePost,
        handleDeletePost,
    };
};

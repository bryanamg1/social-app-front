import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
    FEED_PAGINATION,
    HTTP_STATUS,
    PROFILE_TEXTS,
    ROUTE_PARAMS,
} from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { useConversationLauncher } from "../../messages/hooks/useConversationLauncher";
import { removePost } from "../../feed/services/feedService";
import { getPostId } from "../../feed/utils/postAdapter";
import { useFollowAction } from "./useFollowAction";
import { getPostsByUserId, getUserProfile } from "../services/userProfileService";
import { getUserId } from "../utils/userProfileAdapter";

const getHasMore = ({ page, totalPages, receivedPostsCount, limit }) => {
    if (Number.isFinite(totalPages)) {
        return page < totalPages;
    }

    return receivedPostsCount >= limit;
};

export const usePublicProfile = () => {
    const params = useParams();
    const { user } = useAuth();
    const profileUserId = params[ROUTE_PARAMS.USER_ID];
    const currentUserId = getUserId(user);
    const [profile, setProfile] = useState(null);
    const followAction = useFollowAction({
        targetUserId: profileUserId,
        currentUserId,
    });
    const messageAction = useConversationLauncher({
        currentUserId,
        targetUser: profile,
    });
    const [posts, setPosts] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [deletingPostId, setDeletingPostId] = useState(null);
    const [profileError, setProfileError] = useState(null);
    const [postsError, setPostsError] = useState(null);
    const [paginationError, setPaginationError] = useState(null);
    const [pagination, setPagination] = useState({
        page: FEED_PAGINATION.INITIAL_PAGE,
        limit: FEED_PAGINATION.PAGE_SIZE,
        total: null,
        totalPages: null,
        hasMore: false,
    });

    const loadProfile = useCallback(async () => {
        if (!profileUserId) {
        setProfileError(PROFILE_TEXTS.ERRORS.LOAD_PROFILE);
        return;
        }

        try {
        setLoadingProfile(true);
        setProfileError(null);

        const nextProfile = await getUserProfile(profileUserId);

        setProfile(nextProfile);
        } catch {
        setProfileError(PROFILE_TEXTS.ERRORS.LOAD_PROFILE);
        } finally {
        setLoadingProfile(false);
        }
    }, [profileUserId]);

    const loadPosts = useCallback(
        async ({ page = FEED_PAGINATION.INITIAL_PAGE, append = false } = {}) => {
        if (!profileUserId) return;

        try {
            if (append) {
            setLoadingMorePosts(true);
            setPaginationError(null);
            } else {
            setLoadingPosts(true);
            setPostsError(null);
            setPaginationError(null);
            }

            const postsData = await getPostsByUserId({
            userId: profileUserId,
            page,
            limit: FEED_PAGINATION.PAGE_SIZE,
            });
            const nextPosts = postsData.posts;
            const nextMeta = postsData.meta;
            const nextPage = Number(nextMeta.page) || page;
            const nextLimit = Number(nextMeta.limit) || FEED_PAGINATION.PAGE_SIZE;
            const nextTotal = Number.isFinite(Number(nextMeta.total))
            ? Number(nextMeta.total)
            : null;
            const nextTotalPages = Number.isFinite(Number(nextMeta.totalPages))
            ? Number(nextMeta.totalPages)
            : null;

            setPosts((currentPosts) =>
            append ? [...currentPosts, ...nextPosts] : nextPosts
            );
            setPagination({
            page: nextPage,
            limit: nextLimit,
            total: nextTotal,
            totalPages: nextTotalPages,
            hasMore: getHasMore({
                page: nextPage,
                totalPages: nextTotalPages,
                receivedPostsCount: nextPosts.length,
                limit: nextLimit,
            }),
            });
        } catch (error) {
            const isNotFound = error?.response?.status === HTTP_STATUS.NOT_FOUND;

            if (isNotFound) {
            if (!append) {
                setPosts([]);
                setPostsError(null);
            }

            setPagination((currentPagination) => ({
                ...currentPagination,
                hasMore: false,
            }));
            return;
            }

            if (append) {
            setPaginationError(PROFILE_TEXTS.ERRORS.LOAD_POSTS);
            } else {
            setPostsError(PROFILE_TEXTS.ERRORS.LOAD_POSTS);
            }
        } finally {
            setLoadingPosts(false);
            setLoadingMorePosts(false);
        }
        },
        [profileUserId]
    );

    const loadMorePosts = async () => {
        if (loadingMorePosts || !pagination.hasMore) return;

        await loadPosts({
        page: pagination.page + 1,
        append: true,
        });
    };

    const handleDeletePost = async (postId) => {
        try {
        setDeletingPostId(postId);
        setPostsError(null);
        setPaginationError(null);

        await removePost(postId);

        setPosts((currentPosts) =>
            currentPosts.filter((post) => String(getPostId(post)) !== String(postId))
        );
        } catch {
        setPostsError(PROFILE_TEXTS.ERRORS.LOAD_POSTS);
        } finally {
        setDeletingPostId(null);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProfile();
        loadPosts();
    }, [loadProfile, loadPosts]);

    const postsCount = useMemo(() => {
        return pagination.total ?? posts.length;
    }, [pagination.total, posts.length]);

    return {
        currentUserId,
        profile,
        posts,
        postsCount,
        loadingProfile,
        loadingPosts,
        loadingMorePosts,
        deletingPostId,
        profileError,
        postsError,
        paginationError,
        pagination,
        followAction,
        messageAction,
        loadMorePosts,
        handleDeletePost,
    };
};

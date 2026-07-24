import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
    FEED_PAGINATION,
    FEED_POST_TYPES,
    HTTP_STATUS,
    PROFILE_TEXTS,
    ROUTE_PARAMS,
} from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { useSavedPosts } from "../../feed/hooks/useSavedPosts";
import {
    removePost,
    togglePinnedPost,
    updatePost,
} from "../../feed/services/feedService";
import { getPostId } from "../../feed/utils/postAdapter";
import { useConversationLauncher } from "../../messages/hooks/useConversationLauncher";
import { getPostsByUserId, getUserProfile } from "../services/userProfileService";
import { getUserId, getUserProjects } from "../utils/userProfileAdapter";
import { useBlockAction } from "./useBlockAction";
import { useFollowAction } from "./useFollowAction";
import { useProjectVisibility } from "./useProjectVisibility";
import { useRelationshipStatus } from "./useRelationshipStatus";

const getHasMore = ({ page, totalPages, receivedPostsCount, limit }) => {
    if (Number.isFinite(totalPages)) {
        return page < totalPages;
    }

    return receivedPostsCount >= limit;
};

const replacePostInList = (currentPosts, updatedPost) => {
    const updatedPostId = String(getPostId(updatedPost));

    return currentPosts.map((post) =>
        String(getPostId(post)) === updatedPostId ? updatedPost : post
    );
};

export const usePublicProfile = () => {
    const params = useParams();
    const { user } = useAuth();
    const profileUserId = params[ROUTE_PARAMS.USER_ID];
    const currentUserId = getUserId(user);
    const relationshipStatus = useRelationshipStatus({
        targetUserId: profileUserId,
        currentUserId,
    });
    const isBlockedRelationship = Boolean(
        relationshipStatus.status.isBlocked ||
            relationshipStatus.status.isBlockedByUser
    );
    const [profile, setProfile] = useState(null);
    const followAction = useFollowAction({
        targetUserId: profileUserId,
        currentUserId,
        relationshipStatus,
    });
    const blockAction = useBlockAction({
        targetUserId: profileUserId,
        currentUserId,
        relationshipStatus,
    });
    const messageAction = useConversationLauncher({
        currentUserId,
        targetUser: profile,
        blocked: isBlockedRelationship,
    });
    const [posts, setPosts] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [deletingPostId, setDeletingPostId] = useState(null);
    const [profileError, setProfileError] = useState(null);
    const [postsError, setPostsError] = useState(null);
    const [paginationError, setPaginationError] = useState(null);
    const [selectedPostType, setSelectedPostType] = useState(FEED_POST_TYPES.ALL);
    const [pagination, setPagination] = useState({
        page: FEED_PAGINATION.INITIAL_PAGE,
        limit: FEED_PAGINATION.PAGE_SIZE,
        total: null,
        totalPages: null,
        hasMore: false,
    });
    const activePostType =
        selectedPostType === FEED_POST_TYPES.ALL ? null : selectedPostType;
    const savedPosts = useSavedPosts({ currentUserId });

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
            if (relationshipStatus.isVisible && relationshipStatus.loading) return;

            if (isBlockedRelationship) {
                setPosts([]);
                setPostsError(null);
                setPaginationError(null);
                setPagination({
                    page: FEED_PAGINATION.INITIAL_PAGE,
                    limit: FEED_PAGINATION.PAGE_SIZE,
                    total: 0,
                    totalPages: 0,
                    hasMore: false,
                });
                return;
            }

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
                    postType: activePostType,
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
        [
            activePostType,
            isBlockedRelationship,
            profileUserId,
            relationshipStatus.isVisible,
            relationshipStatus.loading,
        ]
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
            savedPosts.removeSavedPostId(postId);

            setPosts((currentPosts) =>
                currentPosts.filter((post) => String(getPostId(post)) !== String(postId))
            );
        } catch {
            setPostsError(PROFILE_TEXTS.ERRORS.LOAD_POSTS);
        } finally {
            setDeletingPostId(null);
        }
    };

    const handleUpdatePost = useCallback(async (postId, payload) => {
        const updatedPost = await updatePost({
            postId,
            content: payload.content,
            postType: payload.postType,
        });

        setPosts((currentPosts) => replacePostInList(currentPosts, updatedPost));

        return updatedPost;
    }, []);

    const handleTogglePinnedPost = useCallback(async (postId, pinned) => {
        const updatedPost = await togglePinnedPost({
            postId,
            pinned,
        });

        setPosts((currentPosts) => replacePostInList(currentPosts, updatedPost));

        return updatedPost;
    }, []);

    const handleToggleSavedPost = useCallback((postId) => {
        return savedPosts.toggleSavedPost(postId);
    }, [savedPosts]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProfile();
    }, [loadProfile]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPosts();
    }, [loadPosts]);

    const postsCount = useMemo(() => {
        return pagination.total ?? posts.length;
    }, [pagination.total, posts.length]);

    const projects = useMemo(() => {
        return getUserProjects(profile);
    }, [profile]);
    const projectVisibility = useProjectVisibility(projects);

    return {
        currentUserId,
        profile,
        projects: projectVisibility.filteredProjects,
        totalProjectsCount: projectVisibility.totalCount,
        visibleProjectsCount: projectVisibility.visibleCount,
        projectFilterOptions: projectVisibility.filterOptions,
        selectedProjectFilter: projectVisibility.selectedFilter,
        projectSummary: projectVisibility.summary,
        posts,
        postsCount,
        selectedPostType,
        loadingProfile,
        loadingPosts,
        loadingMorePosts,
        deletingPostId,
        profileError,
        postsError,
        paginationError,
        pagination,
        followAction,
        blockAction,
        messageAction,
        isBlockedRelationship,
        relationshipStatusError: relationshipStatus.error,
        handlePostTypeFilterChange: setSelectedPostType,
        handleProjectFilterChange: projectVisibility.onFilterChange,
        loadMorePosts,
        handleDeletePost,
        handleUpdatePost,
        handleTogglePinnedPost,
        handleToggleSavedPost,
        savedPosts,
    };
};

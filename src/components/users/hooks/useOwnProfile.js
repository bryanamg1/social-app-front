import { useCallback, useEffect, useMemo, useState } from "react";

import {
    API_ERROR_CODES,
    FEED_PAGINATION,
    HTTP_STATUS,
    PROFILE_TEXTS,
} from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { removePost } from "../../feed/services/feedService";
import { getPostId } from "../../feed/utils/postAdapter";
import {
    getPostsByUserId,
    getUserProfile,
    updateUserProfile,
} from "../services/userProfileService";
import {
    getUserBio,
    getUserId,
    getUserLocation,
    getUserName,
    hasProfileFormChanges,
} from "../utils/userProfileAdapter";

const createProfileForm = (profile) => ({
    userName: getUserName(profile),
    bio: getUserBio(profile),
    location: getUserLocation(profile),
});

const getHasMore = ({ page, totalPages, receivedPostsCount, limit }) => {
    if (Number.isFinite(totalPages)) {
        return page < totalPages;
    }

    return receivedPostsCount >= limit;
};

const getProfileUpdateError = (error) => {
    const errorCode =
        error?.response?.data?.error?.code ?? error?.response?.data?.code;

    if (errorCode === API_ERROR_CODES.USER_NAME_EXIST) {
        return PROFILE_TEXTS.ERRORS.USER_NAME_EXIST;
    }

    return PROFILE_TEXTS.ERRORS.UPDATE_PROFILE;
};

export const useOwnProfile = () => {
    const { user, updateUser } = useAuth();
    const currentUserId = getUserId(user);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [deletingPostId, setDeletingPostId] = useState(null);
    const [profileError, setProfileError] = useState(null);
    const [postsError, setPostsError] = useState(null);
    const [paginationError, setPaginationError] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState(() => createProfileForm(user));
    const [pagination, setPagination] = useState({
        page: FEED_PAGINATION.INITIAL_PAGE,
        limit: FEED_PAGINATION.PAGE_SIZE,
        total: null,
        totalPages: null,
        hasMore: false,
    });

    const loadProfile = useCallback(async () => {
        if (!currentUserId) {
        setProfileError(PROFILE_TEXTS.ERRORS.AUTH_USER_MISSING);
        return;
        }

        try {
        setLoadingProfile(true);
        setProfileError(null);

        const nextProfile = await getUserProfile(currentUserId);

        setProfile(nextProfile);
        setProfileForm(createProfileForm(nextProfile));
        updateUser(nextProfile);
        } catch {
        setProfileError(PROFILE_TEXTS.ERRORS.LOAD_PROFILE);
        } finally {
        setLoadingProfile(false);
        }
    }, [currentUserId, updateUser]);

    const loadPosts = useCallback(
        async ({ page = FEED_PAGINATION.INITIAL_PAGE, append = false } = {}) => {
        if (!currentUserId) return;

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
            userId: currentUserId,
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
        [currentUserId]
    );

    const loadMorePosts = async () => {
        if (loadingMorePosts || !pagination.hasMore) return;

        await loadPosts({
        page: pagination.page + 1,
        append: true,
        });
    };

    const handleProfileFieldChange = (field, value) => {
        setUpdateSuccess(false);
        setUpdateError(null);
        setProfileForm((currentForm) => ({
        ...currentForm,
        [field]: value,
        }));
    };

    const startEditing = () => {
        setProfileForm(createProfileForm(profile || user));
        setUpdateError(null);
        setUpdateSuccess(false);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setProfileForm(createProfileForm(profile || user));
        setUpdateError(null);
        setIsEditing(false);
    };

    const submitProfile = async () => {
        if (!currentUserId || !profileForm.userName.trim()) return;

        if (!hasProfileFormChanges(profile, profileForm)) {
        setUpdateSuccess(false);
        setUpdateError(PROFILE_TEXTS.ERRORS.NO_PROFILE_CHANGES);
        return;
        }

        try {
        setUpdatingProfile(true);
        setUpdateError(null);
        setUpdateSuccess(false);

        const nextProfile = await updateUserProfile({
            userId: currentUserId,
            userName: profileForm.userName,
            bio: profileForm.bio,
            location: profileForm.location,
            currentProfile: profile,
        });

        setProfile(nextProfile);
        setProfileForm(createProfileForm(nextProfile));
        updateUser(nextProfile);
        setIsEditing(false);
        setUpdateSuccess(true);
        } catch (error) {
        setUpdateError(getProfileUpdateError(error));
        } finally {
        setUpdatingProfile(false);
        }
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
        profile: profile || user,
        posts,
        postsCount,
        loadingProfile,
        loadingPosts,
        loadingMorePosts,
        updatingProfile,
        deletingPostId,
        profileError,
        postsError,
        paginationError,
        updateError,
        updateSuccess,
        isEditing,
        profileForm,
        pagination,
        loadMorePosts,
        startEditing,
        cancelEditing,
        handleProfileFieldChange,
        submitProfile,
        handleDeletePost,
    };
};

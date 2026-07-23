import { useCallback, useEffect, useMemo, useState } from "react";

import {
    API_ERROR_CODES,
    FEED_POST_TYPES,
    FEED_PAGINATION,
    HTTP_STATUS,
    PROFILE_PROJECT_STATUS_VALUES,
    PROFILE_TEXTS,
} from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { removePost } from "../../feed/services/feedService";
import { getPostId } from "../../feed/utils/postAdapter";
import {
    createUserProject,
    deleteUserProject,
    getPostsByUserId,
    getUserProfile,
    updateUserProject,
    updateUserProfile,
} from "../services/userProfileService";
import {
    getUserBio,
    getUserId,
    getUserLocation,
    getUserProjects,
    getUserName,
    hasProfileFormChanges,
} from "../utils/userProfileAdapter";
import { useProjectVisibility } from "./useProjectVisibility";

const createProfileForm = (profile) => ({
    userName: getUserName(profile),
    bio: getUserBio(profile),
    location: getUserLocation(profile),
});

const createProjectForm = (project = null) => ({
    title: project?.title ?? "",
    summary: project?.summary ?? "",
    technologies: project?.technologies_text ?? "",
    repoUrl: project?.repo_url ?? "",
    demoUrl: project?.demo_url ?? "",
    status: project?.status ?? PROFILE_PROJECT_STATUS_VALUES.IN_PROGRESS,
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
    const [projectError, setProjectError] = useState(null);
    const [projectSuccess, setProjectSuccess] = useState(null);
    const [savingProject, setSavingProject] = useState(false);
    const [deletingProjectId, setDeletingProjectId] = useState(null);
    const [projectForm, setProjectForm] = useState(() => createProjectForm());
    const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);
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
        [activePostType, currentUserId]
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

    const openCreateProjectForm = () => {
        setProjectError(null);
        setProjectSuccess(null);
        setEditingProjectId(null);
        setProjectForm(createProjectForm());
        setIsProjectFormOpen(true);
    };

    const openEditProjectForm = (project) => {
        setProjectError(null);
        setProjectSuccess(null);
        setEditingProjectId(project.project_id);
        setProjectForm(createProjectForm(project));
        setIsProjectFormOpen(true);
    };

    const cancelProjectForm = () => {
        setProjectError(null);
        setEditingProjectId(null);
        setProjectForm(createProjectForm());
        setIsProjectFormOpen(false);
    };

    const handleProjectFieldChange = (field, value) => {
        setProjectError(null);
        setProjectSuccess(null);
        setProjectForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
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

    const submitProject = async () => {
        if (!currentUserId) return;

        if (!projectForm.title.trim()) {
            setProjectError(PROFILE_TEXTS.ERRORS.PROJECT_TITLE_REQUIRED);
            return;
        }

        try {
            setSavingProject(true);
            setProjectError(null);
            setProjectSuccess(null);

            const requestPayload = {
                title: projectForm.title.trim(),
                summary: projectForm.summary.trim(),
                technologies: projectForm.technologies.trim(),
                repoUrl: projectForm.repoUrl.trim(),
                demoUrl: projectForm.demoUrl.trim(),
                status: projectForm.status,
            };

            if (editingProjectId) {
                await updateUserProject({
                    userId: currentUserId,
                    projectId: editingProjectId,
                    project: requestPayload,
                });

                setProjectSuccess(PROFILE_TEXTS.PROJECTS.UPDATE_SUCCESS);
            } else {
                await createUserProject({
                    userId: currentUserId,
                    project: requestPayload,
                });

                setProjectSuccess(PROFILE_TEXTS.PROJECTS.CREATE_SUCCESS);
            }

            setEditingProjectId(null);
            setProjectForm(createProjectForm());
            setIsProjectFormOpen(false);
            await loadProfile();
        } catch (error) {
            const errorCode =
                error?.response?.data?.error?.code ?? error?.response?.data?.code;

            if (errorCode === "PROJECT_TITLE_REQUIRED") {
                setProjectError(PROFILE_TEXTS.ERRORS.PROJECT_TITLE_REQUIRED);
            } else if (errorCode === "PROJECT_STATUS_INVALID") {
                setProjectError(PROFILE_TEXTS.ERRORS.PROJECT_STATUS_INVALID);
            } else if (errorCode === "PROJECT_REPO_URL_INVALID") {
                setProjectError(PROFILE_TEXTS.ERRORS.PROJECT_REPO_URL_INVALID);
            } else if (errorCode === "PROJECT_DEMO_URL_INVALID") {
                setProjectError(PROFILE_TEXTS.ERRORS.PROJECT_DEMO_URL_INVALID);
            } else {
                setProjectError(PROFILE_TEXTS.ERRORS.SAVE_PROJECT);
            }
        } finally {
            setSavingProject(false);
        }
    };

    const handleDeleteProject = async (projectId) => {
        if (!currentUserId) return;

        try {
            setDeletingProjectId(projectId);
            setProjectError(null);
            setProjectSuccess(null);

            await deleteUserProject({
                userId: currentUserId,
                projectId,
            });

            setProjectSuccess(PROFILE_TEXTS.PROJECTS.DELETE_SUCCESS);
            await loadProfile();
        } catch {
            setProjectError(PROFILE_TEXTS.ERRORS.DELETE_PROJECT);
        } finally {
            setDeletingProjectId(null);
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
    }, [loadProfile]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPosts();
    }, [loadPosts]);

    const postsCount = useMemo(() => {
        return pagination.total ?? posts.length;
    }, [pagination.total, posts.length]);

    const projects = useMemo(() => {
        return getUserProjects(profile || user);
    }, [profile, user]);
    const projectVisibility = useProjectVisibility(projects);

    return {
        currentUserId,
        profile: profile || user,
        projects: projectVisibility.filteredProjects,
        totalProjectsCount: projectVisibility.totalCount,
        visibleProjectsCount: projectVisibility.visibleCount,
        projectFilterOptions: projectVisibility.filterOptions,
        selectedProjectFilter: projectVisibility.selectedFilter,
        projectSummary: projectVisibility.summary,
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
        projectError,
        projectSuccess,
        savingProject,
        deletingProjectId,
        isEditing,
        profileForm,
        projectForm,
        selectedPostType,
        isProjectFormOpen,
        editingProjectId,
        pagination,
        loadMorePosts,
        startEditing,
        cancelEditing,
        openCreateProjectForm,
        openEditProjectForm,
        cancelProjectForm,
        handlePostTypeFilterChange: setSelectedPostType,
        handleProjectFilterChange: projectVisibility.onFilterChange,
        handleProfileFieldChange,
        handleProjectFieldChange,
        submitProfile,
        submitProject,
        handleDeleteProject,
        handleDeletePost,
    };
};

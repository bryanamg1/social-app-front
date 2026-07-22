import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { PostList } from "../../feed/components/PostList";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfilePostIntentFilter } from "../components/ProfilePostIntentFilter";
import { ProfileProjectsSection } from "../components/ProfileProjectsSection";
import { useOwnProfile } from "../hooks/useOwnProfile";
import { PROFILE_TEXTS } from "../../../constants";

import styles from "./ProfilePage.module.css";

export function ProfilePage() {
    const {
        currentUserId,
        profile,
        projects,
        totalProjectsCount,
        visibleProjectsCount,
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
        projectFilterOptions,
        selectedProjectFilter,
        projectSummary,
        isProjectFormOpen,
        editingProjectId,
        pagination,
        loadMorePosts,
        startEditing,
        cancelEditing,
        openCreateProjectForm,
        openEditProjectForm,
        cancelProjectForm,
        handlePostTypeFilterChange,
        handleProjectFilterChange,
        handleProfileFieldChange,
        handleProjectFieldChange,
        submitProfile,
        submitProject,
        handleDeleteProject,
        handleDeletePost,
    } = useOwnProfile();

    if (loadingProfile && !profile) {
        return (
        <Box className={styles.centerState}>
            <CircularProgress />
            <Typography>{PROFILE_TEXTS.LOADING}</Typography>
        </Box>
        );
    }

    if (profileError) {
        return (
        <section className={styles.page}>
            <Alert severity="error" className={styles.alert}>
            {profileError}
            </Alert>
        </section>
        );
    }

    return (
        <main className={styles.page}>
        <ProfileHeader
            profile={profile}
            postsCount={postsCount}
            isEditing={isEditing}
            form={profileForm}
            updating={updatingProfile}
            updateError={updateError}
            updateSuccess={updateSuccess}
            onStartEditing={startEditing}
            onCancelEditing={cancelEditing}
            onFieldChange={handleProfileFieldChange}
            onSubmitProfile={submitProfile}
        />

        <ProfileProjectsSection
            projects={projects}
            canManage
            totalProjectsCount={totalProjectsCount}
            visibleProjectsCount={visibleProjectsCount}
            projectFilterOptions={projectFilterOptions}
            selectedProjectFilter={selectedProjectFilter}
            projectSummary={projectSummary}
            isFormOpen={isProjectFormOpen}
            editingProjectId={editingProjectId}
            projectForm={projectForm}
            projectError={projectError}
            projectSuccess={projectSuccess}
            savingProject={savingProject}
            deletingProjectId={deletingProjectId}
            onOpenCreate={openCreateProjectForm}
            onProjectFilterChange={handleProjectFilterChange}
            onProjectFieldChange={handleProjectFieldChange}
            onSubmitProject={submitProject}
            onCancelProject={cancelProjectForm}
            onEditProject={openEditProjectForm}
            onDeleteProject={handleDeleteProject}
        />

        <section className={styles.postsSection}>
            <Typography variant="h5" className={styles.postsTitle}>
            {PROFILE_TEXTS.POSTS.TITLE}
            </Typography>

            <ProfilePostIntentFilter
                selectedPostType={selectedPostType}
                onSelectPostType={handlePostTypeFilterChange}
            />

            <PostList
            posts={posts}
            currentUserId={currentUserId}
            loadingPosts={loadingPosts}
            loadingMorePosts={loadingMorePosts}
            deletingPostId={deletingPostId}
            error={postsError}
            paginationError={paginationError}
            hasMore={pagination.hasMore}
            emptyDescription={PROFILE_TEXTS.POSTS.EMPTY_BY_TYPE}
            onDeletePost={handleDeletePost}
            onLoadMorePosts={loadMorePosts}
            />
        </section>
        </main>
    );
}

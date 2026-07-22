import { Alert, Typography } from "@mui/material";

import { PostList } from "../../feed/components/PostList";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfilePageSkeleton } from "../components/ProfilePageSkeleton";
import { ProfilePostIntentFilter } from "../components/ProfilePostIntentFilter";
import { ProfileProjectsSection } from "../components/ProfileProjectsSection";
import { usePublicProfile } from "../hooks/usePublicProfile";
import { PROFILE_TEXTS } from "../../../constants";

import styles from "./ProfilePage.module.css";

export function PublicProfilePage() {
    const {
        currentUserId,
        profile,
        projects,
        totalProjectsCount,
        visibleProjectsCount,
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
        messageAction,
        handlePostTypeFilterChange,
        projectFilterOptions,
        selectedProjectFilter,
        projectSummary,
        handleProjectFilterChange,
        loadMorePosts,
        handleDeletePost,
    } = usePublicProfile();

    if (loadingProfile && !profile) {
        return <ProfilePageSkeleton />;
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
            canEdit={false}
            description={PROFILE_TEXTS.PUBLIC_DESCRIPTION}
            followAction={followAction}
            secondaryAction={messageAction}
        />

        <ProfileProjectsSection
            projects={projects}
            totalProjectsCount={totalProjectsCount}
            visibleProjectsCount={visibleProjectsCount}
            projectFilterOptions={projectFilterOptions}
            selectedProjectFilter={selectedProjectFilter}
            projectSummary={projectSummary}
            projectForm={null}
            onProjectFilterChange={handleProjectFilterChange}
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

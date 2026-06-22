import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { PostList } from "../../feed/components/PostList";
import { ProfileHeader } from "../components/ProfileHeader";
import { useOwnProfile } from "../hooks/useOwnProfile";
import { PROFILE_TEXTS } from "../../../constants";

import styles from "./ProfilePage.module.css";

export function ProfilePage() {
    const {
        currentUserId,
        profile,
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

        <section className={styles.postsSection}>
            <Typography variant="h5" className={styles.postsTitle}>
            {PROFILE_TEXTS.POSTS.TITLE}
            </Typography>

            <PostList
            posts={posts}
            currentUserId={currentUserId}
            loadingPosts={loadingPosts}
            loadingMorePosts={loadingMorePosts}
            deletingPostId={deletingPostId}
            error={postsError}
            paginationError={paginationError}
            hasMore={pagination.hasMore}
            onDeletePost={handleDeletePost}
            onLoadMorePosts={loadMorePosts}
            />
        </section>
        </main>
    );
}

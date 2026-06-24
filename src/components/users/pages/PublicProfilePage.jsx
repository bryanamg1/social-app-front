import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { PostList } from "../../feed/components/PostList";
import { ProfileHeader } from "../components/ProfileHeader";
import { usePublicProfile } from "../hooks/usePublicProfile";
import { PROFILE_TEXTS } from "../../../constants";

import styles from "./ProfilePage.module.css";

export function PublicProfilePage() {
    const {
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
    } = usePublicProfile();

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
            canEdit={false}
            description={PROFILE_TEXTS.PUBLIC_DESCRIPTION}
            followAction={followAction}
            secondaryAction={messageAction}
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

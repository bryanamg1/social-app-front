import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { FEED_TEXTS } from "../../../constants";
import { PostCard } from "./PostCard";
import { getPostId, getPostOwnerId } from "../utils/postAdapter";

import styles from "../styles/FeedPage.module.css";

export const PostList = ({
  posts,
  currentUserId,
  loadingPosts,
  deletingPostId,
  error,
  onDeletePost,
}) => {
    if (loadingPosts) {
        return (
        <Box className={styles.centerState}>
            <CircularProgress />
            <Typography>{FEED_TEXTS.POSTS.LOADING}</Typography>
        </Box>
        );
    }

    if (error) {
        return (
        <Alert severity="error" className={styles.alert}>
            {error}
        </Alert>
        );
    }

    if (!posts.length) {
        return (
        <Box className={styles.emptyState}>
            <Typography variant="h6">{FEED_TEXTS.POSTS.EMPTY_TITLE}</Typography>

            <Typography>{FEED_TEXTS.POSTS.EMPTY_DESCRIPTION}</Typography>
        </Box>
        );
    }

    return (
        <Box className={styles.postsList}>
        {posts.map((post) => {
            const postId = getPostId(post);
            const ownerId = getPostOwnerId(post);
            const isOwner = String(ownerId) === String(currentUserId);

            return (
            <PostCard
                key={postId}
                post={post}
                isOwner={isOwner}
                deletingPostId={deletingPostId}
                onDeletePost={onDeletePost}
            />
            );
        })}
        </Box>
    );
};
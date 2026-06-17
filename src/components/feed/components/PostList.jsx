import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { FEED_TEXTS } from "../../../constants";
import { PostCard } from "./PostCard";

import styles from "../styles/FeedPage.module.css";

const getTextValue = (value) => {
    if (!value) return "";

    if (typeof value === "string") return value;

    if (Array.isArray(value)) {
        return value
        .map((item) => getTextValue(item))
        .filter(Boolean)
        .join(" ");
    }

    if (typeof value === "object") {
        if (typeof value.message === "string") return value.message;
        if (typeof value.error === "string") return value.error;
        if (value.details) return getTextValue(value.details);

        try {
        return JSON.stringify(value);
        } catch {
        return FEED_TEXTS.POSTS.ERROR;
        }
    }

    return String(value);
};

export const PostList = ({
    posts = [],
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
            {getTextValue(error)}
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
        {posts.map((post, index) => {
            const postId = post?.post_id;
            const ownerId = post?.user_id;

            const isOwner = String(ownerId) === String(currentUserId);

            const postKey = postId
            ? `post-${postId}`
            : `post-fallback-${index}-${post?.created_at || "no-date"}`;

            return (
            <PostCard
                key={postKey}
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
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";

import { FEED_KEYS, FEED_TEXTS } from "../../../constants";
import { usePostComments } from "../hooks/usePostComments";
import { usePostReactions } from "../hooks/usePostReactions";
import {
  getPostComments,
  getPostCreatedAt,
  getPostId,
  getPostOwnerId,
} from "../utils/postAdapter";
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
    loadingMorePosts,
    deletingPostId,
    error,
    paginationError,
    hasMore,
    onDeletePost,
    onLoadMorePosts,
    }) => {
    const {
        getCommentFormState,
        getCommentsState,
        handleCommentDraftChange,
        isCommentsOpen,
        submitComment,
        toggleComments,
    } = usePostComments();
    const { getReactionState, handleToggleReaction } = usePostReactions({
        posts,
        currentUserId,
    });

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
            const postId = getPostId(post);
            const ownerId = getPostOwnerId(post);
            const createdAt = getPostCreatedAt(post);
            const fallbackComments = getPostComments(post);

            const isOwner = String(ownerId) === String(currentUserId);

            const postKey = postId
            ? `${FEED_KEYS.POST_PREFIX}-${postId}`
            : `${FEED_KEYS.POST_FALLBACK_PREFIX}-${index}-${createdAt || FEED_KEYS.NO_DATE}`;
            const commentsState = getCommentsState(postKey);
            const commentFormState = getCommentFormState(postKey);
            const reactionState = getReactionState(postKey);

            return (
            <PostCard
                key={postKey}
                post={post}
                isOwner={isOwner}
                deletingPostId={deletingPostId}
                commentsOpen={isCommentsOpen(postKey)}
                comments={commentsState.comments}
                loadingComments={commentsState.loading}
                commentsError={commentsState.error}
                commentForm={commentFormState}
                reactionState={reactionState}
                onDeletePost={onDeletePost}
                onToggleReaction={(reactionType) =>
                handleToggleReaction({
                    postKey,
                    postId,
                    reactionType,
                })
                }
                onToggleComments={() =>
                toggleComments({
                    postKey,
                    postId,
                    fallbackComments,
                })
                }
                onCommentChange={(value) => handleCommentDraftChange(postKey, value)}
                onSubmitComment={() =>
                submitComment({
                    postKey,
                    postId,
                    userId: currentUserId,
                })
                }
            />
            );
        })}

        <Box className={styles.paginationActions}>
            {paginationError && (
            <Alert severity="error" className={styles.paginationAlert}>
                {paginationError}
            </Alert>
            )}

            {hasMore ? (
            <Button
                variant="contained"
                className={styles.loadMoreButton}
                disabled={loadingMorePosts}
                onClick={onLoadMorePosts}
            >
                {loadingMorePosts
                ? FEED_TEXTS.POSTS.LOADING_MORE
                : FEED_TEXTS.POSTS.LOAD_MORE_BUTTON}
            </Button>
            ) : (
            <Typography className={styles.endOfResultsText}>
                {FEED_TEXTS.POSTS.END_OF_RESULTS}
            </Typography>
            )}
        </Box>
        </Box>
    );
};

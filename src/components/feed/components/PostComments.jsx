import { Alert, Avatar, Box, CircularProgress, Typography } from "@mui/material";

import { FEED_KEYS, FEED_TEXTS } from "../../../constants";
import {
  formatCommentDate,
  getCommentAuthorName,
  getCommentContent,
  getCommentCreatedAt,
  getCommentId,
} from "../utils/postAdapter";

import styles from "../styles/FeedPage.module.css";

export const PostComments = ({ comments = [], loading, error }) => {
    if (loading) {
        return (
        <Box className={styles.commentsLoadingState}>
            <CircularProgress size={20} />

            <Typography className={styles.commentsLoadingText}>
            {FEED_TEXTS.COMMENTS.LOADING}
            </Typography>
        </Box>
        );
    }

    if (error) {
        return (
        <Alert severity="error" className={styles.commentsAlert}>
            {error}
        </Alert>
        );
    }

    if (!comments.length) {
        return (
        <Box className={styles.commentsEmptyState}>
            <Typography className={styles.commentsEmptyTitle}>
            {FEED_TEXTS.COMMENTS.EMPTY_TITLE}
            </Typography>

            <Typography className={styles.commentsEmptyText}>
            {FEED_TEXTS.COMMENTS.EMPTY_DESCRIPTION}
            </Typography>
        </Box>
        );
    }

    return (
        <Box className={styles.commentsList}>
        {comments.map((comment, index) => {
            const commentId = getCommentId(comment);
            const authorName = getCommentAuthorName(comment);
            const content = getCommentContent(comment);
            const createdAt = getCommentCreatedAt(comment);
            const avatarLetter = authorName.charAt(0).toUpperCase();
            const commentKey = commentId
            ? `${FEED_KEYS.COMMENT_PREFIX}-${commentId}`
            : `${FEED_KEYS.COMMENT_FALLBACK_PREFIX}-${index}`;

            return (
            <article key={commentKey} className={styles.commentItem}>
                <Avatar className={styles.commentAvatar}>{avatarLetter}</Avatar>

                <Box className={styles.commentBody}>
                <Box className={styles.commentHeader}>
                    <Typography className={styles.commentAuthor}>
                    {authorName}
                    </Typography>

                    <Typography className={styles.commentDate}>
                    {formatCommentDate(createdAt)}
                    </Typography>
                </Box>

                {content && (
                    <Typography className={styles.commentContent}>
                    {content}
                    </Typography>
                )}
                </Box>
            </article>
            );
        })}
        </Box>
    );
};

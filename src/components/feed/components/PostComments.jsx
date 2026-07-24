import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { FEED_TEXTS } from "../../../constants";
import { getCommentId } from "../utils/postAdapter";
import { CommentItem } from "./CommentItem";
import {
    getCommentReactionKey,
    useCommentReactions,
} from "../hooks/useCommentReactions";

import styles from "../styles/FeedPage.module.css";

export const PostComments = ({
    postKey,
    comments = [],
    loading,
    error,
    currentUserId,
    getCommentActionState,
    onStartEditingComment,
    onCancelEditingComment,
    onEditCommentChange,
    onSubmitEditedComment,
    onDeleteComment,
}) => {
    const { getReactionState, handleToggleReaction } = useCommentReactions({
        comments,
        currentUserId,
    });

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
                const commentKey = getCommentReactionKey({ comment, index });
                const reactionState = getReactionState(commentKey);
                const actionState = getCommentActionState(
                    postKey,
                    commentKey,
                    comment,
                    currentUserId
                );

                return (
                    <CommentItem
                        key={commentKey}
                        comment={comment}
                        reactionState={reactionState}
                        actionState={actionState}
                        onToggleReaction={(reactionType) =>
                            handleToggleReaction({
                                commentKey,
                                commentId,
                                reactionType,
                            })
                        }
                        onStartEditing={() => onStartEditingComment(postKey, commentKey, comment)}
                        onCancelEditing={() => onCancelEditingComment(postKey, commentKey)}
                        onEditCommentChange={(value) =>
                            onEditCommentChange(postKey, commentKey, value)
                        }
                        onSubmitEditedComment={() =>
                            onSubmitEditedComment(postKey, commentKey, commentId)
                        }
                        onDeleteComment={() => onDeleteComment(postKey, commentKey, commentId)}
                        currentUserId={currentUserId}
                    />
                );
            })}
        </Box>
    );
};

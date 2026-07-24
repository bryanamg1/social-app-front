import { Alert, Avatar, Box, Button, TextField, Typography } from "@mui/material";

import { FEED_TEXTS } from "../../../constants";
import {
    formatCommentDate,
    getCommentAuthorName,
    getCommentContent,
    getCommentCreatedAt,
} from "../utils/postAdapter";
import { CommentReactions } from "./CommentReactions";

import styles from "../styles/FeedPage.module.css";

export const CommentItem = ({
    comment,
    reactionState,
    actionState,
    onToggleReaction,
    onStartEditing,
    onCancelEditing,
    onEditCommentChange,
    onSubmitEditedComment,
    onDeleteComment,
}) => {
    const authorName = getCommentAuthorName(comment);
    const content = getCommentContent(comment);
    const createdAt = getCommentCreatedAt(comment);
    const avatarLetter = authorName.charAt(0).toUpperCase();

    return (
        <article className={styles.commentItem}>
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

                {actionState.isEditing ? (
                    <Box className={styles.commentEditForm}>
                        <TextField
                            multiline
                            minRows={2}
                            className={styles.commentInput}
                            value={actionState.draft}
                            placeholder={FEED_TEXTS.COMMENTS.EDIT_PLACEHOLDER}
                            onChange={(event) =>
                                onEditCommentChange(event.target.value)
                            }
                        />

                        {actionState.error ? (
                            <Alert severity="error" className={styles.commentFormAlert}>
                                {actionState.error}
                            </Alert>
                        ) : null}

                        <Box className={styles.commentEditActions}>
                            <Button
                                className={styles.secondaryButton}
                                disabled={actionState.updating}
                                onClick={onCancelEditing}
                            >
                                {FEED_TEXTS.COMMENTS.CANCEL_BUTTON}
                            </Button>

                            <Button
                                className={styles.commentSubmitButton}
                                disabled={actionState.updating}
                                onClick={onSubmitEditedComment}
                            >
                                {actionState.updating
                                    ? FEED_TEXTS.COMMENTS.SAVING_BUTTON
                                    : FEED_TEXTS.COMMENTS.SAVE_BUTTON}
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <>
                        {content ? (
                            <Typography className={styles.commentContent}>
                                {content}
                            </Typography>
                        ) : null}

                        {actionState.isOwner ? (
                            <Box className={styles.commentActions}>
                                <Button
                                    className={styles.commentActionButton}
                                    disabled={actionState.deleting}
                                    onClick={onStartEditing}
                                >
                                    {FEED_TEXTS.COMMENTS.EDIT_BUTTON}
                                </Button>

                                <Button
                                    className={styles.commentDeleteButton}
                                    disabled={actionState.deleting}
                                    onClick={onDeleteComment}
                                >
                                    {FEED_TEXTS.COMMENTS.DELETE_BUTTON}
                                </Button>
                            </Box>
                        ) : null}

                        {actionState.error ? (
                            <Alert severity="error" className={styles.commentFormAlert}>
                                {actionState.error}
                            </Alert>
                        ) : null}
                    </>
                )}

                <CommentReactions
                    reactionState={reactionState}
                    onToggleReaction={onToggleReaction}
                />
            </Box>
        </article>
    );
};

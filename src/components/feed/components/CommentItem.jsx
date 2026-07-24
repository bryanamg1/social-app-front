import { Alert, Avatar, Box, Button, TextField, Typography } from "@mui/material";

import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { FEED_TEXTS, REPORT_TARGET_TYPES, REPORT_TEXTS } from "../../../constants";
import {
    formatCommentDate,
    getCommentAuthorName,
    getCommentContent,
    getCommentCreatedAt,
    getCommentId,
} from "../utils/postAdapter";
import { ReportDialog } from "../../reports/components/ReportDialog";
import { useReportDialog } from "../../reports/hooks/useReportDialog";
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
    currentUserId,
}) => {
    const authorName = getCommentAuthorName(comment);
    const content = getCommentContent(comment);
    const createdAt = getCommentCreatedAt(comment);
    const avatarLetter = authorName.charAt(0).toUpperCase();
    const commentId = getCommentId(comment);
    const report = useReportDialog({
        targetType: REPORT_TARGET_TYPES.COMMENT,
        targetId: commentId,
        enabled: Boolean(currentUserId) && !actionState.isOwner && Boolean(commentId),
    });

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

                        <Box className={styles.commentActions}>
                            {actionState.isOwner ? (
                                <>
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
                                </>
                            ) : currentUserId ? (
                                <Button
                                    className={styles.commentActionButton}
                                    startIcon={<FlagOutlinedIcon />}
                                    onClick={report.openDialog}
                                >
                                    {REPORT_TEXTS.BUTTON}
                                </Button>
                            ) : null}
                        </Box>

                        {actionState.error ? (
                            <Alert severity="error" className={styles.commentFormAlert}>
                                {actionState.error}
                            </Alert>
                        ) : null}

                        {!actionState.isOwner && currentUserId ? (
                            <ReportDialog report={report} />
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

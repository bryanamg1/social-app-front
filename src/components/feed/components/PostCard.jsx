import { useEffect, useId, useRef } from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { FEED_TEXTS, REPORT_TARGET_TYPES, ROUTES } from "../../../constants";
import {
    formatPostDate,
    getPostAuthorName,
    getPostContent,
    getPostCreatedAt,
    getPostId,
    getPostImage,
    getPostOwnerId,
    getPostPinnedState,
    getPostType,
} from "../utils/postAdapter";
import { ReportDialog } from "../../reports/components/ReportDialog";
import { useReportDialog } from "../../reports/hooks/useReportDialog";
import { PostActionBar } from "./PostActionBar";
import { PostCommentForm } from "./PostCommentForm";
import { PostComments } from "./PostComments";
import { PostEditForm } from "./PostEditForm";
import { PostReactions } from "./PostReactions";
import { PostTypeBadge } from "./PostTypeBadge";

import styles from "../styles/FeedPage.module.css";

const getCommentsCountLabel = (commentsCount) => {
    const label =
        commentsCount === 1
            ? FEED_TEXTS.COMMENTS.COMMENT_SINGULAR
            : FEED_TEXTS.COMMENTS.COMMENT_PLURAL;

    return `${commentsCount} ${label}`;
};

export const PostCard = ({
    postKey,
    post,
    isOwner,
    currentUserId,
    deletingPostId,
    commentsOpen,
    comments,
    loadingComments,
    commentsError,
    commentForm,
    reactionState,
    postActionState,
    onDeletePost,
    onToggleComments,
    onCommentChange,
    onSubmitComment,
    onToggleReaction,
    onStartEditingPost,
    onCancelEditingPost,
    onPostDraftChange,
    onSubmitPostEdit,
    onToggleSavedPost,
    onTogglePinnedPost,
    getCommentActionState,
    onStartEditingComment,
    onCancelEditingComment,
    onEditCommentChange,
    onSubmitEditedComment,
    onDeleteComment,
    isHighlighted = false,
}) => {
    const postId = getPostId(post);
    const ownerId = getPostOwnerId(post);
    const authorName = getPostAuthorName(post);
    const content = getPostContent(post);
    const image = getPostImage(post);
    const createdAt = getPostCreatedAt(post);
    const postType = getPostType(post);
    const isPinned = getPostPinnedState(post);

    const isDeleting = String(deletingPostId) === String(postId);
    const avatarLetter = authorName.charAt(0).toUpperCase();
    const commentsCount = comments?.length ?? 0;
    const commentsSectionId = useId();
    const commentsTitleId = useId();
    const postCardRef = useRef(null);
    const report = useReportDialog({
        targetType: REPORT_TARGET_TYPES.POST,
        targetId: postId,
        enabled: Boolean(currentUserId) && !isOwner && Boolean(postId),
    });

    useEffect(() => {
        if (!isHighlighted || !postCardRef.current) {
            return;
        }

        postCardRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [isHighlighted]);

    return (
        <Card
            ref={postCardRef}
            className={
                isHighlighted
                    ? `${styles.postCard} ${styles.postCardHighlighted}`
                    : styles.postCard
            }
            data-post-id={postId}
        >
            <CardContent>
                <Box className={styles.postHeader}>
                    <Box className={styles.authorInfo}>
                        <Avatar className={styles.avatar}>{avatarLetter}</Avatar>

                        <Box>
                            {ownerId ? (
                                <Typography
                                    component={Link}
                                    to={ROUTES.USER_PROFILE(ownerId)}
                                    className={styles.authorNameLink}
                                >
                                    {authorName}
                                </Typography>
                            ) : (
                                <Typography className={styles.authorName}>
                                    {authorName}
                                </Typography>
                            )}

                            <Typography className={styles.postDate}>
                                {formatPostDate(createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {postActionState.isEditing ? (
                    <PostEditForm
                        draft={postActionState.draft}
                        updating={postActionState.updating}
                        error={postActionState.error}
                        onChange={(field, value) =>
                            onPostDraftChange(postId, field, value)
                        }
                        onCancel={() => onCancelEditingPost(postId)}
                        onSubmit={() => onSubmitPostEdit(post)}
                    />
                ) : (
                    <>
                        {content ? (
                            <Typography className={styles.postContent}>
                                {content}
                            </Typography>
                        ) : null}

                        {postType ? (
                            <Box className={styles.postMeta}>
                                <PostTypeBadge postType={postType} />
                            </Box>
                        ) : null}
                    </>
                )}

                {image ? (
                    <Box className={styles.postImageWrapper}>
                        <img
                            src={image}
                            alt={FEED_TEXTS.POSTS.IMAGE_ALT}
                            className={styles.postImage}
                        />
                    </Box>
                ) : null}

                <PostReactions
                    reactionState={reactionState}
                    onToggleReaction={onToggleReaction}
                />

                <PostActionBar
                    commentsOpen={commentsOpen}
                    isOwner={isOwner}
                    isEditing={postActionState.isEditing}
                    isPinned={isPinned}
                    isSaved={postActionState.isSaved}
                    isDeleting={isDeleting}
                    isPinning={postActionState.pinning}
                    isSaving={postActionState.saving}
                    onDelete={() => onDeletePost(postId)}
                    onStartEditing={() => onStartEditingPost(post)}
                    onToggleComments={onToggleComments}
                    onTogglePinned={() => onTogglePinnedPost(post)}
                    onToggleSaved={() => onToggleSavedPost(postId)}
                    onReport={report.openDialog}
                />

                {!isOwner ? <ReportDialog report={report} /> : null}

                <Box className={styles.commentsSummary}>
                    <Typography className={styles.commentsCount}>
                        {getCommentsCountLabel(commentsCount)}
                    </Typography>
                </Box>

                {commentsOpen ? (
                    <section
                        id={commentsSectionId}
                        className={styles.commentsPanel}
                        aria-label={FEED_TEXTS.COMMENTS.SECTION_ARIA}
                        aria-labelledby={commentsTitleId}
                    >
                        <Typography id={commentsTitleId} className={styles.commentsTitle}>
                            {FEED_TEXTS.COMMENTS.TITLE}
                        </Typography>

                        <PostCommentForm
                            value={commentForm.value}
                            canSubmit={commentForm.canSubmit}
                            creating={commentForm.creating}
                            error={commentForm.error}
                            onChange={onCommentChange}
                            onSubmit={onSubmitComment}
                        />

                        <PostComments
                            postKey={postKey}
                            comments={comments}
                            loading={loadingComments}
                            error={commentsError}
                            currentUserId={currentUserId}
                            getCommentActionState={getCommentActionState}
                            onStartEditingComment={onStartEditingComment}
                            onCancelEditingComment={onCancelEditingComment}
                            onEditCommentChange={onEditCommentChange}
                            onSubmitEditedComment={onSubmitEditedComment}
                            onDeleteComment={onDeleteComment}
                        />
                    </section>
                ) : null}
            </CardContent>
        </Card>
    );
};

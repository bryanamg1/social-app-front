import { Alert, Box, Button, Typography } from "@mui/material";

import { FEED_KEYS, FEED_TEXTS } from "../../../constants";
import { usePostCardActions } from "../hooks/usePostCardActions";
import { usePostComments } from "../hooks/usePostComments";
import { usePostReactions } from "../hooks/usePostReactions";
import {
    getPostComments,
    getPostCreatedAt,
    getPostId,
    getPostOwnerId,
} from "../utils/postAdapter";
import { FeedEmptySuggestions } from "./FeedEmptySuggestions";
import { PostCard } from "./PostCard";
import { PostListSkeleton } from "./PostListSkeleton";

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
    currentUser,
    currentUserId,
    loadingPosts,
    loadingMorePosts,
    deletingPostId,
    error,
    paginationError,
    hasMore,
    emptyTitle,
    emptyDescription,
    withSuggestions = false,
    onDeletePost,
    onLoadMorePosts,
    onUpdatePost,
    onTogglePinnedPost,
    onToggleSavedPost,
    savedPosts,
}) => {
    const {
        getCommentFormState,
        getCommentsState,
        getCommentActionState,
        handleCommentDraftChange,
        startEditingComment,
        cancelEditingComment,
        handleEditCommentDraftChange,
        submitEditedComment,
        deleteComment,
        isCommentsOpen,
        submitComment,
        toggleComments,
    } = usePostComments();
    const { getReactionState, handleToggleReaction } = usePostReactions({
        posts,
        currentUserId,
    });
    const {
        getPostActionState,
        startEditingPost,
        cancelEditingPost,
        handlePostDraftChange,
        submitPostEdit,
        handleTogglePinnedPost,
        handleToggleSavedPost,
    } = usePostCardActions({
        isSavedPost: savedPosts?.isSavedPost ?? (() => false),
        isSavingPost: (postId) =>
            savedPosts?.savingPostIds?.has(String(postId)) ?? false,
        onTogglePinnedPost,
        onToggleSavedPost,
        onUpdatePost,
    });

    if (loadingPosts) {
        return <PostListSkeleton />;
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
                <Typography variant="h6">
                    {emptyTitle || FEED_TEXTS.POSTS.EMPTY_TITLE}
                </Typography>

                <Typography>
                    {emptyDescription || FEED_TEXTS.POSTS.EMPTY_DESCRIPTION}
                </Typography>

                {withSuggestions ? (
                    <div className={styles.emptySuggestions}>
                        <FeedEmptySuggestions />
                    </div>
                ) : null}
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
                const postActionState = getPostActionState(post);

                return (
                    <PostCard
                        key={postKey}
                        postKey={postKey}
                        post={post}
                        isOwner={isOwner}
                        currentUserId={currentUserId}
                        deletingPostId={deletingPostId}
                        commentsOpen={isCommentsOpen(postKey)}
                        comments={commentsState.comments}
                        loadingComments={commentsState.loading}
                        commentsError={commentsState.error}
                        commentForm={commentFormState}
                        reactionState={reactionState}
                        postActionState={postActionState}
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
                                currentUser,
                                userId: currentUserId,
                            })
                        }
                        onStartEditingPost={startEditingPost}
                        onCancelEditingPost={cancelEditingPost}
                        onPostDraftChange={handlePostDraftChange}
                        onSubmitPostEdit={submitPostEdit}
                        onToggleSavedPost={handleToggleSavedPost}
                        onTogglePinnedPost={handleTogglePinnedPost}
                        getCommentActionState={getCommentActionState}
                        onStartEditingComment={startEditingComment}
                        onCancelEditingComment={cancelEditingComment}
                        onEditCommentChange={handleEditCommentDraftChange}
                        onSubmitEditedComment={submitEditedComment}
                        onDeleteComment={deleteComment}
                    />
                );
            })}

            <Box className={styles.paginationActions}>
                {paginationError ? (
                    <Alert severity="error" className={styles.paginationAlert}>
                        {paginationError}
                    </Alert>
                ) : null}

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

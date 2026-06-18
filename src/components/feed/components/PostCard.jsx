import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import { FEED_REACTION_OPTIONS, FEED_TEXTS } from "../../../constants";
import {
  formatPostDate,
  getPostAuthorName,
  getPostContent,
  getPostCreatedAt,
  getPostId,
  getPostImage,
} from "../utils/postAdapter";
import { PostCommentForm } from "./PostCommentForm";
import { PostComments } from "./PostComments";

import styles from "../styles/FeedPage.module.css";

const getCommentsCountLabel = (commentsCount) => {
    const label =
        commentsCount === 1
        ? FEED_TEXTS.COMMENTS.COMMENT_SINGULAR
        : FEED_TEXTS.COMMENTS.COMMENT_PLURAL;

    return `${commentsCount} ${label}`;
};

export const PostCard = ({
    post,
    isOwner,
    deletingPostId,
    commentsOpen,
    comments,
    loadingComments,
    commentsError,
    commentForm,
    onDeletePost,
    onToggleComments,
    onCommentChange,
    onSubmitComment,
    }) => {
    const postId = getPostId(post);
    const authorName = getPostAuthorName(post);
    const content = getPostContent(post);
    const image = getPostImage(post);
    const createdAt = getPostCreatedAt(post);

    const isDeleting = String(deletingPostId) === String(postId);
    const avatarLetter = authorName.charAt(0).toUpperCase();
    const commentsCount = comments?.length ?? 0;

    return (
        <Card className={styles.postCard}>
        <CardContent>
            <Box className={styles.postHeader}>
            <Box className={styles.authorInfo}>
                <Avatar className={styles.avatar}>{avatarLetter}</Avatar>

                <Box>
                <Typography className={styles.authorName}>{authorName}</Typography>

                <Typography className={styles.postDate}>
                    {formatPostDate(createdAt)}
                </Typography>
                </Box>
            </Box>

            {isOwner && (
                <IconButton
                onClick={() => onDeletePost(postId)}
                disabled={isDeleting}
                className={styles.deleteButton}
                aria-label={FEED_TEXTS.POSTS.DELETE_ARIA}
                >
                <DeleteOutlineIcon />
                </IconButton>
            )}
            </Box>

            {content && (
            <Typography className={styles.postContent}>{content}</Typography>
            )}

            {image && (
            <Box className={styles.postImageWrapper}>
                <img
                src={image}
                alt={FEED_TEXTS.POSTS.IMAGE_ALT}
                className={styles.postImage}
                />
            </Box>
            )}

            <Box className={styles.postMeta}>
            {FEED_REACTION_OPTIONS.map((reaction) => (
                <Chip
                key={reaction}
                label={reaction}
                size="small"
                className={styles.reactionChip}
                />
            ))}
            </Box>

            <Box className={styles.postActions}>
            <Button
                startIcon={<ThumbUpOffAltIcon />}
                className={styles.actionButton}
            >
                {FEED_TEXTS.POSTS.REACT_BUTTON}
            </Button>

            <Button
                startIcon={<ChatBubbleOutlineIcon />}
                endIcon={commentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                className={styles.actionButton}
                onClick={onToggleComments}
                aria-expanded={commentsOpen}
                aria-label={
                commentsOpen
                    ? FEED_TEXTS.COMMENTS.HIDE_ARIA
                    : FEED_TEXTS.COMMENTS.SHOW_ARIA
                }
            >
                {commentsOpen
                ? FEED_TEXTS.COMMENTS.HIDE_BUTTON
                : FEED_TEXTS.COMMENTS.SHOW_BUTTON}
            </Button>
            </Box>

            <Box className={styles.commentsSummary}>
            <Typography className={styles.commentsCount}>
                {getCommentsCountLabel(commentsCount)}
            </Typography>
            </Box>

            {commentsOpen && (
            <section className={styles.commentsPanel}>
                <Typography className={styles.commentsTitle}>
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
                comments={comments}
                loading={loadingComments}
                error={commentsError}
                />
            </section>
            )}
        </CardContent>
        </Card>
    );
};

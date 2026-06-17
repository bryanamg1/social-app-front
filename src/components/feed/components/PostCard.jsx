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

import { FEED_REACTION_OPTIONS, FEED_TEXTS } from "../../../constants";
import {
  formatPostDate,
  getPostAuthorName,
  getPostContent,
  getPostCreatedAt,
  getPostId,
  getPostImage,
} from "../utils/postAdapter";

import styles from "../styles/FeedPage.module.css";

export const PostCard = ({ post, isOwner, deletingPostId, onDeletePost }) => {
    const postId = getPostId(post);
    const authorName = getPostAuthorName(post);
    const content = getPostContent(post);
    const image = getPostImage(post);
    const createdAt = getPostCreatedAt(post);

    const isDeleting = String(deletingPostId) === String(postId);
    const avatarLetter = authorName.charAt(0).toUpperCase();

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
                <span aria-hidden="true">🗑️</span>
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
                startIcon={<span aria-hidden="true">👍</span>}
                className={styles.actionButton}
            >
                {FEED_TEXTS.POSTS.REACT_BUTTON}
            </Button>

            <Button
                startIcon={<span aria-hidden="true">💬</span>}
                className={styles.actionButton}
            >
                {FEED_TEXTS.POSTS.COMMENTS_BUTTON}
            </Button>
            </Box>
        </CardContent>
        </Card>
    );
};
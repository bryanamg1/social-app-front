import { Box, Button } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

import { FEED_TEXTS } from "../../../constants";

import styles from "../styles/FeedPage.module.css";

export const PostActionBar = ({
    commentsOpen,
    isOwner,
    isEditing,
    isPinned,
    isSaved,
    isDeleting,
    isPinning,
    isSaving,
    onDelete,
    onStartEditing,
    onToggleComments,
    onTogglePinned,
    onToggleSaved,
}) => {
    return (
        <Box className={styles.postActions}>
            <Box className={styles.postActionGroup}>
                <Button
                    startIcon={<ChatBubbleOutlineOutlinedIcon />}
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

                <Button
                    startIcon={
                        isSaved ? <BookmarkAddedOutlinedIcon /> : <BookmarkAddOutlinedIcon />
                    }
                    className={styles.actionButton}
                    disabled={isSaving}
                    onClick={onToggleSaved}
                >
                    {isSaved
                        ? FEED_TEXTS.POSTS.UNSAVE_POST_BUTTON
                        : FEED_TEXTS.POSTS.SAVE_POST_BUTTON}
                </Button>
            </Box>

            {isOwner ? (
                <Box className={styles.postActionGroup}>
                    {!isEditing ? (
                        <Button
                            startIcon={<EditOutlinedIcon />}
                            className={styles.actionButton}
                            onClick={onStartEditing}
                        >
                            {FEED_TEXTS.POSTS.EDIT_BUTTON}
                        </Button>
                    ) : null}

                    <Button
                        startIcon={<PushPinOutlinedIcon />}
                        className={styles.actionButton}
                        disabled={isPinning}
                        onClick={onTogglePinned}
                    >
                        {isPinned
                            ? FEED_TEXTS.POSTS.UNPIN_POST_BUTTON
                            : FEED_TEXTS.POSTS.PIN_POST_BUTTON}
                    </Button>

                    <Button
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        className={styles.deleteActionButton}
                        disabled={isDeleting}
                        onClick={onDelete}
                    >
                        {FEED_TEXTS.POSTS.DELETE_ARIA}
                    </Button>
                </Box>
            ) : null}
        </Box>
    );
};

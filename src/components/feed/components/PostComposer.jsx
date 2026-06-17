import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { FEED_TEXTS } from "../../../constants";
import styles from "../styles/FeedPage.module.css";

export const PostComposer = ({
  user,
  content,
  imagePreview,
  creatingPost,
  canSubmit,
  onContentChange,
  onImageChange,
  onRemoveImage,
  onSubmit,
}) => {
    const avatarLetter = user?.email?.charAt(0)?.toUpperCase() || "U";

    return (
        <Card className={styles.composerCard}>
        <CardContent>
            <Box className={styles.composerHeader}>
            <Avatar className={styles.avatar}>{avatarLetter}</Avatar>

            <Box className={styles.composerInputWrapper}>
                <TextField
                fullWidth
                multiline
                minRows={2}
                maxRows={6}
                value={content}
                onChange={onContentChange}
                placeholder={FEED_TEXTS.COMPOSER.PLACEHOLDER}
                variant="outlined"
                className={styles.composerInput}
                />
            </Box>
            </Box>

            {imagePreview && (
            <Box className={styles.previewWrapper}>
                <img
                src={imagePreview}
                alt={FEED_TEXTS.COMPOSER.PREVIEW_ALT}
                className={styles.previewImage}
                />

                <IconButton
                className={styles.removeImageButton}
                onClick={onRemoveImage}
                aria-label={FEED_TEXTS.COMPOSER.REMOVE_IMAGE_ARIA}
                >
                <CloseIcon />
                </IconButton>
            </Box>
            )}

            <Box className={styles.composerActions}>
            <Button
                component="label"
                startIcon={<ImageOutlinedIcon />}
                className={styles.secondaryButton}
            >
                {FEED_TEXTS.COMPOSER.IMAGE_BUTTON}
                <input
                hidden
                type="file"
                accept="image/*"
                onChange={onImageChange}
                />
            </Button>

            <Button
                variant="contained"
                disabled={!canSubmit || creatingPost}
                onClick={onSubmit}
                className={styles.primaryButton}
            >
                {creatingPost
                ? FEED_TEXTS.COMPOSER.SUBMITTING_BUTTON
                : FEED_TEXTS.COMPOSER.SUBMIT_BUTTON}
            </Button>
            </Box>

            <Typography className={styles.helperText}>
            {FEED_TEXTS.COMPOSER.HELPER_TEXT}
            </Typography>
        </CardContent>
        </Card>
    );
};
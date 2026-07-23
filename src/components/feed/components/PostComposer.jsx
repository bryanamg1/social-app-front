import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  FEED_POST_TYPE_OPTIONS,
  FEED_TEXTS,
  LAYOUT_TEXTS,
} from "../../../constants";
import styles from "../styles/FeedPage.module.css";

export const PostComposer = ({
  user,
  content,
  postType,
  imagePreview,
  creatingPost,
  canSubmit,
  onContentChange,
  onPostTypeChange,
  onImageChange,
  onRemoveImage,
  onSubmit,
}) => {
    const imageInputRef = useRef(null);
    const avatarLetter =
        user?.email?.charAt(0)?.toUpperCase() ||
        LAYOUT_TEXTS.DEFAULT_USER.charAt(0).toUpperCase();

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

            <Box className={styles.composerControls}>
            <TextField
                select
                fullWidth
                value={postType}
                onChange={onPostTypeChange}
                label={FEED_TEXTS.COMPOSER.TYPE_LABEL}
                className={styles.composerSelect}
            >
                {FEED_POST_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
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
            <input
                ref={imageInputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={onImageChange}
            />

            <Button
                type="button"
                startIcon={<ImageOutlinedIcon />}
                className={styles.secondaryButton}
                onClick={() => imageInputRef.current?.click()}
            >
                {FEED_TEXTS.COMPOSER.IMAGE_BUTTON}
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

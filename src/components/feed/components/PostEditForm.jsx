import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import { FEED_POST_TYPE_OPTIONS, FEED_TEXTS } from "../../../constants";

import styles from "../styles/FeedPage.module.css";

export const PostEditForm = ({
    draft,
    updating,
    error,
    onChange,
    onCancel,
    onSubmit,
}) => {
    return (
        <Box className={styles.postEditForm}>
            <TextField
                multiline
                minRows={3}
                className={styles.commentInput}
                label={FEED_TEXTS.POSTS.EDIT_CONTENT_LABEL}
                value={draft.content}
                onChange={(event) => onChange("content", event.target.value)}
            />

            <FormControl className={styles.composerSelect}>
                <InputLabel>{FEED_TEXTS.POSTS.EDIT_TYPE_LABEL}</InputLabel>
                <Select
                    label={FEED_TEXTS.POSTS.EDIT_TYPE_LABEL}
                    value={draft.postType}
                    onChange={(event) => onChange("postType", event.target.value)}
                >
                    {FEED_POST_TYPE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {error ? (
                <Alert severity="error" className={styles.commentFormAlert}>
                    {error}
                </Alert>
            ) : null}

            <Box className={styles.postEditActions}>
                <Button
                    className={styles.secondaryButton}
                    disabled={updating}
                    onClick={onCancel}
                >
                    {FEED_TEXTS.POSTS.CANCEL_BUTTON}
                </Button>

                <Button
                    className={styles.primaryButton}
                    disabled={updating}
                    onClick={onSubmit}
                >
                    {updating
                        ? FEED_TEXTS.POSTS.SAVING_BUTTON
                        : FEED_TEXTS.POSTS.SAVE_BUTTON}
                </Button>
            </Box>
        </Box>
    );
};

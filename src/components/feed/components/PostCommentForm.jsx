import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import { FEED_TEXTS } from "../../../constants";

import styles from "../styles/FeedPage.module.css";

export const PostCommentForm = ({
    value,
    canSubmit,
    creating,
    error,
    onChange,
    onSubmit,
}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <Box component="form" className={styles.commentForm} onSubmit={handleSubmit}>
        <TextField
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={FEED_TEXTS.COMMENTS.INPUT_PLACEHOLDER}
            className={styles.commentInput}
            multiline
            minRows={2}
            fullWidth
        />

        {error && (
            <Alert severity="error" className={styles.commentFormAlert}>
            {error}
            </Alert>
        )}

        <Box className={styles.commentFormActions}>
            <Button
            type="submit"
            className={styles.commentSubmitButton}
            startIcon={
                creating ? <CircularProgress size={16} /> : <SendOutlinedIcon />
            }
            disabled={!canSubmit || creating}
            >
            {creating
                ? FEED_TEXTS.COMMENTS.SUBMITTING_BUTTON
                : FEED_TEXTS.COMMENTS.SUBMIT_BUTTON}
            </Button>
        </Box>
        </Box>
    );
};

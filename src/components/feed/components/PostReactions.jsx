import { Alert, Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import { FEED_REACTION_OPTIONS, FEED_TEXTS } from "../../../constants";

import styles from "../styles/FeedPage.module.css";

const ICONS_BY_KEY = {
    like: <ThumbUpOffAltIcon />,
    dislike: <ThumbDownOffAltOutlinedIcon />,
    love: <FavoriteBorderOutlinedIcon />,
    haha: <SentimentVerySatisfiedOutlinedIcon />,
    wow: <SentimentSatisfiedAltOutlinedIcon />,
    sad: <SentimentVeryDissatisfiedOutlinedIcon />,
};

export const PostReactions = ({ reactionState, onToggleReaction }) => {
    const summaryItems = FEED_REACTION_OPTIONS.filter(
        (reaction) => reactionState.counts[reaction.type]
    );
    const actionDisabled = reactionState.loading || reactionState.toggling;

    return (
        <Box className={styles.reactionsBlock}>
        <Box className={styles.reactionsSummary}>
            {reactionState.loading ? (
            <Box className={styles.reactionsLoadingState}>
                <CircularProgress size={16} />
                <Typography className={styles.reactionsLoadingText}>
                {FEED_TEXTS.REACTIONS.LOADING}
                </Typography>
            </Box>
            ) : summaryItems.length ? (
            summaryItems.map((reaction) => (
                <Chip
                key={reaction.type}
                label={`${reaction.label} ${reactionState.counts[reaction.type]}`}
                size="small"
                className={styles.reactionChip}
                />
            ))
            ) : (
            <Typography className={styles.reactionsEmptyText}>
                {FEED_TEXTS.REACTIONS.EMPTY_SUMMARY}
            </Typography>
            )}
        </Box>

        {reactionState.error && (
            <Alert severity="error" className={styles.reactionsAlert}>
            {reactionState.error}
            </Alert>
        )}

        {!reactionState.error &&
        !reactionState.loading &&
        reactionState.activeReaction ? (
            <Typography className={styles.helperText}>
            {`${FEED_TEXTS.REACTIONS.ACTIVE_SUMMARY_PREFIX}: ${reactionState.activeReaction}`}
            </Typography>
        ) : null}

        <Box className={styles.reactionActions}>
            {FEED_REACTION_OPTIONS.map((reaction) => {
            const isActive = reactionState.activeReaction === reaction.type;

            return (
                <Button
                key={reaction.type}
                className={
                    isActive ? styles.reactionButtonActive : styles.reactionButton
                }
                startIcon={ICONS_BY_KEY[reaction.iconKey]}
                disabled={actionDisabled}
                onClick={() => onToggleReaction(reaction.type)}
                aria-label={`${FEED_TEXTS.REACTIONS.TOGGLE_ARIA_PREFIX} ${reaction.label}`}
                >
                {reaction.label}
                </Button>
            );
            })}
        </Box>
        </Box>
    );
};

import { Alert, Box, Button, Chip, Typography } from "@mui/material";
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

export const CommentReactions = ({ reactionState, onToggleReaction }) => {
    const summaryItems = FEED_REACTION_OPTIONS.filter(
        (reaction) => reactionState.counts[reaction.type]
    );
    const actionDisabled = reactionState.loading || reactionState.toggling;

    return (
        <Box className={styles.commentReactionsBlock}>
            <Box
                className={styles.commentReactionsSummary}
                role="status"
                aria-live="polite"
                aria-label={FEED_TEXTS.COMMENT_REACTIONS.SUMMARY_ARIA}
            >
                {reactionState.loading ? (
                    <Typography className={styles.commentReactionsLoadingText}>
                        {FEED_TEXTS.COMMENT_REACTIONS.LOADING}
                    </Typography>
                ) : summaryItems.length ? (
                    summaryItems.map((reaction) => (
                        <Chip
                            key={reaction.type}
                            label={`${reaction.label} ${reactionState.counts[reaction.type]}`}
                            size="small"
                            className={styles.commentReactionChip}
                        />
                    ))
                ) : (
                    <Typography className={styles.commentReactionsEmptyText}>
                        {FEED_TEXTS.COMMENT_REACTIONS.EMPTY_SUMMARY}
                    </Typography>
                )}
            </Box>

            {reactionState.error ? (
                <Alert severity="error" className={styles.commentReactionsAlert}>
                    {reactionState.error}
                </Alert>
            ) : null}

            {!reactionState.error &&
            !reactionState.loading &&
            reactionState.activeReaction ? (
                <Typography className={styles.commentReactionsActiveText}>
                    {`${FEED_TEXTS.COMMENT_REACTIONS.ACTIVE_SUMMARY_PREFIX}: ${reactionState.activeReaction}`}
                </Typography>
            ) : null}

            <Box
                className={styles.commentReactionActions}
                role="group"
                aria-label={FEED_TEXTS.COMMENT_REACTIONS.GROUP_ARIA}
            >
                {FEED_REACTION_OPTIONS.map((reaction) => {
                    const isActive = reactionState.activeReaction === reaction.type;

                    return (
                        <Button
                            key={reaction.type}
                            className={
                                isActive
                                    ? styles.commentReactionButtonActive
                                    : styles.commentReactionButton
                            }
                            startIcon={ICONS_BY_KEY[reaction.iconKey]}
                            disabled={actionDisabled}
                            onClick={() => onToggleReaction(reaction.type)}
                            aria-pressed={isActive}
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

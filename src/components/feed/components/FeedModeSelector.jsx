import { Box, Button, Typography } from "@mui/material";

import { FEED_MODE_OPTIONS, FEED_TEXTS } from "../../../constants";

import styles from "../styles/FeedPage.module.css";

export const FeedModeSelector = ({ selectedMode, onSelectMode }) => {
    const activeMode =
        FEED_MODE_OPTIONS.find((option) => option.value === selectedMode) ??
        FEED_MODE_OPTIONS[0];

    return (
        <Box className={styles.modePanel}>
            <Typography className={styles.modeTitle}>
                {FEED_TEXTS.MODES.TITLE}
            </Typography>

            <Box
                className={styles.modeActions}
                role="tablist"
                aria-label={FEED_TEXTS.MODES.TITLE}
            >
                {FEED_MODE_OPTIONS.map((option) => {
                    const isActive = option.value === selectedMode;

                    return (
                        <Button
                            key={option.value}
                            className={
                                isActive ? styles.modeButtonActive : styles.modeButton
                            }
                            onClick={() => onSelectMode(option.value)}
                            aria-pressed={isActive}
                        >
                            {option.label}
                        </Button>
                    );
                })}
            </Box>

            <Typography className={styles.modeDescription}>
                {activeMode.description}
            </Typography>
        </Box>
    );
};

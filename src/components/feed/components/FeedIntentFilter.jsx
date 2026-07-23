import { Box, Button, Typography } from "@mui/material";

import { FEED_POST_TYPE_FILTER_OPTIONS, FEED_TEXTS } from "../../../constants";
import styles from "../styles/FeedPage.module.css";

export function FeedIntentFilter({
    selectedPostType,
    onSelectPostType,
}) {
    return (
        <Box className={styles.filterPanel}>
            <Typography className={styles.filterTitle}>
                {FEED_TEXTS.FILTERS.TITLE}
            </Typography>

            <Box className={styles.filterActions}>
                {FEED_POST_TYPE_FILTER_OPTIONS.map((option) => {
                    const isActive = option.value === selectedPostType;

                    return (
                        <Button
                            key={option.value}
                            type="button"
                            variant={isActive ? "contained" : "outlined"}
                            className={
                                isActive
                                    ? styles.filterButtonActive
                                    : styles.filterButton
                            }
                            onClick={() => onSelectPostType(option.value)}
                        >
                            {option.label}
                        </Button>
                    );
                })}
            </Box>
        </Box>
    );
}

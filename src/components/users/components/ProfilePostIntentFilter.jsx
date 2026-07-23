import { Chip, Typography } from "@mui/material";

import {
    FEED_POST_TYPE_FILTER_OPTIONS,
    PROFILE_TEXTS,
} from "../../../constants";
import styles from "../pages/ProfilePage.module.css";

export function ProfilePostIntentFilter({
    selectedPostType,
    onSelectPostType,
}) {
    return (
        <div className={styles.postIntentFilter}>
            <Typography className={styles.postIntentFilterLabel}>
                {PROFILE_TEXTS.POSTS.FILTER_LABEL}
            </Typography>

            <div className={styles.postIntentFilterChips}>
                {FEED_POST_TYPE_FILTER_OPTIONS.map((option) => (
                    <Chip
                        key={option.value}
                        label={option.label}
                        size="small"
                        clickable
                        color={
                            selectedPostType === option.value
                                ? "primary"
                                : "default"
                        }
                        variant={
                            selectedPostType === option.value
                                ? "filled"
                                : "outlined"
                        }
                        onClick={() => onSelectPostType(option.value)}
                    />
                ))}
            </div>
        </div>
    );
}

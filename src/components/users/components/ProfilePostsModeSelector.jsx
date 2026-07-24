import { Chip, Typography } from "@mui/material";

import {
    PROFILE_POST_VIEW_OPTIONS,
    PROFILE_TEXTS,
} from "../../../constants";
import styles from "../pages/ProfilePage.module.css";

export function ProfilePostsModeSelector({
    selectedPostsView,
    onSelectPostsView,
}) {
    return (
        <div className={styles.postIntentFilter}>
            <Typography className={styles.postIntentFilterLabel}>
                {PROFILE_TEXTS.POSTS.VIEW_LABEL}
            </Typography>

            <div className={styles.postIntentFilterChips}>
                {PROFILE_POST_VIEW_OPTIONS.map((option) => (
                    <Chip
                        key={option.value}
                        label={option.label}
                        size="small"
                        clickable
                        color={
                            selectedPostsView === option.value
                                ? "primary"
                                : "default"
                        }
                        variant={
                            selectedPostsView === option.value
                                ? "filled"
                                : "outlined"
                        }
                        onClick={() => onSelectPostsView(option.value)}
                    />
                ))}
            </div>
        </div>
    );
}

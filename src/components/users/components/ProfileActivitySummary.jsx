import { Chip, Typography } from "@mui/material";

import {
    PROFILE_TEXTS,
    getFeedPostTypeLabel,
} from "../../../constants";
import {
    getDominantPostType,
    getUserPostTypeSummary,
} from "../utils/userProfileAdapter";
import styles from "../pages/ProfilePage.module.css";

export function ProfileActivitySummary({ profile }) {
    const summary = getUserPostTypeSummary(profile).filter((entry) => entry.total > 0);
    const dominantPostType = getDominantPostType(profile);
    const totalPosts = Number(profile?.total_posts) || 0;

    return (
        <section className={styles.activitySection}>
            <div className={styles.activityHeader}>
                <div>
                    <Typography variant="h6" className={styles.activityTitle}>
                        {PROFILE_TEXTS.ACTIVITY.TITLE}
                    </Typography>
                    <Typography className={styles.activityDescription}>
                        {PROFILE_TEXTS.ACTIVITY.DESCRIPTION}
                    </Typography>
                </div>

                <Typography className={styles.activityTotal}>
                    {PROFILE_TEXTS.ACTIVITY.POSTS_TOTAL(totalPosts)}
                </Typography>
            </div>

            {summary.length ? (
                <>
                    {dominantPostType ? (
                        <div className={styles.activityDominantRow}>
                            <span className={styles.activityDominantLabel}>
                                {PROFILE_TEXTS.ACTIVITY.DOMINANT_PREFIX}
                            </span>
                            <Chip
                                size="small"
                                label={getFeedPostTypeLabel(dominantPostType)}
                                className={styles.activityDominantChip}
                            />
                        </div>
                    ) : null}

                    <div className={styles.activityChips}>
                        {summary.map((entry) => (
                            <Chip
                                key={entry.post_type}
                                size="small"
                                label={`${getFeedPostTypeLabel(entry.post_type)} (${entry.total})`}
                                className={styles.activityChip}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <Typography className={styles.activityEmpty}>
                    {PROFILE_TEXTS.ACTIVITY.EMPTY}
                </Typography>
            )}
        </section>
    );
}

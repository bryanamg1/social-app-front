import { Chip } from "@mui/material";

import { FEED_TEXTS, getFeedPostTypeLabel } from "../../../constants";
import styles from "../styles/FeedPage.module.css";

export function PostTypeBadge({ postType }) {
    return (
        <Chip
            size="small"
            label={`${FEED_TEXTS.POSTS.TYPE_BADGE_PREFIX}: ${getFeedPostTypeLabel(postType)}`}
            className={styles.postTypeBadge}
        />
    );
}

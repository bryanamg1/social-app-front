import { Skeleton } from "@mui/material";

import styles from "../styles/UserSuggestionsPanel.module.css";

const SKELETON_SUGGESTION_COUNT = 3;

export function UserSuggestionsSkeletonList() {
    return (
        <div className={styles.suggestionsList}>
            {Array.from({ length: SKELETON_SUGGESTION_COUNT }).map((_, index) => (
                <div
                    key={`suggestion-skeleton-${index}`}
                    className={styles.suggestionSkeletonItem}
                >
                    <div className={styles.suggestionUserLine}>
                        <Skeleton variant="circular" width={44} height={44} />

                        <div className={styles.suggestionSkeletonMeta}>
                            <Skeleton variant="text" width="56%" height={22} />
                            <Skeleton variant="text" width="82%" height={18} />
                            <Skeleton variant="text" width="34%" height={18} />
                        </div>
                    </div>

                    <div className={styles.suggestionActionRow}>
                        <Skeleton variant="rounded" width={92} height={30} />
                    </div>
                </div>
            ))}
        </div>
    );
}

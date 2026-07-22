import { Box, Skeleton } from "@mui/material";

import styles from "../styles/FeedPage.module.css";

const SKELETON_POST_COUNT = 3;

export function PostListSkeleton() {
    return (
        <Box className={styles.postsList}>
            {Array.from({ length: SKELETON_POST_COUNT }).map((_, index) => (
                <div key={`post-skeleton-${index}`} className={styles.postSkeletonCard}>
                    <div className={styles.postSkeletonHeader}>
                        <Skeleton variant="circular" width={44} height={44} />
                        <div className={styles.postSkeletonMeta}>
                            <Skeleton variant="text" width="38%" height={26} />
                            <Skeleton variant="text" width="24%" height={18} />
                        </div>
                    </div>

                    <Skeleton variant="text" width="92%" height={24} />
                    <Skeleton variant="text" width="84%" height={24} />
                    <Skeleton variant="text" width="62%" height={24} />
                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height={220}
                        className={styles.postSkeletonMedia}
                    />

                    <div className={styles.postSkeletonActions}>
                        <Skeleton variant="rounded" width={88} height={32} />
                        <Skeleton variant="rounded" width={108} height={32} />
                    </div>
                </div>
            ))}
        </Box>
    );
}

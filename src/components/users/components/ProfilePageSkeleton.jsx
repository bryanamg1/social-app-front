import { Skeleton } from "@mui/material";

import styles from "../pages/ProfilePage.module.css";

export function ProfilePageSkeleton() {
    return (
        <main className={styles.page}>
            <header className={styles.cover}>
                <Skeleton
                    variant="circular"
                    width={108}
                    height={108}
                    className={styles.profileSkeletonAvatar}
                />
            </header>

            <section className={styles.profileInfo}>
                <div className={styles.profileSkeletonStack}>
                    <Skeleton variant="text" width="34%" height={44} />
                    <Skeleton variant="text" width="48%" height={24} />
                </div>

                <div className={styles.profileMetaGrid}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={`profile-meta-skeleton-${index}`}>
                            <Skeleton variant="text" width="32%" height={18} />
                            <Skeleton variant="text" width="92%" height={24} />
                            <Skeleton variant="text" width="78%" height={24} />
                        </div>
                    ))}
                </div>

                <div className={styles.activitySection}>
                    <div className={styles.activityHeader}>
                        <div className={styles.profileSkeletonStack}>
                            <Skeleton variant="text" width={140} height={28} />
                            <Skeleton variant="text" width={320} height={20} />
                        </div>
                        <Skeleton variant="text" width={120} height={22} />
                    </div>

                    <div className={styles.activityChips}>
                        <Skeleton variant="rounded" width={110} height={28} />
                        <Skeleton variant="rounded" width={140} height={28} />
                        <Skeleton variant="rounded" width={126} height={28} />
                    </div>
                </div>
            </section>
        </main>
    );
}

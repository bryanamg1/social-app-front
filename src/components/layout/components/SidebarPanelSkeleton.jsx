import { Skeleton } from "@mui/material";

import styles from "../styles/MainLayout.module.css";

export function SidebarPanelSkeleton({ withSearch = false, lines = 3 }) {
    return (
        <section className={styles.sidebarSkeletonCard}>
            {withSearch ? (
                <div className={styles.sidebarSkeletonSearch}>
                    <Skeleton variant="text" width="22%" height={18} />
                    <Skeleton variant="rounded" width="100%" height={44} />
                </div>
            ) : null}

            <div className={styles.sidebarSkeletonBody}>
                <Skeleton variant="text" width="42%" height={24} />
                {Array.from({ length: lines }).map((_, index) => (
                    <Skeleton
                        key={`sidebar-skeleton-line-${index}`}
                        variant="text"
                        width={index === lines - 1 ? "62%" : "100%"}
                        height={18}
                    />
                ))}
            </div>
        </section>
    );
}

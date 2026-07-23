import { Skeleton } from "@mui/material";

import styles from "../styles/MessagesPage.module.css";

const SKELETON_CONVERSATION_COUNT = 5;

export function ConversationsListSkeleton() {
    return (
        <div className={styles.conversationsList} aria-hidden="true">
            {Array.from({ length: SKELETON_CONVERSATION_COUNT }).map((_, index) => (
                <div
                    key={`conversation-skeleton-${index}`}
                    className={styles.conversationSkeletonItem}
                >
                    <div className={styles.conversationMeta}>
                        <Skeleton variant="text" width="56%" height={24} />
                        <Skeleton variant="text" width="84%" height={18} />
                    </div>

                    <Skeleton variant="text" width={56} height={18} />
                </div>
            ))}
        </div>
    );
}

import { Skeleton } from "@mui/material";

import styles from "../styles/MessagesPage.module.css";

const THREAD_SKELETON_BUBBLES = [
    { alignment: "start", width: "64%" },
    { alignment: "end", width: "48%" },
    { alignment: "start", width: "58%" },
    { alignment: "end", width: "42%" },
];

export function MessageThreadSkeleton() {
    return (
        <div className={styles.threadSkeleton} aria-hidden="true">
            <div className={styles.threadSkeletonHeader}>
                <Skeleton variant="text" width="34%" height={30} />
                <Skeleton variant="text" width="42%" height={18} />
            </div>

            <div className={styles.messagesList}>
                {THREAD_SKELETON_BUBBLES.map((bubble, index) => (
                    <div
                        key={`message-thread-skeleton-${index}`}
                        className={
                            bubble.alignment === "end"
                                ? styles.messageRowOwn
                                : styles.messageRow
                        }
                    >
                        <div className={styles.messageSkeletonBubble}>
                            <Skeleton variant="text" width={bubble.width} height={22} />
                            <Skeleton variant="text" width="88%" height={20} />
                            <Skeleton variant="text" width={72} height={16} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { Suspense, lazy } from "react";

import {
    LAYOUT_TEXTS,
    RIGHT_SIDEBAR_TEXTS,
} from "../../../constants";
import { useUserSearch } from "../../users/hooks/useUserSearch";
import { useUserSuggestions } from "../../users/hooks/useUserSuggestions";
import { SidebarPanelSkeleton } from "./SidebarPanelSkeleton";

import styles from "../styles/MainLayout.module.css";

const UserSearchPanel = lazy(() =>
    import("./UserSearchPanel").then((module) => ({
        default: module.UserSearchPanel,
    }))
);
const UserSuggestionsPanel = lazy(() =>
    import("../../users/components/UserSuggestionsPanel").then((module) => ({
        default: module.UserSuggestionsPanel,
    }))
);

export function AuthenticatedRightSidebar({ currentUserId }) {
    const userSearch = useUserSearch({ currentUserId });
    const suggestionsState = useUserSuggestions({ currentUserId });

    return (
        <aside
            className={styles.rightSidebar}
            aria-label={LAYOUT_TEXTS.RIGHT_SIDEBAR_ARIA}
        >
            <div className={styles.rightSidebarInner}>
                <Suspense fallback={<SidebarPanelSkeleton withSearch lines={4} />}>
                    <UserSearchPanel search={userSearch} />
                </Suspense>

                <Suspense fallback={<SidebarPanelSkeleton lines={5} />}>
                    <UserSuggestionsPanel suggestionsState={suggestionsState} />
                </Suspense>

                <section className={styles.rightCard}>
                    <h3 className={styles.rightCardTitle}>
                        {RIGHT_SIDEBAR_TEXTS.TRENDING_TITLE}
                    </h3>

                    <p className={styles.rightCardText}>
                        {RIGHT_SIDEBAR_TEXTS.TRENDING_DESCRIPTION}
                    </p>
                </section>
            </div>
        </aside>
    );
}

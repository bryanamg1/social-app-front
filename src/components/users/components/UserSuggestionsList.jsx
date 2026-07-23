import { Alert, Button } from "@mui/material";

import { USER_SUGGESTIONS_TEXTS } from "../../../constants";
import { UserSuggestionItem } from "./UserSuggestionItem";
import { UserSuggestionsSkeletonList } from "./UserSuggestionsSkeletonList";

import styles from "../styles/UserSuggestionsPanel.module.css";

export function UserSuggestionsList({ suggestionsState, compact = false }) {
    if (suggestionsState.loading) {
        return <UserSuggestionsSkeletonList />;
    }

    if (suggestionsState.error) {
        return (
            <div className={styles.errorBlock}>
                <Alert severity="error">{suggestionsState.error}</Alert>

                {suggestionsState.canRetry ? (
                    <Button
                        variant="outlined"
                        size="small"
                        className={styles.retryButton}
                        onClick={suggestionsState.onRefresh}
                    >
                        {USER_SUGGESTIONS_TEXTS.RETRY_BUTTON}
                    </Button>
                ) : null}
            </div>
        );
    }

    if (suggestionsState.isEmpty) {
        return (
            <p
                role="status"
                aria-live="polite"
                className={compact ? styles.emptyTextCompact : styles.emptyText}
            >
                {USER_SUGGESTIONS_TEXTS.EMPTY}
            </p>
        );
    }

    return (
        <div
            className={styles.suggestionsList}
            role="list"
            aria-label={USER_SUGGESTIONS_TEXTS.LIST_ARIA}
        >
            {suggestionsState.suggestions.map((suggestion) => (
                <UserSuggestionItem
                    key={suggestion.id}
                    suggestion={suggestion}
                    onFollow={suggestionsState.onFollow}
                />
            ))}
        </div>
    );
}

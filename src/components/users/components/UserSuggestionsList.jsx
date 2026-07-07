import { Alert, Button, CircularProgress } from "@mui/material";

import { USER_SUGGESTIONS_TEXTS } from "../../../constants";
import { UserSuggestionItem } from "./UserSuggestionItem";

import styles from "../styles/UserSuggestionsPanel.module.css";

export function UserSuggestionsList({ suggestionsState, compact = false }) {
    if (suggestionsState.loading) {
        return (
            <div className={styles.statusBlock}>
                <CircularProgress size={20} />
                <p className={styles.statusText}>
                    {USER_SUGGESTIONS_TEXTS.LOADING}
                </p>
            </div>
        );
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
            <p className={compact ? styles.emptyTextCompact : styles.emptyText}>
                {USER_SUGGESTIONS_TEXTS.EMPTY}
            </p>
        );
    }

    return (
        <div className={styles.suggestionsList}>
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

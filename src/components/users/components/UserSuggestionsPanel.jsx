import { IconButton, Tooltip } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { USER_SUGGESTIONS_TEXTS } from "../../../constants";
import { UserSuggestionsList } from "./UserSuggestionsList";

import styles from "../styles/UserSuggestionsPanel.module.css";

export function UserSuggestionsPanel({ suggestionsState }) {
    return (
        <section className={styles.panel}>
            <div className={styles.panelHeader}>
                <div className={styles.panelCopy}>
                    <h3 className={styles.panelTitle}>
                        {USER_SUGGESTIONS_TEXTS.TITLE}
                    </h3>
                    <p className={styles.panelDescription}>
                        {USER_SUGGESTIONS_TEXTS.DESCRIPTION}
                    </p>
                </div>

                <Tooltip title={USER_SUGGESTIONS_TEXTS.REFRESH_TOOLTIP}>
                    <span>
                        <IconButton
                            size="small"
                            className={styles.refreshButton}
                            aria-label={USER_SUGGESTIONS_TEXTS.REFRESH_ARIA}
                            disabled={suggestionsState.loading || suggestionsState.refreshing}
                            onClick={suggestionsState.onRefresh}
                        >
                            <RefreshRoundedIcon fontSize="small" />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>

            <UserSuggestionsList suggestionsState={suggestionsState} />
        </section>
    );
}

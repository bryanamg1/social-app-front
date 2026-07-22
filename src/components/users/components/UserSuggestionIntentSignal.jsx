import { USER_SUGGESTIONS_TEXTS } from "../../../constants";
import styles from "../styles/UserSuggestionsPanel.module.css";

export function UserSuggestionIntentSignal({ intentSignal }) {
    if (!intentSignal) {
        return null;
    }

    return (
        <div className={styles.intentSignalRow}>
            <span className={styles.intentSignalLabel}>
                {USER_SUGGESTIONS_TEXTS.INTENT_SIGNAL_PREFIX}
            </span>
            <span className={styles.intentSignalValue}>{intentSignal.label}</span>
            <span className={styles.intentSignalCount}>
                {intentSignal.countLabel}
            </span>
        </div>
    );
}

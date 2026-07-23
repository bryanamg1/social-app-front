import { Chip } from "@mui/material";

import { USER_SUGGESTIONS_TEXTS } from "../../../constants";
import styles from "../styles/UserSuggestionsPanel.module.css";

export function UserSuggestionProjectSignal({ projectSignal }) {
    if (!projectSignal) {
        return null;
    }

    return (
        <div className={styles.projectSignalBlock}>
            <div className={styles.projectSignalHeader}>
                <p className={styles.projectSignalLabel}>
                    {USER_SUGGESTIONS_TEXTS.PROJECT_SIGNAL_PREFIX}
                </p>
                <span className={styles.projectSignalCount}>
                    {projectSignal.summaryLabel}
                </span>
            </div>

            <p className={styles.projectSignalTitle}>{projectSignal.title}</p>
            <p className={styles.projectSignalStatus}>{projectSignal.statusLabel}</p>

            {projectSignal.technologies.length ? (
                <div className={styles.projectSignalTags}>
                    {projectSignal.technologies.map((technology) => (
                        <Chip
                            key={`${projectSignal.title}-${technology}`}
                            label={technology}
                            size="small"
                            className={styles.projectSignalTag}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}

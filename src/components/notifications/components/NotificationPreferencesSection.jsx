import { Switch } from "@mui/material";

import {
    NOTIFICATION_PREFERENCE_ITEMS,
    NOTIFICATIONS_TEXTS,
} from "../../../constants";

export const NotificationPreferencesSection = ({
    preferences,
    loading,
    updating,
    onChange,
    styles,
}) => {
    return (
        <section className={styles.preferencesSection}>
            <div className={styles.preferencesHeader}>
                <p className={styles.preferencesTitle}>
                    {NOTIFICATIONS_TEXTS.PREFERENCES_TITLE}
                </p>
                <p className={styles.preferencesHelper}>
                    {NOTIFICATIONS_TEXTS.PREFERENCES_HELPER}
                </p>
            </div>

            {loading ? (
                <p className={styles.preferencesState}>
                    {NOTIFICATIONS_TEXTS.PREFERENCES_LOADING}
                </p>
            ) : (
                <div className={styles.preferencesList}>
                    {NOTIFICATION_PREFERENCE_ITEMS.map((item) => (
                        <label
                            key={item.key}
                            className={styles.preferenceItem}
                        >
                            <span className={styles.preferenceLabel}>
                                {NOTIFICATIONS_TEXTS.PREFERENCE_LABELS[item.type]}
                            </span>

                            <Switch
                                size="small"
                                checked={Boolean(preferences?.[item.key])}
                                disabled={updating}
                                onChange={(_, checked) =>
                                    onChange(item.key, checked)
                                }
                            />
                        </label>
                    ))}
                </div>
            )}

            {updating ? (
                <p className={styles.preferencesState}>
                    {NOTIFICATIONS_TEXTS.PREFERENCES_SAVING}
                </p>
            ) : null}
        </section>
    );
};

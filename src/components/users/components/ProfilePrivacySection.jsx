import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";

import {
    PROFILE_DIRECT_MESSAGE_OPTIONS,
    PROFILE_PRIVACY_VISIBILITY_OPTIONS,
    PROFILE_TEXTS,
} from "../../../constants";
import styles from "../pages/ProfilePage.module.css";

export function ProfilePrivacySection({
    form,
    updating,
    error,
    success,
    onChange,
    onSubmit,
}) {
    return (
        <section className={styles.privacySection}>
            <div className={styles.projectsSectionHeader}>
                <div>
                    <Typography variant="h5" className={styles.postsTitle}>
                        {PROFILE_TEXTS.PRIVACY.TITLE}
                    </Typography>
                    <Typography className={styles.projectsDescription}>
                        {PROFILE_TEXTS.PRIVACY.DESCRIPTION}
                    </Typography>
                </div>
            </div>

            {error ? (
                <Alert severity="error" className={styles.projectsAlert}>
                    {error}
                </Alert>
            ) : null}

            {success ? (
                <Alert severity="success" className={styles.projectsAlert}>
                    {PROFILE_TEXTS.PRIVACY_UPDATE_SUCCESS}
                </Alert>
            ) : null}

            <Stack spacing={2} className={styles.privacyCard}>
                <FormControl fullWidth className={styles.profileTextField}>
                    <InputLabel id="profile-privacy-visibility-label">
                        {PROFILE_TEXTS.PRIVACY.PROFILE_VISIBILITY_LABEL}
                    </InputLabel>
                    <Select
                        labelId="profile-privacy-visibility-label"
                        value={form.profileVisibility}
                        label={PROFILE_TEXTS.PRIVACY.PROFILE_VISIBILITY_LABEL}
                        onChange={(event) =>
                            onChange("profileVisibility", event.target.value)
                        }
                    >
                        {PROFILE_PRIVACY_VISIBILITY_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography className={styles.privacyHelper}>
                    {PROFILE_TEXTS.PRIVACY.PROFILE_VISIBILITY_HELPER}
                </Typography>

                <FormControl fullWidth className={styles.profileTextField}>
                    <InputLabel id="profile-privacy-dm-label">
                        {PROFILE_TEXTS.PRIVACY.DIRECT_MESSAGE_PERMISSION_LABEL}
                    </InputLabel>
                    <Select
                        labelId="profile-privacy-dm-label"
                        value={form.directMessagePermission}
                        label={PROFILE_TEXTS.PRIVACY.DIRECT_MESSAGE_PERMISSION_LABEL}
                        onChange={(event) =>
                            onChange("directMessagePermission", event.target.value)
                        }
                    >
                        {PROFILE_DIRECT_MESSAGE_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography className={styles.privacyHelper}>
                    {PROFILE_TEXTS.PRIVACY.DIRECT_MESSAGE_HELPER}
                </Typography>

                <div className={styles.profileFormActions}>
                    <Button
                        variant="contained"
                        disabled={updating}
                        onClick={onSubmit}
                    >
                        {updating
                            ? PROFILE_TEXTS.PRIVACY.SAVING_BUTTON
                            : PROFILE_TEXTS.PRIVACY.SAVE_BUTTON}
                    </Button>
                </div>
            </Stack>
        </section>
    );
}

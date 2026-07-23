import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";

import {
    PROFILE_PROJECT_STATUS_OPTIONS,
    PROFILE_TEXTS,
} from "../../../constants";
import styles from "../pages/ProfilePage.module.css";

export function ProfileProjectForm({
    form,
    editingProjectId,
    saving,
    onCancel,
    onChange,
    onSubmit,
}) {
    const isEditing = Boolean(editingProjectId);

    return (
        <div className={styles.projectForm}>
            <Typography variant="h6" className={styles.projectsFormTitle}>
                {isEditing
                    ? PROFILE_TEXTS.PROJECTS.EDIT_FORM_TITLE
                    : PROFILE_TEXTS.PROJECTS.CREATE_FORM_TITLE}
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label={PROFILE_TEXTS.PROJECTS.TITLE_LABEL}
                    value={form.title}
                    onChange={(event) => onChange("title", event.target.value)}
                    className={styles.profileTextField}
                />

                <TextField
                    multiline
                    minRows={3}
                    label={PROFILE_TEXTS.PROJECTS.SUMMARY_LABEL}
                    value={form.summary}
                    onChange={(event) => onChange("summary", event.target.value)}
                    className={styles.profileTextField}
                />

                <TextField
                    label={PROFILE_TEXTS.PROJECTS.TECHNOLOGIES_LABEL}
                    value={form.technologies}
                    helperText={PROFILE_TEXTS.PROJECTS.TECHNOLOGIES_HELPER}
                    onChange={(event) =>
                        onChange("technologies", event.target.value)
                    }
                    className={styles.profileTextField}
                />

                <TextField
                    label={PROFILE_TEXTS.PROJECTS.REPO_LABEL}
                    value={form.repoUrl}
                    onChange={(event) => onChange("repoUrl", event.target.value)}
                    className={styles.profileTextField}
                />

                <TextField
                    label={PROFILE_TEXTS.PROJECTS.DEMO_LABEL}
                    value={form.demoUrl}
                    onChange={(event) => onChange("demoUrl", event.target.value)}
                    className={styles.profileTextField}
                />

                <TextField
                    select
                    label={PROFILE_TEXTS.PROJECTS.STATUS_LABEL}
                    value={form.status}
                    onChange={(event) => onChange("status", event.target.value)}
                    className={styles.profileTextField}
                >
                    {PROFILE_PROJECT_STATUS_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>

            <div className={styles.projectFormActions}>
                <Button variant="outlined" onClick={onCancel}>
                    {PROFILE_TEXTS.PROJECTS.CANCEL_BUTTON}
                </Button>

                <Button variant="contained" disabled={saving} onClick={onSubmit}>
                    {saving
                        ? isEditing
                            ? PROFILE_TEXTS.PROJECTS.SAVING_BUTTON
                            : PROFILE_TEXTS.PROJECTS.CREATING_BUTTON
                        : isEditing
                            ? PROFILE_TEXTS.PROJECTS.SAVE_BUTTON
                            : PROFILE_TEXTS.PROJECTS.CREATE_BUTTON}
                </Button>
            </div>
        </div>
    );
}

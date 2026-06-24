import { Alert, Box, Button, Stack, TextField } from "@mui/material";

import { PROFILE_FORM_FIELDS, PROFILE_TEXTS } from "../../../constants";
import styles from "../pages/ProfilePage.module.css";

export function ProfileEditForm({
    form,
    updating,
    error,
    onCancel,
    onChange,
    onSubmit,
}) {
    return (
        <Box component="form" onSubmit={(event) => event.preventDefault()}>
        <Stack spacing={2} className={styles.profileEditForm}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
            label={PROFILE_TEXTS.FORM.USER_NAME_LABEL}
            value={form.userName}
            onChange={(event) =>
                onChange(PROFILE_FORM_FIELDS.USER_NAME, event.target.value)
            }
            fullWidth
            variant="outlined"
            className={styles.profileTextField}
            slotProps={{
                inputLabel: {
                shrink: true,
                },
            }}
            />

            <TextField
            label={PROFILE_TEXTS.FORM.BIO_LABEL}
            value={form.bio}
            onChange={(event) =>
                onChange(PROFILE_FORM_FIELDS.BIO, event.target.value)
            }
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
            className={styles.profileTextField}
            slotProps={{
                inputLabel: {
                shrink: true,
                },
            }}
            />

            <TextField
            label={PROFILE_TEXTS.FORM.LOCATION_LABEL}
            value={form.location}
            onChange={(event) =>
                onChange(PROFILE_FORM_FIELDS.LOCATION, event.target.value)
            }
            fullWidth
            variant="outlined"
            className={styles.profileTextField}
            slotProps={{
                inputLabel: {
                shrink: true,
                },
            }}
            />

            <Stack direction="row" spacing={1.5} className={styles.profileFormActions}>
            <Button variant="contained" disabled={updating} onClick={onSubmit}>
                {updating
                ? PROFILE_TEXTS.SAVING_PROFILE
                : PROFILE_TEXTS.SAVE_PROFILE}
            </Button>

            <Button variant="outlined" disabled={updating} onClick={onCancel}>
                {PROFILE_TEXTS.CANCEL_EDIT}
            </Button>
            </Stack>
        </Stack>
        </Box>
    );
}

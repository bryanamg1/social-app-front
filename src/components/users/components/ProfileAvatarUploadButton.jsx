import { useRef } from "react";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import { Button } from "@mui/material";

import { PROFILE_TEXTS } from "../../../constants";
import styles from "../pages/ProfilePage.module.css";

export function ProfileAvatarUploadButton({
    disabled = false,
    loading = false,
    onSelectFile,
}) {
    const inputRef = useRef(null);

    const handleChange = (event) => {
        const file = event.target.files?.[0] ?? null;

        if (file) {
            onSelectFile(file);
        }

        event.target.value = "";
    };

    return (
        <>
        <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={styles.avatarInput}
            aria-label={PROFILE_TEXTS.AVATAR.INPUT_ARIA}
            onChange={handleChange}
        />

        <Button
            type="button"
            variant="contained"
            size="small"
            startIcon={<PhotoCameraRoundedIcon />}
            className={styles.avatarUploadButton}
            disabled={disabled || loading}
            onClick={() => inputRef.current?.click()}
        >
            {loading
                ? PROFILE_TEXTS.AVATAR.CHANGING_BUTTON
                : PROFILE_TEXTS.AVATAR.CHANGE_BUTTON}
        </Button>
        </>
    );
}

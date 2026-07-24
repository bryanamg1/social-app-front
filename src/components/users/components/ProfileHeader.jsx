import { Alert, Avatar, Button, Stack, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { PROFILE_TEXTS } from "../../../constants";
import {
    formatProfileDate,
    getUserAvatar,
    getUserBio,
    getUserCreatedAt,
    getUserEmail,
    getUserLocation,
    getUserName,
} from "../utils/userProfileAdapter";
import { ProfileActivitySummary } from "./ProfileActivitySummary";
import { ProfileAvatarUploadButton } from "./ProfileAvatarUploadButton";
import { ProfileBlockButton } from "./ProfileBlockButton";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileFollowButton } from "./ProfileFollowButton";

import styles from "../pages/ProfilePage.module.css";

export function ProfileHeader({
    profile,
    postsCount,
    canEdit = true,
    description = PROFILE_TEXTS.DESCRIPTION,
    isEditing,
    form,
    updating,
    uploadingAvatar,
    updateError,
    updateSuccess,
    avatarError,
    avatarSuccess,
    followAction,
    blockAction,
    secondaryAction,
    onStartEditing,
    onCancelEditing,
    onFieldChange,
    onAvatarSelect,
    onSubmitProfile,
}) {
    const userName = getUserName(profile);
    const email = getUserEmail(profile);
    const avatarUrl = getUserAvatar(profile);
    const bio = getUserBio(profile);
    const location = getUserLocation(profile);
    const createdAt = getUserCreatedAt(profile);
    const avatarLetter = userName.charAt(0).toUpperCase();

    return (
        <>
        <header className={styles.cover}>
            <Avatar
            src={avatarUrl || undefined}
            className={styles.avatar}
            sx={{
                bgcolor: "background.default",
                color: "primary.main",
                fontWeight: 900,
            }}
            >
            {avatarLetter}
            </Avatar>

            {canEdit ? (
                <ProfileAvatarUploadButton
                    disabled={updating}
                    loading={uploadingAvatar}
                    onSelectFile={onAvatarSelect}
                />
            ) : null}
        </header>

        <section className={styles.profileInfo}>
            <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
            <Stack spacing={0.75}>
                <Typography variant="h4" component="h1" fontWeight={900}>
                {userName}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                {description}
                </Typography>
            </Stack>

            <div className={styles.profileMetaGrid}>
                <div>
                <span className={styles.profileMetaLabel}>
                    {PROFILE_TEXTS.FIELDS.EMAIL}
                </span>
                <p className={styles.profileMetaValue}>{email}</p>
                </div>

                <div>
                <span className={styles.profileMetaLabel}>
                    {PROFILE_TEXTS.FIELDS.MEMBER_SINCE}
                </span>
                <p className={styles.profileMetaValue}>
                    {formatProfileDate(createdAt)}
                </p>
                </div>

                <div>
                <span className={styles.profileMetaLabel}>
                    {PROFILE_TEXTS.FIELDS.BIO}
                </span>
                <p className={styles.profileMetaValue}>
                    {bio || PROFILE_TEXTS.FIELDS.BIO_FALLBACK}
                </p>
                </div>

                <div>
                <span className={styles.profileMetaLabel}>
                    {PROFILE_TEXTS.FIELDS.LOCATION}
                </span>
                <p className={styles.profileMetaValue}>
                    {location || PROFILE_TEXTS.FIELDS.LOCATION_FALLBACK}
                </p>
                </div>
            </div>

            <Typography className={styles.postsCount}>
                {postsCount} {PROFILE_TEXTS.POSTS.COUNT_LABEL}
            </Typography>

            <ProfileActivitySummary profile={profile} />

            <Stack direction="row" spacing={1.25} useFlexGap sx={{ flexWrap: "wrap" }}>
                <ProfileFollowButton followAction={followAction} />
                <ProfileBlockButton blockAction={blockAction} />

                {secondaryAction?.isVisible ? (
                    <Button
                    variant="outlined"
                    disabled={secondaryAction.loading}
                    onClick={secondaryAction.onClick}
                    >
                    {secondaryAction.label}
                    </Button>
                ) : null}
            </Stack>

            {secondaryAction?.isVisible && secondaryAction.error ? (
                <Alert severity="error">{secondaryAction.error}</Alert>
            ) : null}

            {canEdit && avatarError ? (
                <Alert severity="error">{avatarError}</Alert>
            ) : null}

            {canEdit && avatarSuccess ? (
                <Alert severity="success">{PROFILE_TEXTS.AVATAR_UPDATE_SUCCESS}</Alert>
            ) : null}

            {canEdit && updateSuccess && (
                <Alert severity="success">{PROFILE_TEXTS.UPDATE_SUCCESS}</Alert>
            )}

            {canEdit && isEditing ? (
                <ProfileEditForm
                form={form}
                updating={updating}
                error={updateError}
                onCancel={onCancelEditing}
                onChange={onFieldChange}
                onSubmit={onSubmitProfile}
                />
            ) : null}

            {canEdit && !isEditing ? (
                <Button
                variant="outlined"
                startIcon={<EditRoundedIcon />}
                onClick={onStartEditing}
                >
                {PROFILE_TEXTS.EDIT_PROFILE}
                </Button>
            ) : null}
            </Stack>
        </section>
        </>
    );
}

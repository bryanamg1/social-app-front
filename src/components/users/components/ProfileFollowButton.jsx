import { Alert, Button, Stack, Typography } from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";

import { PROFILE_TEXTS } from "../../../constants";

export function ProfileFollowButton({ followAction }) {
    if (!followAction?.isVisible) return null;

    const buttonText = followAction.loadingStatus
        ? PROFILE_TEXTS.FOLLOW.STATUS_LOADING
        : followAction.loading
        ? PROFILE_TEXTS.FOLLOW.LOADING
        : followAction.isFollowing
            ? PROFILE_TEXTS.FOLLOW.FOLLOWING_BUTTON
            : PROFILE_TEXTS.FOLLOW.FOLLOW_BUTTON;
    const buttonIcon = followAction.isFollowing ? (
        <PersonRemoveRoundedIcon />
    ) : (
        <PersonAddAlt1RoundedIcon />
    );
    const helperText = followAction.loading
        ? PROFILE_TEXTS.FOLLOW.LOADING_HINT
        : followAction.isFollowing
        ? PROFILE_TEXTS.FOLLOW.FOLLOWING_HINT
        : PROFILE_TEXTS.FOLLOW.FOLLOW_HINT;

    return (
        <Stack spacing={1.25} sx={{ alignItems: "flex-start" }}>
            <Button
                variant={followAction.isFollowing ? "contained" : "outlined"}
                startIcon={buttonIcon}
                disabled={followAction.loading}
                onClick={followAction.onToggle}
            >
                {buttonText}
            </Button>

            {followAction.error ? (
                <Alert severity="error">{followAction.error}</Alert>
            ) : null}

            {followAction.message ? (
                <Alert severity="success">{followAction.message}</Alert>
            ) : null}

            <Typography variant="caption" color="text.secondary">
                {helperText}
            </Typography>
        </Stack>
    );
}

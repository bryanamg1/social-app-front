import { Alert, Button, Stack, Typography } from "@mui/material";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

import { PROFILE_TEXTS } from "../../../constants";

export function ProfileBlockButton({ blockAction }) {
    if (!blockAction?.isVisible) return null;

    const buttonText = blockAction.loading
        ? PROFILE_TEXTS.BLOCK.LOADING
        : blockAction.isBlocked
            ? PROFILE_TEXTS.BLOCK.UNBLOCK_BUTTON
            : PROFILE_TEXTS.BLOCK.BLOCK_BUTTON;
    const buttonIcon = blockAction.isBlocked ? (
        <LockOpenRoundedIcon />
    ) : (
        <BlockRoundedIcon />
    );
    const helperText = blockAction.isBlocked
        ? PROFILE_TEXTS.BLOCK.UNBLOCK_HINT
        : PROFILE_TEXTS.BLOCK.BLOCK_HINT;

    return (
        <Stack spacing={1.25} sx={{ alignItems: "flex-start" }}>
            <Button
                variant="outlined"
                color={blockAction.isBlocked ? "inherit" : "error"}
                startIcon={buttonIcon}
                disabled={blockAction.loading}
                onClick={blockAction.onToggle}
            >
                {buttonText}
            </Button>

            {blockAction.error ? (
                <Alert severity="error">{blockAction.error}</Alert>
            ) : null}

            {blockAction.message ? (
                <Alert severity="success">{blockAction.message}</Alert>
            ) : null}

            <Typography variant="caption" color="text.secondary">
                {helperText}
            </Typography>
        </Stack>
    );
}

import { Button, TextField } from "@mui/material";

import { MESSAGES_TEXTS } from "../../../constants";

import styles from "../styles/MessagesPage.module.css";

export function MessageComposer({
    disabled,
    draft,
    sending,
    onDraftChange,
    onSendMessage,
}) {
    return (
        <div className={styles.composer}>
            <TextField
                fullWidth
                multiline
                maxRows={4}
                value={draft}
                disabled={disabled || sending}
                placeholder={MESSAGES_TEXTS.INPUT_PLACEHOLDER}
                onChange={onDraftChange}
                className={styles.composerField}
            />

            <Button
                type="button"
                variant="contained"
                disabled={disabled || sending || !draft.trim()}
                onClick={onSendMessage}
            >
                {sending
                    ? MESSAGES_TEXTS.SENDING_BUTTON
                    : MESSAGES_TEXTS.SEND_BUTTON}
            </Button>
        </div>
    );
}

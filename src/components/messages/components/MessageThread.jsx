import { Alert, CircularProgress, Typography } from "@mui/material";

import { MESSAGES_TEXTS } from "../../../constants";
import { getUserName } from "../../users/utils/userProfileAdapter";

import styles from "../styles/MessagesPage.module.css";

const formatDateTime = (value) => {
    if (!value) return "";

    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
};

const getThreadTitle = ({ selectedConversation, targetUser }) => {
    if (targetUser) {
        return getUserName(targetUser);
    }

    if (selectedConversation) {
        return (
            selectedConversation.participant_user_name ||
            MESSAGES_TEXTS.CONVERSATION_FALLBACK(
                selectedConversation.conversation_id
            )
        );
    }

    return MESSAGES_TEXTS.PAGE_TITLE;
};

export function MessageThread({
    currentUserId,
    selectedConversation,
    targetUser,
    messages,
    loading,
    error,
    socketConnected,
}) {
    if (!selectedConversation) {
        return (
            <section className={styles.threadPanel}>
                <div className={styles.emptyState}>
                    <Typography variant="h5" className={styles.panelTitle}>
                        {MESSAGES_TEXTS.THREAD_EMPTY}
                    </Typography>
                    <Typography>{MESSAGES_TEXTS.THREAD_WELCOME}</Typography>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.threadPanel}>
            <div className={styles.threadHeader}>
                <div>
                    <Typography variant="h5" className={styles.panelTitle}>
                        {getThreadTitle({ selectedConversation, targetUser })}
                    </Typography>
                    <Typography className={styles.threadSubtext}>
                        {socketConnected
                            ? MESSAGES_TEXTS.SOCKET_ONLINE
                            : MESSAGES_TEXTS.SOCKET_OFFLINE}
                    </Typography>
                </div>
            </div>

            {loading ? (
                <div className={styles.centerState}>
                    <CircularProgress size={24} />
                    <Typography>{MESSAGES_TEXTS.THREAD_LOADING}</Typography>
                </div>
            ) : null}

            {!loading && error ? (
                <Alert severity="error">{error}</Alert>
            ) : null}

            {!loading && !error && messages.length === 0 ? (
                <div className={styles.emptyState}>
                    <Typography>{MESSAGES_TEXTS.NO_MESSAGES}</Typography>
                </div>
            ) : null}

            {!loading && !error && messages.length > 0 ? (
                <div className={styles.messagesList}>
                    {messages.map((message) => {
                        const isOwnMessage =
                            String(message.sender_id) === String(currentUserId);

                        return (
                            <div
                                key={message.message_id}
                                className={
                                    isOwnMessage
                                        ? styles.messageRowOwn
                                        : styles.messageRow
                                }
                            >
                                <div
                                    className={
                                        isOwnMessage
                                            ? styles.messageBubbleOwn
                                            : styles.messageBubble
                                    }
                                >
                                    <p className={styles.messageContent}>
                                        {message.content}
                                    </p>
                                    <span className={styles.messageTimestamp}>
                                        {formatDateTime(message.created_at)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </section>
    );
}

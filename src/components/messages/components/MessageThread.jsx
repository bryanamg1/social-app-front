import { Alert, Typography } from "@mui/material";

import { MESSAGES_TEXTS } from "../../../constants";
import { getUserName } from "../../users/utils/userProfileAdapter";
import { MessageThreadSkeleton } from "./MessageThreadSkeleton";

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

const getParticipantName = ({ selectedConversation, targetUser }) => {
    return (
        getThreadTitle({ selectedConversation, targetUser }) ||
        MESSAGES_TEXTS.CONVERSATION_FALLBACK()
    );
};

export function MessageThread({
    currentUserId,
    selectedConversation,
    targetUser,
    messages,
    loading,
    error,
    socketConnected,
    participantTyping,
}) {
    if (!selectedConversation) {
        return (
            <section className={styles.threadPanel}>
                <div className={styles.emptyState}>
                    <Typography variant="h5" className={styles.emptyStateTitle}>
                        {MESSAGES_TEXTS.THREAD_EMPTY_TITLE}
                    </Typography>
                    <Typography className={styles.emptyStateText}>
                        {MESSAGES_TEXTS.THREAD_EMPTY_DESCRIPTION}
                    </Typography>
                </div>
            </section>
        );
    }

    const connectionStatusText = socketConnected
        ? MESSAGES_TEXTS.THREAD_STATUS_READY
        : MESSAGES_TEXTS.THREAD_STATUS_OFFLINE;
    const participantName = getParticipantName({
        selectedConversation,
        targetUser,
    });

    return (
        <section className={styles.threadPanel}>
            <div className={styles.threadHeader}>
                <div>
                    <Typography variant="h5" className={styles.panelTitle}>
                        {getThreadTitle({ selectedConversation, targetUser })}
                    </Typography>
                    <Typography className={styles.threadSubtext}>
                        {connectionStatusText}
                    </Typography>
                </div>
            </div>

            {loading ? (
                <MessageThreadSkeleton />
            ) : null}

            {!loading && error ? (
                <Alert severity="error">{error}</Alert>
            ) : null}

            {!loading && !error && messages.length === 0 ? (
                <div className={styles.emptyState}>
                    <Typography variant="h6" className={styles.emptyStateTitle}>
                        {MESSAGES_TEXTS.NO_MESSAGES_TITLE}
                    </Typography>
                    <Typography className={styles.emptyStateText}>
                        {MESSAGES_TEXTS.NO_MESSAGES_DESCRIPTION}
                    </Typography>
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
                                        {isOwnMessage && message.read_at
                                            ? ` · ${MESSAGES_TEXTS.THREAD_READ_LABEL}`
                                            : ""}
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    {participantTyping ? (
                        <div className={styles.messageRow}>
                            <div className={styles.typingBubble}>
                                <p className={styles.typingText}>
                                    {MESSAGES_TEXTS.TYPING_INDICATOR(participantName)}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </section>
    );
}

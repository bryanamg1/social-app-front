import { Button, CircularProgress, Typography } from "@mui/material";

import { MESSAGES_TEXTS } from "../../../constants";

import styles from "../styles/MessagesPage.module.css";

const formatDate = (value) => {
    if (!value) return "";

    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
};

const getConversationTitle = (conversation) => {
    return MESSAGES_TEXTS.CONVERSATION_FALLBACK(conversation.conversation_id);
};

export function ConversationsList({
    conversations,
    loading,
    error,
    selectedConversationId,
    onSelectConversation,
}) {
    return (
        <section className={styles.sidebarPanel}>
            <div className={styles.panelHeader}>
                <Typography variant="h5" className={styles.panelTitle}>
                    {MESSAGES_TEXTS.LIST_TITLE}
                </Typography>
            </div>

            {loading ? (
                <div className={styles.centerState}>
                    <CircularProgress size={24} />
                    <Typography>{MESSAGES_TEXTS.LIST_LOADING}</Typography>
                </div>
            ) : null}

            {!loading && error ? (
                <p className={styles.errorText}>{error}</p>
            ) : null}

            {!loading && !error && conversations.length === 0 ? (
                <p className={styles.statusText}>{MESSAGES_TEXTS.LIST_EMPTY}</p>
            ) : null}

            {!loading && !error && conversations.length > 0 ? (
                <div className={styles.conversationsList}>
                    {conversations.map((conversation) => {
                        const isSelected =
                            String(conversation.conversation_id) ===
                            String(selectedConversationId);

                        return (
                            <Button
                                key={conversation.conversation_id}
                                type="button"
                                onClick={() =>
                                    onSelectConversation(conversation.conversation_id)
                                }
                                className={
                                    isSelected
                                        ? styles.conversationItemActive
                                        : styles.conversationItem
                                }
                            >
                                <span className={styles.conversationMeta}>
                                    <span className={styles.conversationName}>
                                        {getConversationTitle(conversation)}
                                    </span>
                                    <span className={styles.conversationPreview}>
                                        {conversation.last_message ||
                                            MESSAGES_TEXTS.LAST_MESSAGE_EMPTY}
                                    </span>
                                </span>

                                <span className={styles.conversationDate}>
                                    {formatDate(
                                        conversation.last_message_at ||
                                            conversation.created_at
                                    )}
                                </span>
                            </Button>
                        );
                    })}
                </div>
            ) : null}
        </section>
    );
}

import { Alert, Typography } from "@mui/material";

import { MESSAGES_TEXTS } from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { getUserId } from "../../users/utils/userProfileAdapter";
import { ConversationsList } from "../components/ConversationsList";
import { MessageComposer } from "../components/MessageComposer";
import { MessageThread } from "../components/MessageThread";
import { useMessages } from "../hooks/useMessages";

import styles from "../styles/MessagesPage.module.css";

export function MessagesPage() {
    const { user } = useAuth();
    const currentUserId = getUserId(user);
    const messages = useMessages({ currentUserId });

    return (
        <main className={styles.page}>
            <header className={styles.pageHeader}>
                <Typography variant="h4" className={styles.pageTitle}>
                    {MESSAGES_TEXTS.PAGE_TITLE}
                </Typography>
                <Typography className={styles.pageSubtitle}>
                    {MESSAGES_TEXTS.PAGE_SUBTITLE}
                </Typography>
            </header>

            {messages.targetUser && !messages.selectedConversation ? (
                <Alert severity="info">{MESSAGES_TEXTS.RESULTS_FROM_PROFILE}</Alert>
            ) : null}

            <section className={styles.layout}>
                <ConversationsList
                    conversations={messages.conversations}
                    loading={messages.loadingConversations}
                    error={messages.conversationsError}
                    selectedConversationId={messages.selectedConversationId}
                    onSelectConversation={messages.onSelectConversation}
                />

                <div className={styles.threadColumn}>
                    <MessageThread
                        currentUserId={currentUserId}
                        selectedConversation={messages.selectedConversation}
                        targetUser={messages.targetUser}
                        messages={messages.messages}
                        loading={messages.loadingMessages}
                        error={messages.messagesError}
                        socketConnected={messages.socketConnected}
                    />

                    <MessageComposer
                        disabled={!messages.selectedConversationId}
                        draft={messages.draft}
                        sending={messages.sendingMessage}
                        onDraftChange={messages.onDraftChange}
                        onSendMessage={messages.onSendMessage}
                    />
                </div>
            </section>
        </main>
    );
}

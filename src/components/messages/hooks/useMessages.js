import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import {
    MESSAGES_API_DEFAULTS,
    MESSAGES_ERRORS,
    MESSAGES_QUERY_PARAMS,
    MESSAGES_SOCKET_EVENTS,
} from "../../../constants";
import {
    getConversationMessages,
    getMyConversations,
} from "../services/messagesService";
import {
    getMessagesSocket,
    joinConversationRoom,
    sendSocketMessage,
} from "../services/messagesSocketService";
import {
    normalizeConversationTarget,
    normalizeMessage,
} from "../utils/messagesAdapter";

const mergeConversationUpdate = (conversations, message) => {
    const conversationId = message?.conversation_id;

    if (!conversationId) return conversations;

    const nextConversations = conversations.map((conversation) => {
        if (String(conversation.conversation_id) !== String(conversationId)) {
            return conversation;
        }

        return {
            ...conversation,
            last_message: message.content,
            last_message_at: message.created_at,
        };
    });

    return nextConversations.sort((first, second) => {
        return new Date(second.last_message_at || 0) - new Date(first.last_message_at || 0);
    });
};

const mergeIncomingMessage = (messages, incomingMessage) => {
    const nextMessageId = String(incomingMessage?.message_id ?? incomingMessage?.id ?? "");

    if (messages.some((message) => String(message.message_id) === nextMessageId)) {
        return messages;
    }

    return [...messages, incomingMessage];
};

export const useMessages = ({ currentUserId }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState("");
    const [loadingConversations, setLoadingConversations] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [conversationsError, setConversationsError] = useState(null);
    const [messagesError, setMessagesError] = useState(null);
    const selectedConversationId =
        searchParams.get(MESSAGES_QUERY_PARAMS.CONVERSATION_ID) || null;
    const initialConversationId = location.state?.conversationId;
    const targetUser =
        String(initialConversationId ?? "") === String(selectedConversationId ?? "")
            ? normalizeConversationTarget(location.state?.targetUser)
            : null;

    useEffect(() => {
        if (!currentUserId) return;

        let isActive = true;

        const loadConversations = async () => {
            try {
                setLoadingConversations(true);
                setConversationsError(null);

                const nextConversations = await getMyConversations(currentUserId);

                if (!isActive) return;

                setConversations(nextConversations);
            } catch {
                if (!isActive) return;

                setConversationsError(MESSAGES_ERRORS.LOAD_CONVERSATIONS);
            } finally {
                if (isActive) {
                    setLoadingConversations(false);
                }
            }
        };

        loadConversations();

        return () => {
            isActive = false;
        };
    }, [currentUserId]);

    useEffect(() => {
        if (!currentUserId || !selectedConversationId) return;

        let isActive = true;

        const loadMessages = async () => {
            try {
                setLoadingMessages(true);
                setMessagesError(null);

                const nextMessages = await getConversationMessages({
                    conversationId: selectedConversationId,
                    userId: currentUserId,
                    limit: MESSAGES_API_DEFAULTS.PAGE_SIZE,
                    offset: MESSAGES_API_DEFAULTS.INITIAL_OFFSET,
                });

                if (!isActive) return;

                setMessages(nextMessages);
            } catch {
                if (!isActive) return;

                setMessages([]);
                setMessagesError(MESSAGES_ERRORS.LOAD_MESSAGES);
            } finally {
                if (isActive) {
                    setLoadingMessages(false);
                }
            }
        };

        loadMessages();

        return () => {
            isActive = false;
        };
    }, [currentUserId, selectedConversationId]);

    useEffect(() => {
        if (!currentUserId || !selectedConversationId) return undefined;

        const socket = getMessagesSocket();

        const handleConnect = () => {
            setSocketConnected(true);
            joinConversationRoom({
                conversationId: selectedConversationId,
                userId: currentUserId,
            });
        };

        const handleDisconnect = () => {
            setSocketConnected(false);
        };

        const handleJoined = () => {
            setMessagesError(null);
        };

        const handleNewMessage = (nextMessage) => {
            const normalizedMessage = normalizeMessage(nextMessage);

            if (
                !normalizedMessage ||
                String(normalizedMessage.conversation_id) !==
                    String(selectedConversationId)
            ) {
                return;
            }

            setMessages((currentMessages) =>
                mergeIncomingMessage(currentMessages, normalizedMessage)
            );
            setConversations((currentConversations) =>
                mergeConversationUpdate(currentConversations, normalizedMessage)
            );
            setSendingMessage(false);
        };

        const handleSocketError = () => {
            setMessagesError(MESSAGES_ERRORS.SOCKET);
            setSendingMessage(false);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on(MESSAGES_SOCKET_EVENTS.JOINED, handleJoined);
        socket.on(MESSAGES_SOCKET_EVENTS.NEW, handleNewMessage);
        socket.on(MESSAGES_SOCKET_EVENTS.ERROR, handleSocketError);

        if (socket.connected) {
            handleConnect();
        } else {
            socket.connect();
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off(MESSAGES_SOCKET_EVENTS.JOINED, handleJoined);
            socket.off(MESSAGES_SOCKET_EVENTS.NEW, handleNewMessage);
            socket.off(MESSAGES_SOCKET_EVENTS.ERROR, handleSocketError);
        };
    }, [currentUserId, selectedConversationId]);

    const handleSelectConversation = (conversationId) => {
        setMessages([]);
        setSearchParams({
            [MESSAGES_QUERY_PARAMS.CONVERSATION_ID]: String(conversationId),
        });
        setMessagesError(null);
    };

    const handleDraftChange = (event) => {
        setDraft(event.target.value);
    };

    const handleSendMessage = () => {
        const nextContent = draft.trim();

        if (!selectedConversationId || !currentUserId || !nextContent || sendingMessage) {
            return;
        }

        setSendingMessage(true);
        setMessagesError(null);
        sendSocketMessage({
            conversationId: selectedConversationId,
            senderId: currentUserId,
            content: nextContent,
        });
        setDraft("");
    };

    const selectedConversation = useMemo(() => {
        const matchedConversation = conversations.find(
            (conversation) =>
                String(conversation.conversation_id) ===
                String(selectedConversationId)
        );

        if (matchedConversation) {
            return matchedConversation;
        }

        if (selectedConversationId) {
            return {
                conversation_id: selectedConversationId,
                created_at: null,
                last_message: "",
                last_message_at: null,
            };
        }

        return null;
    }, [conversations, selectedConversationId]);

    return {
        conversations,
        messages,
        draft,
        loadingConversations,
        loadingMessages,
        sendingMessage,
        socketConnected,
        conversationsError,
        messagesError,
        selectedConversation,
        selectedConversationId,
        targetUser,
        onSelectConversation: handleSelectConversation,
        onDraftChange: handleDraftChange,
        onSendMessage: handleSendMessage,
    };
};

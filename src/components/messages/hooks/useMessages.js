import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import {
    MESSAGES_API_DEFAULTS,
    MESSAGES_ERRORS,
    MESSAGES_QUERY_PARAMS,
    MESSAGES_RUNTIME_CONFIG,
    MESSAGES_SOCKET_EVENTS,
} from "../../../constants";
import {
    getConversationMessages,
    getMyConversations,
} from "../services/messagesService";
import {
    disconnectMessagesSocket,
    getMessagesSocket,
    joinConversationRoom,
    sendTypingState,
    sendSocketMessage,
} from "../services/messagesSocketService";
import { recordSocketEvent } from "../../../services/observability";
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
    const [participantTyping, setParticipantTyping] = useState(false);
    const [conversationsError, setConversationsError] = useState(null);
    const [messagesError, setMessagesError] = useState(null);
    const typingTimeoutRef = useRef(null);
    const remoteTypingTimeoutRef = useRef(null);
    const isTypingRef = useRef(false);
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

                const nextConversations = await getMyConversations();

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
            });
        };

        const handleDisconnect = () => {
            setSocketConnected(false);
            recordSocketEvent(
                "messages",
                "socket:disconnect",
                {
                    conversationId: selectedConversationId,
                },
                "info"
            );
        };

        const handleConnectError = (socketError) => {
            setSocketConnected(false);
            setMessagesError(MESSAGES_ERRORS.SOCKET);
            setSendingMessage(false);
            recordSocketEvent("messages", "socket:connect_error", {
                conversationId: selectedConversationId,
                message: socketError?.message ?? null,
                description: socketError?.description ?? null,
            });
        };

        const handleJoined = () => {
            setMessagesError(null);
            recordSocketEvent(
                "messages",
                "socket:joined",
                {
                    conversationId: selectedConversationId,
                },
                "info"
            );
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
            setParticipantTyping(false);
        };

        const handleTyping = (socketPayload) => {
            if (
                !socketPayload ||
                String(socketPayload?.conversation_id) !==
                    String(selectedConversationId) ||
                String(socketPayload?.user_id) === String(currentUserId)
            ) {
                return;
            }

            const nextTypingState = Boolean(socketPayload?.is_typing);

            window.clearTimeout(remoteTypingTimeoutRef.current);
            setParticipantTyping(nextTypingState);

            if (nextTypingState) {
                remoteTypingTimeoutRef.current = window.setTimeout(() => {
                    setParticipantTyping(false);
                }, MESSAGES_RUNTIME_CONFIG.TYPING_VISIBILITY_MS);
            }
        };

        const handleSocketError = (socketPayload) => {
            setMessagesError(MESSAGES_ERRORS.SOCKET);
            setSendingMessage(false);
            recordSocketEvent("messages", "socket:error", {
                conversationId: selectedConversationId,
                payload: socketPayload ?? null,
            });
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("connect_error", handleConnectError);
        socket.on(MESSAGES_SOCKET_EVENTS.JOINED, handleJoined);
        socket.on(MESSAGES_SOCKET_EVENTS.NEW, handleNewMessage);
        socket.on(MESSAGES_SOCKET_EVENTS.TYPING, handleTyping);
        socket.on(MESSAGES_SOCKET_EVENTS.ERROR, handleSocketError);

        if (socket.connected) {
            handleConnect();
        } else {
            socket.connect();
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("connect_error", handleConnectError);
            socket.off(MESSAGES_SOCKET_EVENTS.JOINED, handleJoined);
            socket.off(MESSAGES_SOCKET_EVENTS.NEW, handleNewMessage);
            socket.off(MESSAGES_SOCKET_EVENTS.TYPING, handleTyping);
            socket.off(MESSAGES_SOCKET_EVENTS.ERROR, handleSocketError);
            window.clearTimeout(remoteTypingTimeoutRef.current);
            disconnectMessagesSocket();
        };
    }, [currentUserId, selectedConversationId]);

    useEffect(() => {
        return () => {
            window.clearTimeout(typingTimeoutRef.current);
            window.clearTimeout(remoteTypingTimeoutRef.current);
        };
    }, []);

    const broadcastTypingState = (isTyping) => {
        if (!selectedConversationId || !currentUserId) {
            return;
        }

        if (isTypingRef.current === isTyping) {
            return;
        }

        sendTypingState({
            conversationId: selectedConversationId,
            isTyping,
        });
        isTypingRef.current = isTyping;
    };

    const handleSelectConversation = (conversationId) => {
        window.clearTimeout(typingTimeoutRef.current);
        window.clearTimeout(remoteTypingTimeoutRef.current);
        broadcastTypingState(false);
        setParticipantTyping(false);
        setMessages([]);
        setSearchParams({
            [MESSAGES_QUERY_PARAMS.CONVERSATION_ID]: String(conversationId),
        });
        setMessagesError(null);
    };

    const handleDraftChange = (event) => {
        const nextDraft = event.target.value;

        setDraft(nextDraft);

        if (!selectedConversationId || !currentUserId) {
            return;
        }

        if (!nextDraft.trim()) {
            window.clearTimeout(typingTimeoutRef.current);
            broadcastTypingState(false);
            return;
        }

        broadcastTypingState(true);
        window.clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = window.setTimeout(() => {
            broadcastTypingState(false);
        }, MESSAGES_RUNTIME_CONFIG.TYPING_IDLE_MS);
    };

    const handleSendMessage = () => {
        const nextContent = draft.trim();

        if (!selectedConversationId || !currentUserId || !nextContent || sendingMessage) {
            return;
        }

        setSendingMessage(true);
        setMessagesError(null);
        window.clearTimeout(typingTimeoutRef.current);
        broadcastTypingState(false);
        sendSocketMessage({
            conversationId: selectedConversationId,
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
        participantTyping,
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

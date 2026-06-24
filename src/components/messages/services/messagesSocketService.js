import { io } from "socket.io-client";

import {
    API_BODY_FIELDS,
    MESSAGES_SOCKET_EVENTS,
} from "../../../constants";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const SOCKET_BASE_URL =
    import.meta.env.VITE_SOCKET_URL || API_BASE_URL.replace(/\/api\/?$/, "");

let messagesSocket = null;

export const getMessagesSocket = () => {
    if (!messagesSocket) {
        messagesSocket = io(`${SOCKET_BASE_URL}/messages`, {
            autoConnect: true,
        });
    }

    return messagesSocket;
};

export const joinConversationRoom = ({ conversationId, userId }) => {
    const socket = getMessagesSocket();

    socket.emit(MESSAGES_SOCKET_EVENTS.JOIN, {
        conversation_id: conversationId,
        user_id: userId,
    });
};

export const sendSocketMessage = ({
    conversationId,
    senderId,
    content,
}) => {
    const socket = getMessagesSocket();

    socket.emit(MESSAGES_SOCKET_EVENTS.SEND, {
        conversation_id: conversationId,
        sender_id: senderId,
        [API_BODY_FIELDS.CONVERSATIONS.CONTENT]: content,
    });
};

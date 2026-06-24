import { io } from "socket.io-client";

import {
    API_BODY_FIELDS,
    MESSAGES_SOCKET_EVENTS,
} from "../../../constants";
import { authStorage } from "../../../services/authStorage";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const SOCKET_BASE_URL =
    import.meta.env.VITE_SOCKET_URL || API_BASE_URL.replace(/\/api\/?$/, "");

let messagesSocket = null;

export const getMessagesSocket = () => {
    if (!messagesSocket) {
        messagesSocket = io(`${SOCKET_BASE_URL}/messages`, {
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 4000,
            timeout: 8000,
            auth: {
                token: authStorage.getToken() ?? "",
            },
        });
    } else {
        messagesSocket.auth = {
            token: authStorage.getToken() ?? "",
        };
    }

    return messagesSocket;
};

export const disconnectMessagesSocket = () => {
    if (messagesSocket) {
        messagesSocket.disconnect();
    }
};

export const joinConversationRoom = ({ conversationId }) => {
    const socket = getMessagesSocket();

    socket.emit(MESSAGES_SOCKET_EVENTS.JOIN, {
        conversation_id: conversationId,
    });
};

export const sendSocketMessage = ({
    conversationId,
    content,
}) => {
    const socket = getMessagesSocket();

    socket.emit(MESSAGES_SOCKET_EVENTS.SEND, {
        conversation_id: conversationId,
        [API_BODY_FIELDS.CONVERSATIONS.CONTENT]: content,
    });
};

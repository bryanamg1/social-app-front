import { io } from "socket.io-client";

import {
    NOTIFICATIONS_SOCKET_EVENTS,
    NOTIFICATIONS_SOCKET_NAMESPACE,
} from "../../../constants";
import { authStorage } from "../../../services/authStorage";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const SOCKET_BASE_URL =
    import.meta.env.VITE_SOCKET_URL || API_BASE_URL.replace(/\/api\/?$/, "");

let notificationsSocket = null;

export const getNotificationsSocket = () => {
    if (!notificationsSocket) {
        notificationsSocket = io(
            `${SOCKET_BASE_URL}${NOTIFICATIONS_SOCKET_NAMESPACE}`,
            {
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: 3,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 4000,
                timeout: 8000,
                auth: {
                    token: authStorage.getToken() ?? "",
                },
            }
        );
    } else {
        notificationsSocket.auth = {
            token: authStorage.getToken() ?? "",
        };
    }

    return notificationsSocket;
};

export const disconnectNotificationsSocket = () => {
    if (notificationsSocket) {
        notificationsSocket.disconnect();
    }
};

export const subscribeNotificationsRoom = ({ userId }) => {
    const socket = getNotificationsSocket();

    socket.emit(NOTIFICATIONS_SOCKET_EVENTS.SUBSCRIBE, {
        userId,
    });
};

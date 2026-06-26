import { useEffect, useMemo, useState } from "react";

import {
    NOTIFICATIONS_ERRORS,
    NOTIFICATIONS_SOCKET_EVENTS,
} from "../constants";
import { useAuth } from "../hooks/useAuth";
import {
    disconnectNotificationsSocket,
    getNotificationsSocket,
    subscribeNotificationsRoom,
} from "../components/notifications/services/notificationsSocketService";
import { NotificationContext } from "./NotificationContextValue";

const EMPTY_STATE = {
    notifications: [],
    unreadCount: 0,
    isConnected: false,
    isSubscribed: false,
    error: null,
};

const getCurrentUserId = (user) => {
    return Number(
        user?.user_id ??
        user?.userId ??
        user?.userid ??
        user?.id ??
        user?._id
    );
};

const getNotificationCount = (payload) => {
    if (typeof payload === "number") return payload;
    return Number(payload?.total ?? 0) || 0;
};

export function NotificationProvider({ children }) {
    const { isAuthenticated, user } = useAuth();
    const [notifications, setNotifications] = useState(EMPTY_STATE.notifications);
    const [unreadCount, setUnreadCount] = useState(EMPTY_STATE.unreadCount);
    const [isConnected, setIsConnected] = useState(EMPTY_STATE.isConnected);
    const [isSubscribed, setIsSubscribed] = useState(EMPTY_STATE.isSubscribed);
    const [error, setError] = useState(EMPTY_STATE.error);

    const currentUserId = getCurrentUserId(user);

    useEffect(() => {
        if (!isAuthenticated || Number.isNaN(currentUserId)) {
            disconnectNotificationsSocket();
            return undefined;
        }

        const socket = getNotificationsSocket();

        const handleConnect = () => {
            setIsConnected(true);
            setError(null);
            subscribeNotificationsRoom({
                userId: currentUserId,
            });
        };

        const handleDisconnect = () => {
            setIsConnected(false);
            setIsSubscribed(false);
        };

        const handleConnectError = () => {
            setIsConnected(false);
            setIsSubscribed(false);
            setError(NOTIFICATIONS_ERRORS.SOCKET);
        };

        const handleSubscribed = () => {
            setIsSubscribed(true);
            setError(null);
        };

        const handleNewNotification = (notification) => {
            if (!notification || typeof notification !== "object") return;

            setNotifications((currentNotifications) => {
                const exists = currentNotifications.some(
                    (currentNotification) =>
                        String(currentNotification?.id) === String(notification?.id)
                );

                if (exists) return currentNotifications;

                return [notification, ...currentNotifications];
            });
        };

        const handleNotificationCount = (payload) => {
            setUnreadCount(getNotificationCount(payload));
        };

        const handleNotificationError = () => {
            setIsSubscribed(false);
            setError(NOTIFICATIONS_ERRORS.SUBSCRIBE);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("connect_error", handleConnectError);
        socket.on(NOTIFICATIONS_SOCKET_EVENTS.SUBSCRIBED, handleSubscribed);
        socket.on(NOTIFICATIONS_SOCKET_EVENTS.NEW, handleNewNotification);
        socket.on(NOTIFICATIONS_SOCKET_EVENTS.COUNT, handleNotificationCount);
        socket.on(NOTIFICATIONS_SOCKET_EVENTS.ERROR, handleNotificationError);

        if (socket.connected) {
            handleConnect();
        } else {
            socket.connect();
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("connect_error", handleConnectError);
            socket.off(NOTIFICATIONS_SOCKET_EVENTS.SUBSCRIBED, handleSubscribed);
            socket.off(NOTIFICATIONS_SOCKET_EVENTS.NEW, handleNewNotification);
            socket.off(NOTIFICATIONS_SOCKET_EVENTS.COUNT, handleNotificationCount);
            socket.off(NOTIFICATIONS_SOCKET_EVENTS.ERROR, handleNotificationError);
            disconnectNotificationsSocket();
            setNotifications(EMPTY_STATE.notifications);
            setUnreadCount(EMPTY_STATE.unreadCount);
            setIsConnected(EMPTY_STATE.isConnected);
            setIsSubscribed(EMPTY_STATE.isSubscribed);
            setError(EMPTY_STATE.error);
        };
    }, [currentUserId, isAuthenticated]);

    const value = useMemo(
        () => ({
            notifications:
                isAuthenticated && !Number.isNaN(currentUserId)
                    ? notifications
                    : EMPTY_STATE.notifications,
            unreadCount:
                isAuthenticated && !Number.isNaN(currentUserId)
                    ? unreadCount
                    : EMPTY_STATE.unreadCount,
            isConnected:
                isAuthenticated && !Number.isNaN(currentUserId)
                    ? isConnected
                    : EMPTY_STATE.isConnected,
            isSubscribed:
                isAuthenticated && !Number.isNaN(currentUserId)
                    ? isSubscribed
                    : EMPTY_STATE.isSubscribed,
            error:
                isAuthenticated && !Number.isNaN(currentUserId)
                    ? error
                    : EMPTY_STATE.error,
        }),
        [
            currentUserId,
            error,
            isAuthenticated,
            isConnected,
            isSubscribed,
            notifications,
            unreadCount,
        ]
    );

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

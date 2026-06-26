import { useContext } from "react";

import { NOTIFICATIONS_MESSAGES } from "../constants";
import { NotificationContext } from "../context/NotificationContextValue";

export function useNotifications() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(NOTIFICATIONS_MESSAGES.USE_NOTIFICATIONS_OUTSIDE_PROVIDER);
    }

    return context;
}

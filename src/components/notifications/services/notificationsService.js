import apiClient from "../../../services/apiClient";
import { API_ENDPOINTS } from "../../../constants";

const getNotificationsFromResponse = (response) => {
    const payload = response?.data?.data ?? response?.data ?? [];
    return Array.isArray(payload) ? payload : [];
};

export const getMyNotifications = async () => {
    const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.LIST);
    return getNotificationsFromResponse(response);
};

export const markNotificationSeen = async ({ notificationId }) => {
    const response = await apiClient.patch(
        API_ENDPOINTS.NOTIFICATIONS.MARK_SEEN(notificationId)
    );

    return response?.data?.data ?? null;
};

export const markAllNotificationsSeen = async () => {
    const response = await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_SEEN);
    return response?.data?.data ?? null;
};

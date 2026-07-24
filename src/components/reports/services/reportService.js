import apiClient from "../../../services/apiClient";
import { API_BODY_FIELDS, API_ENDPOINTS } from "../../../constants";

export const createReport = async ({ targetType, targetId, reasonCode, details }) => {
    const response = await apiClient.post(API_ENDPOINTS.REPORTS.CREATE, {
        [API_BODY_FIELDS.REPORTS.TARGET_TYPE]: targetType,
        [API_BODY_FIELDS.REPORTS.TARGET_ID]: targetId,
        [API_BODY_FIELDS.REPORTS.REASON_CODE]: reasonCode,
        [API_BODY_FIELDS.REPORTS.DETAILS]: details,
    });

    return {
        status: response?.status ?? null,
        data: response?.data ?? null,
    };
};

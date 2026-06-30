import axios from "axios";

import { API_ENDPOINTS, HTTP_STATUS, ROUTES } from "../constants";
import { authStorage } from "./authStorage";
import { recordHttpError, recordHttpSuccess } from "./observability";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const PUBLIC_AUTH_ENDPOINTS = [
    API_ENDPOINTS.AUTH.LOGIN,
    API_ENDPOINTS.AUTH.REGISTER,
];

const isPublicAuthRequest = (url = "") => {
    return PUBLIC_AUTH_ENDPOINTS.some((endpoint) => url.endsWith(endpoint));
};

apiClient.interceptors.request.use(
    (config) => {
        const token = authStorage.getToken();
        config.metadata = {
            ...(config.metadata ?? {}),
            startedAt: Date.now(),
        };

        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        recordHttpSuccess("api", response);
        return response;
    },
    (error) => {
        const status = error?.response?.status;
        const requestUrl = error?.config?.url || "";

        recordHttpError("api", error);

        if (
        status === HTTP_STATUS.UNAUTHORIZED &&
        !isPublicAuthRequest(requestUrl)
        ) {
        authStorage.clear();

        if (window.location.pathname !== ROUTES.LOGIN) {
            window.location.assign(ROUTES.LOGIN);
        }
        }

        return Promise.reject(error);
    }
);

export default apiClient;

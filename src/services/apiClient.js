import axios from "axios";
import { authStorage } from "./authStorage";
import { HTTP_ERROR_MESSAGES, HTTP_STATUS } from "../constants";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = authStorage.getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === HTTP_STATUS.UNAUTHORIZED) {
        authStorage.clear();
        }

        const normalizedError = {
        status,
        message:
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            HTTP_ERROR_MESSAGES.DEFAULT,
        details: error.response?.data?.details || null,
        };

        return Promise.reject(normalizedError);
    }
);
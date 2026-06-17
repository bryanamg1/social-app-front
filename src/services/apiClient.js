import axios from "axios";

import { STORAGE_KEYS } from "../constants";

    const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

    const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    });

    apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
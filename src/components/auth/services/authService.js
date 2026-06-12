import { apiClient } from "../../../services/apiClient";

export const authService = {
    async register(payload) {
        const response = await apiClient.post("/api/auth/register", payload);
        return response.data;
    },

    async login(payload) {
        const response = await apiClient.post("/api/auth/login", payload);
        return response.data;
    },

    async updateProfile(userId, payload) {
        const response = await apiClient.patch(`/api/auth/update/${userId}`, payload);
        return response.data;
    },

    async getUserById(userId) {
        const response = await apiClient.get(`/api/auth/userstid/${userId}`);
        return response.data;
    },

    async searchUsers(query) {
        const response = await apiClient.get("/api/auth/usersSearch", {
        params: { query },
        });

        return response.data;
    },
};
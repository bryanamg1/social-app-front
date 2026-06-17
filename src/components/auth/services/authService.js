import apiClient from "../../../services/apiClient";
import { AUTH_MESSAGES } from "../../../constants";

const decodeJwtPayload = (token) => {
    try {
        const base64Url = token.split(".")[1];

        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((char) => {
            return `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`;
            })
            .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
};

const getUserFromToken = (token) => {
    const payload = decodeJwtPayload(token);

    if (!payload) return null;

    return {
        id: payload.id ?? payload.userId ?? payload.userid ?? payload.sub,
        email: payload.email,
        name: payload.name ?? payload.username,
    };
};

const normalizeLoginResponse = (response, email) => {
    const responseData = response?.data;
    const payload = responseData?.data ?? responseData;

    const token =
        typeof payload === "string"
        ? payload
        : payload?.token ?? payload?.accessToken ?? payload?.jwt;

    if (!token) {
        throw new Error(AUTH_MESSAGES.TOKEN_NOT_FOUND);
    }

    const userFromApi =
        payload?.user ??
        payload?.profile ??
        payload?.loggedUser ??
        payload?.authUser ??
        null;

    const userFromToken = getUserFromToken(token);

    const user = userFromApi
        ? {
            ...userFromToken,
            ...userFromApi,
        }
        : userFromToken ?? { email };

    return {
        token,
        user,
    };
};

export const loginUser = async ({ email, password }) => {
    const response = await apiClient.post("/auth/login", {
        email,
        password,
    });

    return normalizeLoginResponse(response, email);
};
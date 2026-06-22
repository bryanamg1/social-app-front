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
    } catch {
        return null;
    }
};

const normalizeUser = (userData, fallbackEmail = "") => {
    if (!userData) return null;

    const userId =
        userData.user_id ??
        userData.id ??
        userData.userId ??
        userData.userid ??
        userData.sub;

    const email = userData.email ?? fallbackEmail;

    const userName =
        userData.user_name ??
        userData.name ??
        userData.username ??
        email;

    return {
        ...userData,
        id: userId,
        user_id: userId,
        email,
        name: userName,
        user_name: userName,
    };
};

const getUserFromToken = (token, fallbackEmail = "") => {
    const payload = decodeJwtPayload(token);

    if (!payload) return null;

    const tokenUser = payload.user ?? payload.data ?? payload;

    return normalizeUser(tokenUser, fallbackEmail);
};

const normalizeLoginResponse = (response, email) => {
    const responseData = response?.data;
    const payload = responseData?.data ?? responseData;

    const token =
        typeof payload === "string"
        ? payload
        : payload?.token ??
            payload?.accessToken ??
            payload?.access_token ??
            payload?.jwt;

    if (!token) {
        throw new Error(AUTH_MESSAGES.TOKEN_NOT_FOUND);
    }

    const refreshToken =
        payload?.refreshToken ??
        payload?.refresh_token ??
        payload?.refresh ??
        null;

    const userFromApi =
        payload?.user ??
        payload?.profile ??
        payload?.loggedUser ??
        payload?.authUser ??
        null;

    const normalizedApiUser = normalizeUser(userFromApi, email);
    const userFromToken = getUserFromToken(token, email);

    const user =
        normalizedApiUser ??
        userFromToken ?? {
        id: null,
        user_id: null,
        email,
        name: email,
        user_name: email,
        };

    return {
        token,
        accessToken: token,
        refreshToken,
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

export const registerUser = async ({ user_name, userName, email, password }) => {
    const response = await apiClient.post("/auth/register", {
        user_name: user_name ?? userName,
        email,
        password,
    });

    return response.data;
};

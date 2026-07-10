export const ROUTES = {
    ROOT: "/",
    HOME: "/feed",
    FEED:"/feed",
    MESSAGES: "/messages",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    PROFILE: "/profile",
    PROFILE_DETAIL: "/profile/:userId",
    USER_PROFILE: (userId) => `/profile/${userId}`,
    NOT_FOUND: "*",
};

export const ROUTE_PARAMS = {
    USER_ID: "userId",
};

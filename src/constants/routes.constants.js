export const ROUTES = {
    ROOT: "/",
    HOME: "/feed",
    FEED:"/feed",
    MESSAGES: "/messages",
    LOGIN: "/login",
    REGISTER: "/register",
    PROFILE: "/profile",
    PROFILE_DETAIL: "/profile/:userId",
    USER_PROFILE: (userId) => `/profile/${userId}`,
    NOT_FOUND: "*",
};

export const ROUTE_PARAMS = {
    USER_ID: "userId",
};

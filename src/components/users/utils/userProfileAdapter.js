import { PROFILE_TEXTS } from "../../../constants";

export const getUserId = (user) => {
    return user?.id ?? user?.userId ?? user?.userid ?? user?.user_id ?? user?._id;
};

export const getUserName = (user) => {
    return (
        user?.user_name ??
        user?.userName ??
        user?.name ??
        user?.username ??
        user?.email ??
        PROFILE_TEXTS.TITLE
    );
};

export const getUserEmail = (user) => {
    return user?.email ?? "";
};

export const getUserAvatar = (user) => {
    return user?.avatar_url ?? user?.avatarUrl ?? user?.avatar ?? "";
};

export const getUserBio = (user) => {
    return user?.bio ?? "";
};

export const getUserLocation = (user) => {
    return user?.location ?? "";
};

export const getUserCreatedAt = (user) => {
    return user?.created_at ?? user?.createdAt ?? null;
};

export const normalizeUserProfile = (user) => {
    if (!user) return null;

    const userId = getUserId(user);
    const userName = getUserName(user);

    return {
        ...user,
        id: userId,
        user_id: userId,
        name: userName,
        user_name: userName,
        email: getUserEmail(user),
        avatar_url: getUserAvatar(user),
        bio: getUserBio(user),
        location: getUserLocation(user),
        created_at: getUserCreatedAt(user),
    };
};

export const getProfileFromResponse = (response) => {
    const responseData = response?.data;
    const profile =
        responseData?.data ??
        responseData?.user ??
        responseData?.profile ??
        responseData;

    return normalizeUserProfile(profile);
};

export const getUpdatedProfileFromResponse = (response, currentProfile) => {
    const responseData = response?.data;
    const profileData = responseData?.data ?? responseData?.profile ?? {};

    return normalizeUserProfile({
        ...(currentProfile || {}),
        ...profileData,
    });
};

const extractArray = (value) => {
    if (Array.isArray(value)) return value;

    if (Array.isArray(value?.data)) return value.data;
    if (Array.isArray(value?.posts)) return value.posts;
    if (Array.isArray(value?.items)) return value.items;
    if (Array.isArray(value?.results)) return value.results;

    if (value && typeof value === "object") {
        return Object.keys(value)
        .filter((key) => Number.isInteger(Number(key)))
        .sort((firstKey, secondKey) => Number(firstKey) - Number(secondKey))
        .map((key) => value[key]);
    }

    return [];
};

export const getUserPostsFromResponse = (response) => {
    const responseData = response?.data;
    const posts = extractArray(responseData);
    const meta = responseData?.meta ?? {};

    return {
        posts,
        meta: {
        page: meta.page,
        limit: meta.limit,
        total: meta.total,
        totalPages: meta.totalPages,
        },
    };
};

export const formatProfileDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};

const normalizeTextValue = (value) => {
    return String(value ?? "").trim();
};

export const getProfileFormChanges = (profile, form) => {
    const currentUserName = normalizeTextValue(getUserName(profile));
    const currentBio = normalizeTextValue(getUserBio(profile));
    const currentLocation = normalizeTextValue(getUserLocation(profile));
    const nextUserName = normalizeTextValue(form?.userName);
    const nextBio = normalizeTextValue(form?.bio);
    const nextLocation = normalizeTextValue(form?.location);

    return {
        userNameChanged: nextUserName !== currentUserName,
        bioChanged: nextBio !== currentBio,
        locationChanged: nextLocation !== currentLocation,
        values: {
        userName: nextUserName,
        bio: nextBio,
        location: nextLocation,
        },
    };
};

export const hasProfileFormChanges = (profile, form) => {
    const changes = getProfileFormChanges(profile, form);

    return (
        changes.userNameChanged ||
        changes.bioChanged ||
        changes.locationChanged
    );
};

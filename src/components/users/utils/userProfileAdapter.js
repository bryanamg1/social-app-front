import { FEED_POST_TYPES, PROFILE_TEXTS } from "../../../constants";

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

export const normalizePostTypeSummaryEntry = (entry) => {
    const normalizedType = `${entry?.post_type ?? entry?.postType ?? ""}`
        .trim()
        .toLowerCase();
    const postType = Object.values(FEED_POST_TYPES).includes(normalizedType)
        ? normalizedType
        : null;

    if (!postType || postType === FEED_POST_TYPES.ALL) {
        return null;
    }

    return {
        post_type: postType,
        total: Number(entry?.total) || 0,
    };
};

export const getUserPostTypeSummary = (user) => {
    const summary =
        user?.post_type_summary ??
        user?.postTypeSummary ??
        user?.activity_summary ??
        [];

    if (!Array.isArray(summary)) {
        return [];
    }

    return summary.map(normalizePostTypeSummaryEntry).filter(Boolean);
};

export const getDominantPostType = (user) => {
    const dominantType = `${user?.dominant_post_type ?? user?.dominantPostType ?? ""}`
        .trim()
        .toLowerCase();

    if (!dominantType || dominantType === FEED_POST_TYPES.ALL) {
        return null;
    }

    return Object.values(FEED_POST_TYPES).includes(dominantType)
        ? dominantType
        : null;
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
        projects: getUserProjects(user),
        post_type_summary: getUserPostTypeSummary(user),
        dominant_post_type: getDominantPostType(user),
        dominant_post_type_count: Number(user?.dominant_post_type_count) || 0,
        total_posts: Number(user?.total_posts) || 0,
    };
};

const normalizeTechnologies = (value) => {
    if (Array.isArray(value)) {
        return value
            .map((item) => String(item ?? "").trim())
            .filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [];
};

export const normalizeProfileProject = (project) => {
    if (!project) return null;

    const projectId =
        project?.project_id ??
        project?.projectId ??
        project?.id ??
        null;

    return {
        ...project,
        project_id: projectId,
        projectId,
        title: `${project?.title ?? ""}`.trim(),
        summary: `${project?.summary ?? ""}`.trim(),
        technologies: normalizeTechnologies(project?.technologies),
        technologies_text:
            Array.isArray(project?.technologies)
                ? project.technologies.join(", ")
                : `${project?.technologies ?? ""}`.trim(),
        repo_url: project?.repo_url ?? project?.repoUrl ?? "",
        demo_url: project?.demo_url ?? project?.demoUrl ?? "",
        status: `${project?.status ?? ""}`.trim().toLowerCase(),
        created_at: project?.created_at ?? project?.createdAt ?? null,
        updated_at: project?.updated_at ?? project?.updatedAt ?? null,
    };
};

export const getUserProjects = (user) => {
    const projects = user?.projects ?? user?.projectList ?? user?.items ?? [];

    if (!Array.isArray(projects)) {
        return [];
    }

    return projects.map(normalizeProfileProject).filter(Boolean);
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

export const getProjectFromResponse = (response) => {
    const responseData = response?.data;
    const project =
        responseData?.data ??
        responseData?.project ??
        responseData;

    return normalizeProfileProject(project);
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

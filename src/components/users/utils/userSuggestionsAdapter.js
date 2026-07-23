import {
    getFeedPostTypeLabel,
    PROFILE_PROJECT_STATUS_VALUES,
    USER_SUGGESTIONS_TEXTS,
    getProfileProjectStatusLabel,
} from "../../../constants";
import {
    getDominantPostType,
    getUserBio,
    getUserId,
    normalizeProfileProject,
    normalizeUserProfile,
} from "./userProfileAdapter";

const DEFAULT_PROJECT_STATUS = PROFILE_PROJECT_STATUS_VALUES.IN_PROGRESS;
const MAX_PROJECT_TECHNOLOGIES = 3;

const buildFeaturedProject = (suggestion) => {
    const title = `${suggestion?.featured_project_title ?? ""}`.trim();
    const projectCount = Number(suggestion?.project_count) || 0;

    if (!title || projectCount <= 0) {
        return null;
    }

    const normalizedProject = normalizeProfileProject({
        title,
        status: suggestion?.featured_project_status || DEFAULT_PROJECT_STATUS,
        technologies: suggestion?.featured_project_technologies ?? "",
    });

    if (!normalizedProject) {
        return null;
    }

    return {
        ...normalizedProject,
        technologies: normalizedProject.technologies.slice(
            0,
            MAX_PROJECT_TECHNOLOGIES
        ),
        statusLabel: getProfileProjectStatusLabel(normalizedProject.status),
    };
};

export const normalizeUserSuggestion = (suggestion) => {
    const normalizedUser = normalizeUserProfile(suggestion);
    const projectCount = Number(suggestion?.project_count) || 0;
    const featuredProject = buildFeaturedProject(suggestion);
    const dominantPostType = getDominantPostType(suggestion);
    const dominantPostTypeCount = Number(suggestion?.dominant_post_type_count) || 0;
    const bio = getUserBio(normalizedUser)?.trim();

    return {
        ...normalizedUser,
        id: getUserId(normalizedUser),
        followers_count: Number(suggestion?.followers_count) || 0,
        project_count: projectCount,
        total_posts: Number(suggestion?.total_posts) || 0,
        bio: bio || USER_SUGGESTIONS_TEXTS.BIO_FALLBACK,
        projectSignal:
            featuredProject?.title || projectCount > 0
                ? {
                    count: projectCount,
                    summaryLabel: USER_SUGGESTIONS_TEXTS.PROJECTS_COUNT(projectCount),
                    title:
                        featuredProject?.title ||
                        USER_SUGGESTIONS_TEXTS.PROJECT_FALLBACK,
                    statusLabel:
                        featuredProject?.statusLabel ||
                        getProfileProjectStatusLabel(DEFAULT_PROJECT_STATUS),
                    technologies: featuredProject?.technologies ?? [],
                }
                : null,
        intentSignal:
            dominantPostType && dominantPostTypeCount > 0
                ? {
                    label: getFeedPostTypeLabel(dominantPostType),
                    count: dominantPostTypeCount,
                    countLabel:
                        USER_SUGGESTIONS_TEXTS.INTENT_SIGNAL_COUNT(
                            dominantPostTypeCount
                        ),
                }
                : null,
    };
};

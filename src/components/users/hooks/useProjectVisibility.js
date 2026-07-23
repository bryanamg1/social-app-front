import { useMemo, useState } from "react";

import {
    PROFILE_PROJECT_FILTER_OPTIONS,
    PROFILE_PROJECT_FILTER_VALUES,
    PROFILE_PROJECT_SUMMARY_ORDER,
    getProfileProjectStatusLabel,
} from "../../../constants";

const createProjectSummary = (projects) => {
    return PROFILE_PROJECT_SUMMARY_ORDER.map((status) => {
        const count = projects.filter((project) => project.status === status).length;

        return {
            status,
            label: getProfileProjectStatusLabel(status),
            count,
        };
    });
};

export const useProjectVisibility = (projects) => {
    const [selectedFilter, setSelectedFilter] = useState(
        PROFILE_PROJECT_FILTER_VALUES.ALL
    );

    const filteredProjects = useMemo(() => {
        if (selectedFilter === PROFILE_PROJECT_FILTER_VALUES.ALL) {
            return projects;
        }

        return projects.filter((project) => project.status === selectedFilter);
    }, [projects, selectedFilter]);

    const summary = useMemo(() => {
        return createProjectSummary(projects);
    }, [projects]);

    return {
        selectedFilter,
        filterOptions: PROFILE_PROJECT_FILTER_OPTIONS,
        filteredProjects,
        visibleCount: filteredProjects.length,
        totalCount: projects.length,
        summary,
        onFilterChange: setSelectedFilter,
    };
};

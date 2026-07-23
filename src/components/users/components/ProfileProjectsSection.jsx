import { Alert, Button, Chip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { PROFILE_TEXTS } from "../../../constants";
import { ProfileProjectCard } from "./ProfileProjectCard";
import { ProfileProjectForm } from "./ProfileProjectForm";
import styles from "../pages/ProfilePage.module.css";

export function ProfileProjectsSection({
    projects,
    canManage = false,
    totalProjectsCount = 0,
    visibleProjectsCount = 0,
    projectFilterOptions = [],
    selectedProjectFilter,
    projectSummary = [],
    isFormOpen = false,
    editingProjectId = null,
    projectForm,
    projectError,
    projectSuccess,
    savingProject,
    deletingProjectId,
    onOpenCreate,
    onProjectFilterChange,
    onProjectFieldChange,
    onSubmitProject,
    onCancelProject,
    onEditProject,
    onDeleteProject,
}) {
    const hasProjects = projects.length > 0;
    const hasAnyProjects = totalProjectsCount > 0;

    return (
        <section className={styles.projectsSection}>
            <div className={styles.projectsSectionHeader}>
                <div>
                    <Typography variant="h5" className={styles.postsTitle}>
                        {PROFILE_TEXTS.PROJECTS.TITLE}
                    </Typography>
                    <Typography className={styles.projectsDescription}>
                        {PROFILE_TEXTS.PROJECTS.DESCRIPTION}
                    </Typography>
                    {hasAnyProjects ? (
                        <Typography className={styles.projectsCount}>
                            {PROFILE_TEXTS.PROJECTS.COUNT_LABEL(visibleProjectsCount)}
                        </Typography>
                    ) : null}
                </div>

                {canManage ? (
                    <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        onClick={onOpenCreate}
                    >
                        {PROFILE_TEXTS.PROJECTS.ADD_BUTTON}
                    </Button>
                ) : null}
            </div>

            {projectError ? (
                <Alert severity="error" className={styles.projectsAlert}>
                    {projectError}
                </Alert>
            ) : null}

            {projectSuccess ? (
                <Alert severity="success" className={styles.projectsAlert}>
                    {projectSuccess}
                </Alert>
            ) : null}

            {canManage && isFormOpen ? (
                <ProfileProjectForm
                    form={projectForm}
                    editingProjectId={editingProjectId}
                    saving={savingProject}
                    onCancel={onCancelProject}
                    onChange={onProjectFieldChange}
                    onSubmit={onSubmitProject}
                />
            ) : null}

            {hasAnyProjects ? (
                <>
                    <div className={styles.projectsToolbar}>
                        <div className={styles.projectsFilterGroup}>
                            <Typography className={styles.projectsFilterLabel}>
                                {PROFILE_TEXTS.PROJECTS.FILTER_LABEL}
                            </Typography>
                            <div className={styles.projectsFilterChips}>
                                {projectFilterOptions.map((option) => (
                                    <Chip
                                        key={option.value}
                                        label={option.label}
                                        size="small"
                                        clickable
                                        color={
                                            selectedProjectFilter === option.value
                                                ? "primary"
                                                : "default"
                                        }
                                        variant={
                                            selectedProjectFilter === option.value
                                                ? "filled"
                                                : "outlined"
                                        }
                                        onClick={() => onProjectFilterChange(option.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.projectsSummary}>
                            {projectSummary.map((item) => (
                                <div
                                    key={item.status}
                                    className={styles.projectsSummaryItem}
                                >
                                    <Typography className={styles.projectsSummaryValue}>
                                        {item.count}
                                    </Typography>
                                    <Typography className={styles.projectsSummaryLabel}>
                                        {item.label}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>

                    {hasProjects ? (
                        <div className={styles.projectsGrid}>
                            {projects.map((project) => (
                                <ProfileProjectCard
                                    key={project.project_id}
                                    project={project}
                                    canManage={canManage}
                                    deleting={
                                        String(deletingProjectId) ===
                                        String(project.project_id)
                                    }
                                    onEdit={onEditProject}
                                    onDelete={onDeleteProject}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.projectsEmptyState}>
                            <Typography
                                variant="h6"
                                className={styles.projectsEmptyTitle}
                            >
                                {PROFILE_TEXTS.PROJECTS.EMPTY_TITLE}
                            </Typography>
                            <Typography className={styles.projectsEmptyDescription}>
                                {canManage
                                    ? PROFILE_TEXTS.PROJECTS.EMPTY_DESCRIPTION
                                    : PROFILE_TEXTS.PROJECTS.PUBLIC_EMPTY_DESCRIPTION}
                            </Typography>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.projectsEmptyState}>
                    <Typography variant="h6" className={styles.projectsEmptyTitle}>
                        {PROFILE_TEXTS.PROJECTS.EMPTY_TITLE}
                    </Typography>
                    <Typography className={styles.projectsEmptyDescription}>
                        {canManage
                            ? PROFILE_TEXTS.PROJECTS.EMPTY_DESCRIPTION
                            : PROFILE_TEXTS.PROJECTS.PUBLIC_EMPTY_DESCRIPTION}
                    </Typography>
                </div>
            )}
        </section>
    );
}

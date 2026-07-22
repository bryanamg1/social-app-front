import { Button, Chip, Stack, Typography } from "@mui/material";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import {
    PROFILE_TEXTS,
    getProfileProjectStatusLabel,
} from "../../../constants";
import styles from "../pages/ProfilePage.module.css";

export function ProfileProjectCard({
    project,
    canManage = false,
    deleting = false,
    onEdit,
    onDelete,
}) {
    return (
        <article className={styles.projectCard}>
            <div className={styles.projectCardHeader}>
                <div>
                    <Typography variant="h6" className={styles.projectTitle}>
                        {project.title}
                    </Typography>
                    <Typography className={styles.projectSummary}>
                        {project.summary || PROFILE_TEXTS.PROJECTS.SUMMARY_FALLBACK}
                    </Typography>
                </div>

                <Chip
                    label={getProfileProjectStatusLabel(project.status)}
                    className={styles.projectStatusChip}
                    size="small"
                />
            </div>

            {project.technologies.length ? (
                <div className={styles.projectTags}>
                    {project.technologies.map((technology) => (
                        <Chip
                            key={`${project.project_id}-${technology}`}
                            label={technology}
                            size="small"
                            className={styles.projectTag}
                        />
                    ))}
                </div>
            ) : null}

            {(project.repo_url || project.demo_url) ? (
                <Stack direction="row" spacing={1.25} useFlexGap sx={{ flexWrap: "wrap" }}>
                    {project.repo_url ? (
                        <Button
                            component="a"
                            href={project.repo_url}
                            target="_blank"
                            rel="noreferrer"
                            variant="outlined"
                            startIcon={<LaunchRoundedIcon />}
                        >
                            {PROFILE_TEXTS.PROJECTS.REPO_LINK}
                        </Button>
                    ) : null}

                    {project.demo_url ? (
                        <Button
                            component="a"
                            href={project.demo_url}
                            target="_blank"
                            rel="noreferrer"
                            variant="outlined"
                            startIcon={<LaunchRoundedIcon />}
                        >
                            {PROFILE_TEXTS.PROJECTS.DEMO_LINK}
                        </Button>
                    ) : null}
                </Stack>
            ) : null}

            {canManage ? (
                <div className={styles.projectCardActions}>
                    <Button
                        variant="outlined"
                        startIcon={<EditRoundedIcon />}
                        onClick={() => onEdit(project)}
                    >
                        {PROFILE_TEXTS.PROJECTS.EDIT_BUTTON}
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutlineRoundedIcon />}
                        disabled={deleting}
                        onClick={() => onDelete(project.project_id)}
                    >
                        {PROFILE_TEXTS.PROJECTS.DELETE_BUTTON}
                    </Button>
                </div>
            ) : null}
        </article>
    );
}

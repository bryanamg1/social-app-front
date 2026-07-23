import { Typography } from "@mui/material";

import styles from "../styles/ShowcasePage.module.css";

export function ShowcaseSection({
    eyebrow,
    title,
    description,
    children,
}) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <p className={styles.sectionEyebrow}>{eyebrow}</p>
                <Typography variant="h4" component="h2" className={styles.sectionTitle}>
                    {title}
                </Typography>
                <Typography className={styles.sectionDescription}>
                    {description}
                </Typography>
            </div>

            {children}
        </section>
    );
}

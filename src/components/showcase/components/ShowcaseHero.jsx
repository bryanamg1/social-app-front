import { Button, Typography } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";

import { ROUTES } from "../../../constants";
import styles from "../styles/ShowcasePage.module.css";

export function ShowcaseHero({
    hero,
    metrics,
    imageSrc,
}) {
    return (
        <header className={styles.hero}>
            <div className={styles.heroCopy}>
                <p className={styles.heroEyebrow}>{hero.EYEBROW}</p>

                <Typography variant="h1" component="h1" className={styles.heroTitle}>
                    {hero.TITLE}
                </Typography>

                <Typography className={styles.heroDescription}>
                    {hero.DESCRIPTION}
                </Typography>

                <div className={styles.heroActions}>
                    <Button
                        component={RouterLink}
                        to={ROUTES.LOGIN}
                        variant="contained"
                        endIcon={<ArrowForwardRoundedIcon />}
                    >
                        {hero.PRIMARY_CTA}
                    </Button>

                    <Button
                        component={RouterLink}
                        to={ROUTES.FEED}
                        variant="outlined"
                        endIcon={<OpenInNewRoundedIcon />}
                    >
                        {hero.SECONDARY_CTA}
                    </Button>
                </div>

                <div className={styles.metricGrid}>
                    {metrics.map((item) => (
                        <div key={item.label} className={styles.metricItem}>
                            <span className={styles.metricLabel}>{item.label}</span>
                            <span className={styles.metricValue}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.heroMedia}>
                <img
                    src={imageSrc}
                    alt={hero.IMAGE_ALT}
                    className={styles.heroImage}
                />
            </div>
        </header>
    );
}

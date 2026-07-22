import { Button, Chip, Typography } from "@mui/material";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

import heroImage from "../../../assets/hero.png";
import {
    SHOWCASE_ARCHITECTURE_ITEMS,
    SHOWCASE_CAPABILITIES,
    SHOWCASE_DEPLOY_NOTES,
    SHOWCASE_LEARNINGS,
    SHOWCASE_LINKS,
    SHOWCASE_METRICS,
    SHOWCASE_PRODUCT_PILLARS,
    SHOWCASE_QUALITY_ITEMS,
    SHOWCASE_ROADMAP_PHASES,
    SHOWCASE_TEXTS,
} from "../../../constants";
import { ShowcaseHero } from "../components/ShowcaseHero";
import { ShowcaseSection } from "../components/ShowcaseSection";

import styles from "../styles/ShowcasePage.module.css";

const renderTags = (tags = []) => {
    return (
        <div className={styles.cardTags}>
            {tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    className={styles.cardTag}
                />
            ))}
        </div>
    );
};

const renderInfoCards = (items, withTags = false) => {
    return (
        <div className={styles.cardGrid}>
            {items.map((item) => (
                <article key={item.title} className={styles.infoCard}>
                    <Typography variant="h6" component="h3" className={styles.cardTitle}>
                        {item.title}
                    </Typography>

                    <Typography className={styles.cardDescription}>
                        {item.description}
                    </Typography>

                    {withTags ? renderTags(item.tags) : null}
                </article>
            ))}
        </div>
    );
};

export default function ShowcasePage() {
    return (
        <main className={styles.page}>
            <ShowcaseHero
                hero={SHOWCASE_TEXTS.HERO}
                metrics={SHOWCASE_METRICS}
                imageSrc={heroImage}
            />

            <ShowcaseSection {...SHOWCASE_TEXTS.SECTIONS.PRODUCT}>
                {renderInfoCards(SHOWCASE_PRODUCT_PILLARS, true)}
            </ShowcaseSection>

            <ShowcaseSection {...SHOWCASE_TEXTS.SECTIONS.CAPABILITIES}>
                {renderInfoCards(SHOWCASE_CAPABILITIES)}
            </ShowcaseSection>

            <ShowcaseSection {...SHOWCASE_TEXTS.SECTIONS.ARCHITECTURE}>
                {renderInfoCards(SHOWCASE_ARCHITECTURE_ITEMS, true)}
            </ShowcaseSection>

            <ShowcaseSection {...SHOWCASE_TEXTS.SECTIONS.QUALITY}>
                <div className={styles.cardGrid}>
                    {SHOWCASE_QUALITY_ITEMS.map((item) => (
                        <article key={item.title} className={styles.infoCard}>
                            <Typography
                                variant="h6"
                                component="h3"
                                className={styles.cardTitle}
                            >
                                {item.title}
                            </Typography>

                            <Typography className={styles.cardDescription}>
                                {item.description}
                            </Typography>
                        </article>
                    ))}

                    <article className={styles.infoCard}>
                        <Typography variant="h6" component="h3" className={styles.cardTitle}>
                            {SHOWCASE_TEXTS.CREDENTIALS.TITLE}
                        </Typography>

                        <Typography className={styles.cardDescription}>
                            {SHOWCASE_TEXTS.CREDENTIALS.DESCRIPTION}
                        </Typography>
                    </article>
                </div>
            </ShowcaseSection>

            <ShowcaseSection {...SHOWCASE_TEXTS.SECTIONS.LINKS}>
                <div className={styles.cardGrid}>
                    {SHOWCASE_LINKS.map((item) => (
                        <article key={item.title} className={styles.infoCard}>
                            <div className={styles.cardBadge}>{item.badge}</div>

                            <Typography
                                variant="h6"
                                component="h3"
                                className={styles.cardTitle}
                            >
                                {item.title}
                            </Typography>

                            <Typography className={styles.cardDescription}>
                                {item.description}
                            </Typography>

                            <Button
                                component="a"
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                variant="outlined"
                                endIcon={<LaunchRoundedIcon />}
                                className={styles.linkButton}
                            >
                                {item.ctaLabel}
                            </Button>
                        </article>
                    ))}
                </div>

                <div className={styles.noteList}>
                    {SHOWCASE_DEPLOY_NOTES.map((note) => (
                        <p key={note} className={styles.noteItem}>
                            {note}
                        </p>
                    ))}
                </div>
            </ShowcaseSection>

            <ShowcaseSection {...SHOWCASE_TEXTS.SECTIONS.ROADMAP}>
                {renderInfoCards(SHOWCASE_ROADMAP_PHASES)}
            </ShowcaseSection>

            <ShowcaseSection {...SHOWCASE_TEXTS.SECTIONS.LEARNINGS}>
                {renderInfoCards(SHOWCASE_LEARNINGS)}
            </ShowcaseSection>
        </main>
    );
}

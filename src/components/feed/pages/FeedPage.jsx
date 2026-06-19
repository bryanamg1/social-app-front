import {Avatar, Button, Card, CardContent, Chip, Stack, Typography, } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { FEED_TEXTS, PREVIEW_REACTIONS } from "../../../constants";
import styles from "./FeedPage.module.css";

export function FeedPage() {
    return (
        <section className={styles.page}>
        <header className={styles.header}>
            <div>
            <span className={styles.eyebrow}>{FEED_TEXTS.EYEBROW}</span>
            <h1>{FEED_TEXTS.TITLE}</h1>
            </div>
        </header>

        <Card component="article" className={styles.composer}>
            <CardContent className={styles.composerContent}>
            <Avatar
                sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontWeight: 900,
                }}
            >
                U
            </Avatar>

            <div className={styles.composerBody}>
                <Typography color="text.secondary">
                {FEED_TEXTS.COMPOSER_PLACEHOLDER}
                </Typography>

                <Stack direction="row" spacing={1} mt={2}>
                <Button variant="contained" startIcon={<AddRoundedIcon />}>
                    {FEED_TEXTS.CREATE_POST}
                </Button>

                <Button variant="outlined" startIcon={<ImageRoundedIcon />}>
                    Imagen
                </Button>
                </Stack>
            </div>
            </CardContent>
        </Card>

        <Card component="article" className={styles.placeholderPost}>
            <CardContent>
            <div className={styles.postHeader}>
                <Avatar
                sx={{
                    bgcolor: "background.default",
                    color: "primary.main",
                    fontWeight: 900,
                }}
                >
                S
                </Avatar>

                <div>
                <strong>{FEED_TEXTS.PREVIEW_AUTHOR}</strong>
                <small>{FEED_TEXTS.PREVIEW_SUBTITLE}</small>
                </div>
            </div>

            <Typography className={styles.description}>
                {FEED_TEXTS.PREVIEW_DESCRIPTION}
            </Typography>

            <div className={styles.fakeImage} />

            <Stack direction="row" spacing={1} flexWrap="wrap" mt={2} useFlexGap>
                {PREVIEW_REACTIONS.map((reaction) => (
                <Chip key={reaction} label={reaction} size="small" />
                ))}
            </Stack>
            </CardContent>
        </Card>
        </section>
    );
}
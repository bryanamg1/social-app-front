import { Avatar, Button, Stack, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { PROFILE_TEXTS } from "../../../constants";
import styles from "./ProfilePage.module.css";

export function ProfilePage() {
    return (
        <section className={styles.page}>
        <header className={styles.cover}>
            <Avatar
            className={styles.avatar}
            sx={{
                bgcolor: "background.default",
                color: "primary.main",
                fontWeight: 900,
            }}
            >
            U
            </Avatar>
        </header>

        <section className={styles.profileInfo}>
            <Stack spacing={1.5} sx={{alignItems: "flex-start",}}>
            <Typography variant="h4" component="h1" fontWeight={900}>
                {PROFILE_TEXTS.TITLE}
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{lineHeight: 1.6,maxWidth: 560,}}>
                {PROFILE_TEXTS.DESCRIPTION}
            </Typography>

            <Button variant="outlined" startIcon={<EditRoundedIcon />}>
                {PROFILE_TEXTS.EDIT_PROFILE}
            </Button>
            </Stack>
        </section>
        </section>
    );
}
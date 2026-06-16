import {Card, CardContent, Chip, InputAdornment, Stack, TextField, Typography,} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { RIGHT_SIDEBAR_TEXTS } from "../../../constants";
import styles from "../styles/RightSidebar.module.css";

export function RightSidebar() {
    return (
        <aside className={styles.sidebar}>
        <Card component="section">
            <CardContent>
            <Typography variant="h6" className={styles.cardTitle}>
                {RIGHT_SIDEBAR_TEXTS.SEARCH_TITLE}
            </Typography>

            <TextField
                fullWidth
                type="search"
                placeholder={RIGHT_SIDEBAR_TEXTS.SEARCH_PLACEHOLDER}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                ),
                }}
            />
            </CardContent>
        </Card>

        <Card component="section">
            <CardContent>
            <Typography variant="h6" className={styles.cardTitle}>
                {RIGHT_SIDEBAR_TEXTS.SUGGESTIONS_TITLE}
            </Typography>

            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                {RIGHT_SIDEBAR_TEXTS.SUGGESTIONS_DESCRIPTION}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" mt={2} useFlexGap>
                <Chip size="small" label="React" />
                <Chip size="small" label="Social" />
                <Chip size="small" label="Feed" />
            </Stack>
            </CardContent>
        </Card>

        <Card component="section">
            <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <AutoAwesomeRoundedIcon color="primary" fontSize="small" />

                <Typography variant="h6" className={styles.cardTitleNoMargin}>
                {RIGHT_SIDEBAR_TEXTS.TRENDING_TITLE}
                </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                {RIGHT_SIDEBAR_TEXTS.TRENDING_DESCRIPTION}
            </Typography>
            </CardContent>
        </Card>
        </aside>
    );
}
import { Link as RouterLink } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

import { AUTH_TEXTS, ROUTES } from "../../../constants";
import styles from "../styles/AuthPage.module.css";
import { getAuthTextValue } from "../utils/authFeedback";

export const ForgotPasswordForm = ({
    formValues,
    loadingRequest,
    error,
    successMessage,
    onChange,
    onSubmit,
}) => {
    const errorMessage = getAuthTextValue(
        error,
        AUTH_TEXTS.ERRORS.FORGOT_PASSWORD_FAILED
    );
    const successText = getAuthTextValue(successMessage);

    return (
        <Card className={styles.authCard}>
            <CardContent className={styles.authCardContent}>
                <Box className={styles.authHeader}>
                    <Typography component="h1" className={styles.authTitle}>
                        {AUTH_TEXTS.FORGOT_PASSWORD.TITLE}
                    </Typography>

                    <Typography className={styles.authSubtitle}>
                        {AUTH_TEXTS.FORGOT_PASSWORD.SUBTITLE}
                    </Typography>
                </Box>

                {successText && (
                    <Alert severity="success" className={styles.authAlert}>
                        {successText}
                    </Alert>
                )}

                {errorMessage && (
                    <Alert severity="error" className={styles.authAlert}>
                        {errorMessage}
                    </Alert>
                )}

                <Box component="form" onSubmit={onSubmit} className={styles.authForm}>
                    <TextField
                        fullWidth
                        type="email"
                        name="email"
                        label={AUTH_TEXTS.FORGOT_PASSWORD.EMAIL_LABEL}
                        placeholder={AUTH_TEXTS.FORGOT_PASSWORD.EMAIL_PLACEHOLDER}
                        value={formValues?.email || ""}
                        onChange={onChange}
                        disabled={loadingRequest}
                        className={styles.authInput}
                        autoComplete="email"
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loadingRequest}
                        startIcon={<MarkEmailReadOutlinedIcon />}
                        className={styles.authButton}
                    >
                        {loadingRequest
                            ? AUTH_TEXTS.FORGOT_PASSWORD.SUBMITTING_BUTTON
                            : AUTH_TEXTS.FORGOT_PASSWORD.SUBMIT_BUTTON}
                    </Button>
                </Box>

                <Typography className={styles.authFooterText}>
                    <Link
                        component={RouterLink}
                        to={ROUTES.LOGIN}
                        className={styles.authLink}
                    >
                        {AUTH_TEXTS.FORGOT_PASSWORD.LOGIN_LINK}
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

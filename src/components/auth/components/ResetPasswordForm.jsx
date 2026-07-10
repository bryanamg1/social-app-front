import { Link as RouterLink } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { AUTH_TEXTS, ROUTES } from "../../../constants";
import styles from "../styles/AuthPage.module.css";
import { getAuthTextValue } from "../utils/authFeedback";

export const ResetPasswordForm = ({
    formValues,
    showPassword,
    loadingReset,
    error,
    successMessage,
    hasToken,
    onChange,
    onSubmit,
    onTogglePasswordVisibility,
}) => {
    const errorMessage = getAuthTextValue(
        error,
        AUTH_TEXTS.ERRORS.RESET_PASSWORD_FAILED
    );
    const successText = getAuthTextValue(successMessage);
    const shouldHideForm = Boolean(successText) || !hasToken;
    const tokenErrorMessage = !hasToken
        ? AUTH_TEXTS.ERRORS.RESET_TOKEN_REQUIRED
        : "";

    return (
        <Card className={styles.authCard}>
            <CardContent className={styles.authCardContent}>
                <Box className={styles.authHeader}>
                    <Typography component="h1" className={styles.authTitle}>
                        {AUTH_TEXTS.RESET_PASSWORD.TITLE}
                    </Typography>

                    <Typography className={styles.authSubtitle}>
                        {AUTH_TEXTS.RESET_PASSWORD.SUBTITLE}
                    </Typography>
                </Box>

                {successText && (
                    <Alert severity="success" className={styles.authAlert}>
                        {successText}
                    </Alert>
                )}

                {!successText && tokenErrorMessage && (
                    <Alert severity="error" className={styles.authAlert}>
                        {tokenErrorMessage}
                    </Alert>
                )}

                {!successText && errorMessage && (
                    <Alert severity="error" className={styles.authAlert}>
                        {errorMessage}
                    </Alert>
                )}

                {!shouldHideForm && (
                    <Box component="form" onSubmit={onSubmit} className={styles.authForm}>
                        <TextField
                            fullWidth
                            name="password"
                            label={AUTH_TEXTS.RESET_PASSWORD.PASSWORD_LABEL}
                            placeholder={AUTH_TEXTS.RESET_PASSWORD.PASSWORD_PLACEHOLDER}
                            type={showPassword ? "text" : "password"}
                            value={formValues?.password || ""}
                            onChange={onChange}
                            disabled={loadingReset}
                            className={styles.authInput}
                            autoComplete="new-password"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                type="button"
                                                onClick={onTogglePasswordVisibility}
                                                edge="end"
                                                aria-label={
                                                    AUTH_TEXTS.ACCESSIBILITY.SHOW_PASSWORD
                                                }
                                                className={styles.passwordButton}
                                                disabled={loadingReset}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffOutlinedIcon />
                                                ) : (
                                                    <VisibilityOutlinedIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            name="confirmPassword"
                            label={AUTH_TEXTS.RESET_PASSWORD.CONFIRM_PASSWORD_LABEL}
                            placeholder={
                                AUTH_TEXTS.RESET_PASSWORD.CONFIRM_PASSWORD_PLACEHOLDER
                            }
                            type={showPassword ? "text" : "password"}
                            value={formValues?.confirmPassword || ""}
                            onChange={onChange}
                            disabled={loadingReset}
                            className={styles.authInput}
                            autoComplete="new-password"
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loadingReset}
                            startIcon={<LockResetOutlinedIcon />}
                            className={styles.authButton}
                        >
                            {loadingReset
                                ? AUTH_TEXTS.RESET_PASSWORD.SUBMITTING_BUTTON
                                : AUTH_TEXTS.RESET_PASSWORD.SUBMIT_BUTTON}
                        </Button>
                    </Box>
                )}

                <Button
                    fullWidth
                    component={RouterLink}
                    to={ROUTES.LOGIN}
                    variant="outlined"
                    className={styles.authSecondaryButton}
                >
                    {AUTH_TEXTS.RESET_PASSWORD.LOGIN_LINK}
                </Button>
            </CardContent>
        </Card>
    );
};

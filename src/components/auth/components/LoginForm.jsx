import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { AUTH_TEXTS, ROUTES } from "../../../constants";
import styles from "../styles/AuthPage.module.css";
import { getAuthTextValue } from "../utils/authFeedback";
import { GoogleAuthSection } from "./GoogleAuthSection";

export const LoginForm = ({
    formValues,
    showPassword,
    loadingLogin,
    loadingGoogleAuth,
    error,
    successMessage,
    onChange,
    onSubmit,
    onGoogleCredential,
    onTogglePasswordVisibility,
    }) => {
    const errorMessage = getAuthTextValue(error, AUTH_TEXTS.ERRORS.LOGIN_FAILED);
    const successText = getAuthTextValue(successMessage);
    const isBusy = loadingLogin || loadingGoogleAuth;

    return (
        <Card className={styles.authCard}>
        <CardContent className={styles.authCardContent}>
            <Box className={styles.authHeader}>
            <Typography component="h1" className={styles.authTitle}>
                {AUTH_TEXTS.LOGIN.TITLE}
            </Typography>

            <Typography className={styles.authSubtitle}>
                {AUTH_TEXTS.LOGIN.SUBTITLE}
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
                label={AUTH_TEXTS.LOGIN.EMAIL_LABEL}
                placeholder={AUTH_TEXTS.LOGIN.EMAIL_PLACEHOLDER}
                value={formValues?.email || ""}
                onChange={onChange}
                disabled={isBusy}
                className={styles.authInput}
                autoComplete="email"
            />

            <TextField
                fullWidth
                name="password"
                label={AUTH_TEXTS.LOGIN.PASSWORD_LABEL}
                placeholder={AUTH_TEXTS.LOGIN.PASSWORD_PLACEHOLDER}
                type={showPassword ? "text" : "password"}
                value={formValues?.password || ""}
                onChange={onChange}
                disabled={isBusy}
                className={styles.authInput}
                autoComplete="current-password"
                slotProps={{
                input: {
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        type="button"
                        onClick={onTogglePasswordVisibility}
                        edge="end"
                        aria-label={AUTH_TEXTS.LOGIN.SHOW_PASSWORD_ARIA}
                        className={styles.passwordButton}
                        disabled={isBusy}
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

            <Box className={styles.authMetaRow}>
                <Link
                    component={RouterLink}
                    to={ROUTES.FORGOT_PASSWORD}
                    className={styles.authAuxLink}
                >
                    {AUTH_TEXTS.LOGIN.FORGOT_PASSWORD_LINK}
                </Link>
            </Box>

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isBusy}
                startIcon={<LoginOutlinedIcon />}
                className={styles.authButton}
            >
                {loadingLogin
                ? AUTH_TEXTS.LOGIN.SUBMITTING_BUTTON
                : AUTH_TEXTS.LOGIN.SUBMIT_BUTTON}
            </Button>

            <GoogleAuthSection
                mode="login"
                disabled={loadingLogin}
                loading={loadingGoogleAuth}
                onCredential={onGoogleCredential}
            />
            </Box>

            <Typography className={styles.authFooterText}>
            {AUTH_TEXTS.LOGIN.FOOTER_TEXT}{" "}
            <Link
                component={RouterLink}
                to={ROUTES.REGISTER}
                className={styles.authLink}
            >
                {AUTH_TEXTS.LOGIN.REGISTER_LINK}
            </Link>
            </Typography>
        </CardContent>
        </Card>
    );
};

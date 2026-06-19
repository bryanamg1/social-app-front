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
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { AUTH_TEXTS, ROUTES } from "../../../constants";
import styles from "../styles/AuthPage.module.css";

const getTextValue = (value) => {
    if (!value) return "";

    if (typeof value === "string") return value;

    if (Array.isArray(value)) {
        return value
        .map((item) => getTextValue(item))
        .filter(Boolean)
        .join(" ");
    }

    if (typeof value === "object") {
        if (typeof value.message === "string") return value.message;
        if (typeof value.error === "string") return value.error;
        if (value.details) return getTextValue(value.details);

        try {
        return JSON.stringify(value);
        } catch {
        return AUTH_TEXTS.ERRORS.REGISTER_FAILED;
        }
    }

    return String(value);
};

export const RegisterForm = ({
    formValues,
    showPassword,
    loadingRegister,
    error,

    handleChange,
    handleSubmit,
    togglePasswordVisibility,

    onChange,
    onSubmit,
    onTogglePasswordVisibility,
    }) => {
    const errorMessage = getTextValue(error);

    const changeHandler = handleChange || onChange || (() => {});
    const submitHandler =
        handleSubmit ||
        onSubmit ||
        ((event) => {
        event.preventDefault();
        });

    const togglePasswordHandler =
        togglePasswordVisibility || onTogglePasswordVisibility || (() => {});

    return (
        <Card className={styles.authCard}>
        <CardContent className={styles.authCardContent}>
            <Box className={styles.authHeader}>
            <Typography component="h1" className={styles.authTitle}>
                {AUTH_TEXTS.REGISTER.TITLE}
            </Typography>

            <Typography className={styles.authSubtitle}>
                {AUTH_TEXTS.REGISTER.SUBTITLE}
            </Typography>
            </Box>

            {errorMessage && (
            <Alert severity="error" className={styles.authAlert}>
                {errorMessage}
            </Alert>
            )}

            <Box component="form" onSubmit={submitHandler} className={styles.authForm}>
            <TextField
                fullWidth
                type="text"
                name="user_name"
                placeholder={AUTH_TEXTS.REGISTER.USER_NAME_PLACEHOLDER}
                value={formValues?.user_name || ""}
                onChange={changeHandler}
                disabled={loadingRegister}
                className={styles.authInput}
                autoComplete="username"
            />

            <TextField
                fullWidth
                type="email"
                name="email"
                placeholder={AUTH_TEXTS.REGISTER.EMAIL_PLACEHOLDER}
                value={formValues?.email || ""}
                onChange={changeHandler}
                disabled={loadingRegister}
                className={styles.authInput}
                autoComplete="email"
            />

            <TextField
                fullWidth
                name="password"
                placeholder={AUTH_TEXTS.REGISTER.PASSWORD_PLACEHOLDER}
                type={showPassword ? "text" : "password"}
                value={formValues?.password || ""}
                onChange={changeHandler}
                disabled={loadingRegister}
                className={styles.authInput}
                autoComplete="new-password"
                slotProps={{
                input: {
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        type="button"
                        onClick={togglePasswordHandler}
                        edge="end"
                        aria-label={AUTH_TEXTS.REGISTER.SHOW_PASSWORD_ARIA}
                        className={styles.passwordButton}
                        disabled={loadingRegister}
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
                placeholder={AUTH_TEXTS.REGISTER.CONFIRM_PASSWORD_PLACEHOLDER}
                type={showPassword ? "text" : "password"}
                value={formValues?.confirmPassword || ""}
                onChange={changeHandler}
                disabled={loadingRegister}
                className={styles.authInput}
                autoComplete="new-password"
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loadingRegister}
                startIcon={<PersonAddAltOutlinedIcon />}
                className={styles.authButton}
            >
                {loadingRegister
                ? AUTH_TEXTS.REGISTER.SUBMITTING_BUTTON
                : AUTH_TEXTS.REGISTER.SUBMIT_BUTTON}
            </Button>
            </Box>

            <Typography className={styles.authFooterText}>
            {AUTH_TEXTS.REGISTER.FOOTER_TEXT}{" "}
            <Link
                component={RouterLink}
                to={ROUTES.LOGIN}
                className={styles.authLink}
            >
                {AUTH_TEXTS.REGISTER.LOGIN_LINK}
            </Link>
            </Typography>
        </CardContent>
        </Card>
    );
};
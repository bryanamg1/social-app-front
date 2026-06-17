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

export const LoginForm = ({ formValues, showPassword, loadingLogin, error, onChange, onSubmit, onTogglePasswordVisibility, }) => {
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

            {error && (
            <Alert severity="error" className={styles.authAlert}>
                {error}
            </Alert>
            )}

            <Box component="form" onSubmit={onSubmit} className={styles.authForm}>
            <TextField
                fullWidth
                type="email"
                name="email"
                label={AUTH_TEXTS.LOGIN.EMAIL_LABEL}
                placeholder={AUTH_TEXTS.LOGIN.EMAIL_PLACEHOLDER}
                value={formValues.email}
                onChange={onChange}
                disabled={loadingLogin}
                className={styles.authInput}
            />

            <TextField
                fullWidth
                name="password"
                label={AUTH_TEXTS.LOGIN.PASSWORD_LABEL}
                placeholder={AUTH_TEXTS.LOGIN.PASSWORD_PLACEHOLDER}
                type={showPassword ? "text" : "password"}
                value={formValues.password}
                onChange={onChange}
                disabled={loadingLogin}
                className={styles.authInput}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        onClick={onTogglePasswordVisibility}
                        edge="end"
                        aria-label={AUTH_TEXTS.LOGIN.SHOW_PASSWORD_ARIA}
                        className={styles.passwordButton}
                    >
                        {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                        ) : (
                        <VisibilityOutlinedIcon />
                        )}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loadingLogin}
                startIcon={<LoginOutlinedIcon />}
                className={styles.authButton}
            >
                {loadingLogin
                ? AUTH_TEXTS.LOGIN.SUBMITTING_BUTTON
                : AUTH_TEXTS.LOGIN.SUBMIT_BUTTON}
            </Button>
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
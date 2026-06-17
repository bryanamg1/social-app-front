import { Box, Typography } from "@mui/material";

import { AUTH_TEXTS } from "../../../constants";
import { LoginForm } from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

import styles from "../styles/AuthPage.module.css";

const LoginPage = () => {
    const {
        formValues,
        showPassword,
        loadingLogin,
        error,
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
    } = useLogin();

    return (
        <main className={styles.authPage}>
        <section className={styles.authHero}>
            <Box className={styles.brandBlock}>
            <Typography className={styles.brandEyebrow}>
                {AUTH_TEXTS.LOGIN.HERO_EYEBROW}
            </Typography>

            <Typography component="h2" className={styles.heroTitle}>
                {AUTH_TEXTS.LOGIN.HERO_TITLE}
            </Typography>

            <Typography className={styles.heroDescription}>
                {AUTH_TEXTS.LOGIN.HERO_DESCRIPTION}
            </Typography>
            </Box>
        </section>

        <section className={styles.authPanel}>
            <LoginForm
            formValues={formValues}
            showPassword={showPassword}
            loadingLogin={loadingLogin}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onTogglePasswordVisibility={togglePasswordVisibility}
            />
        </section>
        </main>
    );
};

export default LoginPage;
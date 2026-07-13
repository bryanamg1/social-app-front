import { Box, Typography } from "@mui/material";

import { AUTH_TEXTS } from "../../../constants";
import { RegisterForm } from "../components/RegisterForm";
import { useRegister } from "../hooks/useRegister";

import styles from "../styles/AuthPage.module.css";

const RegisterPage = () => {
    const {
        formValues,
        showPassword,
        loadingRegister,
        loadingGoogleAuth,
        error,
        handleChange,
        handleSubmit,
        handleGoogleCredential,
        togglePasswordVisibility,
    } = useRegister();

    return (
        <main className={styles.authPage}>
        <section className={styles.authHero}>
            <Box className={styles.brandBlock}>
            <Typography className={styles.brandEyebrow}>
                {AUTH_TEXTS.REGISTER.HERO_EYEBROW}
            </Typography>

            <Typography component="h2" className={styles.heroTitle}>
                {AUTH_TEXTS.REGISTER.HERO_TITLE}
            </Typography>

            <Typography className={styles.heroDescription}>
                {AUTH_TEXTS.REGISTER.HERO_DESCRIPTION}
            </Typography>
            </Box>
        </section>

        <section className={styles.authPanel}>
            <RegisterForm
            formValues={formValues}
            showPassword={showPassword}
            loadingRegister={loadingRegister}
            loadingGoogleAuth={loadingGoogleAuth}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onGoogleCredential={handleGoogleCredential}
            onTogglePasswordVisibility={togglePasswordVisibility}
            />
        </section>
        </main>
    );
};

export default RegisterPage;

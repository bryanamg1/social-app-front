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
        error,
        handleChange,
        handleSubmit,
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
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onTogglePasswordVisibility={togglePasswordVisibility}
            />
        </section>
        </main>
    );
};

export default RegisterPage;
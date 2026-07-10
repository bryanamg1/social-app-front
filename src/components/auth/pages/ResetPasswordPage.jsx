import { Box, Typography } from "@mui/material";

import { AUTH_TEXTS } from "../../../constants";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { useResetPassword } from "../hooks/useResetPassword";
import styles from "../styles/AuthPage.module.css";

const ResetPasswordPage = () => {
    const {
        formValues,
        showPassword,
        loadingReset,
        error,
        successMessage,
        hasToken,
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
    } = useResetPassword();

    return (
        <main className={styles.authPage}>
            <section className={styles.authHero}>
                <Box className={styles.brandBlock}>
                    <Typography className={styles.brandEyebrow}>
                        {AUTH_TEXTS.RESET_PASSWORD.HERO_EYEBROW}
                    </Typography>

                    <Typography component="h2" className={styles.heroTitle}>
                        {AUTH_TEXTS.RESET_PASSWORD.HERO_TITLE}
                    </Typography>

                    <Typography className={styles.heroDescription}>
                        {AUTH_TEXTS.RESET_PASSWORD.HERO_DESCRIPTION}
                    </Typography>
                </Box>
            </section>

            <section className={styles.authPanel}>
                <ResetPasswordForm
                    formValues={formValues}
                    showPassword={showPassword}
                    loadingReset={loadingReset}
                    error={error}
                    successMessage={successMessage}
                    hasToken={hasToken}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onTogglePasswordVisibility={togglePasswordVisibility}
                />
            </section>
        </main>
    );
};

export default ResetPasswordPage;

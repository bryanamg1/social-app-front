import { Box, Typography } from "@mui/material";

import { AUTH_TEXTS } from "../../../constants";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { useForgotPassword } from "../hooks/useForgotPassword";
import styles from "../styles/AuthPage.module.css";

const ForgotPasswordPage = () => {
    const {
        formValues,
        loadingRequest,
        error,
        successMessage,
        handleChange,
        handleSubmit,
    } = useForgotPassword();

    return (
        <main className={styles.authPage}>
            <section className={styles.authHero}>
                <Box className={styles.brandBlock}>
                    <Typography className={styles.brandEyebrow}>
                        {AUTH_TEXTS.FORGOT_PASSWORD.HERO_EYEBROW}
                    </Typography>

                    <Typography component="h2" className={styles.heroTitle}>
                        {AUTH_TEXTS.FORGOT_PASSWORD.HERO_TITLE}
                    </Typography>

                    <Typography className={styles.heroDescription}>
                        {AUTH_TEXTS.FORGOT_PASSWORD.HERO_DESCRIPTION}
                    </Typography>
                </Box>
            </section>

            <section className={styles.authPanel}>
                <ForgotPasswordForm
                    formValues={formValues}
                    loadingRequest={loadingRequest}
                    error={error}
                    successMessage={successMessage}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </section>
        </main>
    );
};

export default ForgotPasswordPage;

import { Link } from "react-router-dom";

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
        <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{AUTH_TEXTS.REGISTER.TITLE}</h2>

            <p className={styles.formSubtitle}>{AUTH_TEXTS.REGISTER.SUBTITLE}</p>
        </div>

        {errorMessage && (
            <div className={styles.errorMessage}>
            <span aria-hidden="true">ⓘ</span>
            <span>{errorMessage}</span>
            </div>
        )}

        <label className={styles.field}>
            <span className={styles.label}>
            {AUTH_TEXTS.REGISTER.USER_NAME_LABEL}
            </span>

            <input
            className={styles.input}
            type="text"
            name="user_name"
            value={formValues?.user_name || ""}
            onChange={changeHandler}
            placeholder={AUTH_TEXTS.REGISTER.USER_NAME_PLACEHOLDER}
            autoComplete="username"
            disabled={loadingRegister}
            />
        </label>

        <label className={styles.field}>
            <span className={styles.label}>{AUTH_TEXTS.REGISTER.EMAIL_LABEL}</span>

            <input
            className={styles.input}
            type="email"
            name="email"
            value={formValues?.email || ""}
            onChange={changeHandler}
            placeholder={AUTH_TEXTS.REGISTER.EMAIL_PLACEHOLDER}
            autoComplete="email"
            disabled={loadingRegister}
            />
        </label>

        <label className={styles.field}>
            <span className={styles.label}>
            {AUTH_TEXTS.REGISTER.PASSWORD_LABEL}
            </span>

            <div className={styles.passwordWrapper}>
            <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValues?.password || ""}
                onChange={changeHandler}
                placeholder={AUTH_TEXTS.REGISTER.PASSWORD_PLACEHOLDER}
                autoComplete="new-password"
                disabled={loadingRegister}
            />

            <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordHandler}
                disabled={loadingRegister}
                aria-label={AUTH_TEXTS.REGISTER.SHOW_PASSWORD_ARIA}
            >
                {showPassword ? "🙈" : "👁️"}
            </button>
            </div>
        </label>

        <label className={styles.field}>
            <span className={styles.label}>
            {AUTH_TEXTS.REGISTER.CONFIRM_PASSWORD_LABEL}
            </span>

            <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formValues?.confirmPassword || ""}
            onChange={changeHandler}
            placeholder={AUTH_TEXTS.REGISTER.CONFIRM_PASSWORD_PLACEHOLDER}
            autoComplete="new-password"
            disabled={loadingRegister}
            />
        </label>

        <button
            type="submit"
            className={styles.submitButton}
            disabled={loadingRegister}
        >
            {loadingRegister
            ? AUTH_TEXTS.REGISTER.SUBMITTING_BUTTON
            : AUTH_TEXTS.REGISTER.SUBMIT_BUTTON}
        </button>

        <p className={styles.footerText}>
            {AUTH_TEXTS.REGISTER.FOOTER_TEXT}{" "}
            <Link to={ROUTES.LOGIN} className={styles.link}>
            {AUTH_TEXTS.REGISTER.LOGIN_LINK}
            </Link>
        </p>
        </form>
    );
};
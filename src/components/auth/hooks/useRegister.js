import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AUTH_TEXTS, ROUTES } from "../../../constants";
import { registerUser } from "../services/authService";

const getReadableErrorValue = (value) => {
    if (!value) return null;

    if (typeof value === "string") return value;

    if (Array.isArray(value)) {
        return value
        .map((item) => getReadableErrorValue(item))
        .filter(Boolean)
        .join(" ");
    }

    if (typeof value === "object") {
        if (typeof value.message === "string") return value.message;
        if (typeof value.error === "string") return value.error;
        if (value.details) return getReadableErrorValue(value.details);

        try {
        return JSON.stringify(value);
        } catch {
        return AUTH_TEXTS.ERRORS.REGISTER_FAILED;
        }
    }

    return String(value);
};

const getRegisterErrorMessage = (error) => {
    const data = error?.response?.data;

    return (
        getReadableErrorValue(data?.error?.message) ||
        getReadableErrorValue(data?.message) ||
        getReadableErrorValue(data?.error) ||
        getReadableErrorValue(data?.details) ||
        getReadableErrorValue(data) ||
        getReadableErrorValue(error?.message) ||
        AUTH_TEXTS.ERRORS.REGISTER_FAILED
    );
};

export const useRegister = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        user_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormValues((currentValues) => ({
        ...currentValues,
        [name]: value,
        }));

        if (error) {
        setError(null);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((currentValue) => !currentValue);
    };

    const validateForm = () => {
        if (!formValues.user_name.trim()) {
        return AUTH_TEXTS.ERRORS.USER_NAME_REQUIRED;
        }

        if (!formValues.email.trim()) {
        return AUTH_TEXTS.ERRORS.EMAIL_REQUIRED;
        }

        if (!formValues.password.trim()) {
        return AUTH_TEXTS.ERRORS.PASSWORD_REQUIRED;
        }

        if (!formValues.confirmPassword.trim()) {
        return AUTH_TEXTS.ERRORS.CONFIRM_PASSWORD_REQUIRED;
        }

        if (formValues.password.length < 6) {
        return AUTH_TEXTS.ERRORS.PASSWORD_MIN_LENGTH;
        }

        if (formValues.password !== formValues.confirmPassword) {
        return AUTH_TEXTS.ERRORS.PASSWORDS_DO_NOT_MATCH;
        }

        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateForm();

        if (validationError) {
        setError(validationError);
        return;
        }

        try {
        setLoadingRegister(true);
        setError(null);

        await registerUser({
            user_name: formValues.user_name.trim(),
            email: formValues.email.trim(),
            password: formValues.password,
        });

        navigate(ROUTES.LOGIN, {
            replace: true,
            state: {
            successMessage: AUTH_TEXTS.REGISTER.SUCCESS_MESSAGE,
            registeredEmail: formValues.email.trim(),
            },
        });
        } catch (error) {
        setError(getRegisterErrorMessage(error));
        } finally {
        setLoadingRegister(false);
        }
    };

    return {
        formValues,
        showPassword,
        loadingRegister,
        error,
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
    };
};
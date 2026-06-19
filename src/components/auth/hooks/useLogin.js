import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AUTH_TEXTS, ROUTES } from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { loginUser } from "../services/authService";

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
        return AUTH_TEXTS.ERRORS.LOGIN_FAILED;
        }
    }

    return String(value);
};

const getLoginErrorMessage = (error) => {
    const data = error?.response?.data;

    return (
        getReadableErrorValue(data?.error?.message) ||
        getReadableErrorValue(data?.message) ||
        getReadableErrorValue(data?.error) ||
        getReadableErrorValue(data?.details) ||
        getReadableErrorValue(data) ||
        getReadableErrorValue(error?.message) ||
        AUTH_TEXTS.ERRORS.LOGIN_FAILED
    );
};

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [formValues, setFormValues] = useState({
        email: location.state?.registeredEmail ?? "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(
        location.state?.successMessage ?? null
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormValues((currentValues) => ({
        ...currentValues,
        [name]: value,
        }));

        if (error) {
        setError(null);
        }

        if (successMessage) {
        setSuccessMessage(null);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((currentValue) => !currentValue);
    };

    const validateForm = () => {
        if (!formValues.email.trim()) {
        return AUTH_TEXTS.ERRORS.EMAIL_REQUIRED;
        }

        if (!formValues.password.trim()) {
        return AUTH_TEXTS.ERRORS.PASSWORD_REQUIRED;
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
        setLoadingLogin(true);
        setError(null);
        setSuccessMessage(null);

        const authData = await loginUser({
            email: formValues.email.trim(),
            password: formValues.password,
        });

        login(authData);

        const redirectTo = location.state?.from?.pathname || ROUTES.HOME;

        navigate(redirectTo, {
            replace: true,
        });
        } catch (error) {
        setError(getLoginErrorMessage(error));
        } finally {
        setLoadingLogin(false);
        }
    };

    return {
        formValues,
        showPassword,
        loadingLogin,
        error,
        successMessage,
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
    };
};
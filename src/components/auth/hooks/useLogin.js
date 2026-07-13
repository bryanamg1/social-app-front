import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AUTH_TEXTS, ROUTES } from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { googleLogin, loginUser } from "../services/authService";
import { getAuthApiErrorMessage } from "../utils/authFeedback";

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
    const [loadingGoogleAuth, setLoadingGoogleAuth] = useState(false);
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
        setError(getAuthApiErrorMessage(error, AUTH_TEXTS.ERRORS.LOGIN_FAILED));
        } finally {
        setLoadingLogin(false);
        }
    };

    const handleGoogleCredential = async (credential) => {
        try {
        setLoadingGoogleAuth(true);
        setError(null);
        setSuccessMessage(null);

        const authData = await googleLogin(credential);

        login(authData);

        const redirectTo = location.state?.from?.pathname || ROUTES.HOME;

        navigate(redirectTo, {
            replace: true,
        });
        } catch (requestError) {
        setError(
            getAuthApiErrorMessage(
                requestError,
                AUTH_TEXTS.ERRORS.GOOGLE_LOGIN_FAILED
            )
        );
        } finally {
        setLoadingGoogleAuth(false);
        }
    };

    return {
        formValues,
        showPassword,
        loadingLogin,
        loadingGoogleAuth,
        error,
        successMessage,
        handleChange,
        handleSubmit,
        handleGoogleCredential,
        togglePasswordVisibility,
    };
};

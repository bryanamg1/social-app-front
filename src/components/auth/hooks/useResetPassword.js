import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AUTH_TEXTS } from "../../../constants";
import { resetPassword } from "../services/authService";
import { getAuthApiErrorMessage } from "../utils/authFeedback";

export const useResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = useMemo(
        () => searchParams.get("token")?.trim() || "",
        [searchParams]
    );

    const [formValues, setFormValues] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loadingReset, setLoadingReset] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
        if (!token) {
            return AUTH_TEXTS.ERRORS.RESET_TOKEN_REQUIRED;
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
            setLoadingReset(true);
            setError(null);
            setSuccessMessage(null);

            const response = await resetPassword({
                token,
                password: formValues.password,
                confirmPassword: formValues.confirmPassword,
            });

            setSuccessMessage(
                response?.message || AUTH_TEXTS.RESET_PASSWORD.SUCCESS_MESSAGE
            );
            setFormValues({
                password: "",
                confirmPassword: "",
            });
        } catch (requestError) {
            setError(
                getAuthApiErrorMessage(
                    requestError,
                    AUTH_TEXTS.ERRORS.RESET_PASSWORD_FAILED
                )
            );
        } finally {
            setLoadingReset(false);
        }
    };

    return {
        formValues,
        showPassword,
        loadingReset,
        error,
        successMessage,
        hasToken: Boolean(token),
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
    };
};

import { useState } from "react";

import { AUTH_TEXTS } from "../../../constants";
import { requestPasswordReset } from "../services/authService";
import { getAuthApiErrorMessage } from "../utils/authFeedback";

const getForgotPasswordErrorMessage = (requestError) => {
    const errorCode = requestError?.code;
    const status = requestError?.response?.status;
    const rawMessage = `${requestError?.message || ""}`.toLowerCase();

    if (errorCode === "ECONNABORTED" || rawMessage.includes("timeout")) {
        return AUTH_TEXTS.ERRORS.FORGOT_PASSWORD_TIMEOUT;
    }

    if (status === 500 || status === 503) {
        return AUTH_TEXTS.ERRORS.FORGOT_PASSWORD_UNAVAILABLE;
    }

    return getAuthApiErrorMessage(
        requestError,
        AUTH_TEXTS.ERRORS.FORGOT_PASSWORD_FAILED
    );
};

export const useForgotPassword = () => {
    const [formValues, setFormValues] = useState({
        email: "",
    });
    const [loadingRequest, setLoadingRequest] = useState(false);
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

    const validateForm = () => {
        if (!formValues.email.trim()) {
            return AUTH_TEXTS.ERRORS.EMAIL_REQUIRED;
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
            setLoadingRequest(true);
            setError(null);
            setSuccessMessage(null);

            const response = await requestPasswordReset({
                email: formValues.email.trim(),
            });

            setSuccessMessage(
                response?.message || AUTH_TEXTS.FORGOT_PASSWORD.SUCCESS_MESSAGE
            );
        } catch (requestError) {
            setError(getForgotPasswordErrorMessage(requestError));
        } finally {
            setLoadingRequest(false);
        }
    };

    return {
        formValues,
        loadingRequest,
        error,
        successMessage,
        handleChange,
        handleSubmit,
    };
};

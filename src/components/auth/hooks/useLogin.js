import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH_TEXTS, ROUTES } from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { loginUser } from "../services/authService";

const getLoginErrorMessage = (error) => {
    return (
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        error?.message ??
        AUTH_TEXTS.ERRORS.LOGIN_FAILED
    );
};

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormValues((currentValues) => ({
        ...currentValues,
        [name]: value,
        }));
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
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
    };
};
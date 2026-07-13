import { useEffect, useMemo, useRef, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import {
    AUTH_TEXTS,
    GOOGLE_AUTH_CONFIG,
} from "../../../constants";
import {
    getGoogleClientId,
    loadGoogleIdentityScript,
} from "../services/googleIdentityService";
import styles from "../styles/AuthPage.module.css";

const getGoogleButtonText = (mode) => {
    if (mode === "register") {
        return GOOGLE_AUTH_CONFIG.BUTTON_TEXT.REGISTER;
    }

    return GOOGLE_AUTH_CONFIG.BUTTON_TEXT.LOGIN;
};

const getPlaceholderText = (mode) => {
    if (mode === "register") {
        return AUTH_TEXTS.REGISTER.GOOGLE_BUTTON;
    }

    return AUTH_TEXTS.LOGIN.GOOGLE_BUTTON;
};

export const GoogleAuthSection = ({
    mode = "login",
    disabled = false,
    loading = false,
    onCredential,
}) => {
    const buttonHostRef = useRef(null);
    const buttonWrapperRef = useRef(null);
    const credentialHandlerRef = useRef(onCredential);
    const [isReady, setIsReady] = useState(false);
    const [scriptError, setScriptError] = useState(null);
    const googleClientId = useMemo(() => getGoogleClientId(), []);
    const buttonText = getGoogleButtonText(mode);
    const placeholderText = getPlaceholderText(mode);
    const showDevConfigWarning = !googleClientId && import.meta.env.DEV;

    credentialHandlerRef.current = onCredential;

    useEffect(() => {
        if (!googleClientId) {
            return undefined;
        }

        let isActive = true;

        const renderGoogleButton = async () => {
            try {
                await loadGoogleIdentityScript();

                if (
                    !isActive ||
                    !buttonHostRef.current ||
                    !buttonWrapperRef.current ||
                    !window.google?.accounts?.id
                ) {
                    return;
                }

                window.google.accounts.id.initialize({
                    client_id: googleClientId,
                    callback: ({ credential }) => {
                        if (credential) {
                            credentialHandlerRef.current?.(credential);
                        }
                    },
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    use_fedcm_for_prompt: true,
                });

                buttonHostRef.current.innerHTML = "";

                window.google.accounts.id.renderButton(
                    buttonHostRef.current,
                    {
                        theme: GOOGLE_AUTH_CONFIG.BUTTON_THEME,
                        size: GOOGLE_AUTH_CONFIG.BUTTON_SIZE,
                        shape: GOOGLE_AUTH_CONFIG.BUTTON_SHAPE,
                        text: buttonText,
                        logo_alignment: GOOGLE_AUTH_CONFIG.BUTTON_LOGO_ALIGNMENT,
                        width: Math.min(
                            buttonWrapperRef.current.offsetWidth || 360,
                            400
                        ),
                    }
                );

                setScriptError(null);
                setIsReady(true);
            } catch {
                if (isActive) {
                    setScriptError(AUTH_TEXTS.GOOGLE.UNAVAILABLE);
                }
            }
        };

        renderGoogleButton();

        return () => {
            isActive = false;
        };
    }, [buttonText, googleClientId]);

    if (!googleClientId && !showDevConfigWarning) {
        return null;
    }

    return (
        <Box className={styles.googleAuthSection}>
            <Divider className={styles.authDivider}>
                {AUTH_TEXTS.GOOGLE.SEPARATOR}
            </Divider>

            <Box
                ref={buttonWrapperRef}
                className={`${styles.googleButtonWrapper} ${
                    disabled || loading ? styles.googleButtonWrapperDisabled : ""
                }`}
            >
                {!isReady && (
                    <Button
                        fullWidth
                        type="button"
                        variant="outlined"
                        disabled
                        startIcon={<GoogleIcon />}
                        className={styles.authSecondaryButton}
                    >
                        {loading
                            ? AUTH_TEXTS.GOOGLE.LOADING_BUTTON
                            : placeholderText}
                    </Button>
                )}

                <Box
                    ref={buttonHostRef}
                    className={`${styles.googleButtonHost} ${
                        isReady ? styles.googleButtonHostReady : ""
                    }`}
                />
            </Box>

            {showDevConfigWarning && (
                <Alert severity="warning" className={styles.authAlert}>
                    {AUTH_TEXTS.GOOGLE.CONFIG_MISSING}
                </Alert>
            )}

            {scriptError && (
                <Alert severity="warning" className={styles.authAlert}>
                    {scriptError}
                </Alert>
            )}
        </Box>
    );
};

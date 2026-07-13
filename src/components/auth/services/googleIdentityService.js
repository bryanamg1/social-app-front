import { GOOGLE_AUTH_CONFIG } from "../../../constants";

const GOOGLE_IDENTITY_SCRIPT_ID = "social-app-google-identity-script";

let googleIdentityScriptPromise = null;

export const getGoogleClientId = () => {
    return import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || "";
};

export const loadGoogleIdentityScript = () => {
    if (window.google?.accounts?.id) {
        return Promise.resolve(window.google);
    }

    if (googleIdentityScriptPromise) {
        return googleIdentityScriptPromise;
    }

    googleIdentityScriptPromise = new Promise((resolve, reject) => {
        const existingScript = document.getElementById(
            GOOGLE_IDENTITY_SCRIPT_ID
        );

        if (existingScript) {
            existingScript.addEventListener("load", () => resolve(window.google));
            existingScript.addEventListener("error", () =>
                reject(new Error("GOOGLE_IDENTITY_SCRIPT_LOAD_FAILED"))
            );
            return;
        }

        const script = document.createElement("script");

        script.id = GOOGLE_IDENTITY_SCRIPT_ID;
        script.src = GOOGLE_AUTH_CONFIG.SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(window.google);
        script.onerror = () =>
            reject(new Error("GOOGLE_IDENTITY_SCRIPT_LOAD_FAILED"));

        document.head.appendChild(script);
    });

    return googleIdentityScriptPromise;
};

import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export function useDeferredFeature({
    enabled,
    delayMs,
}) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!enabled || isReady) {
            return undefined;
        }

        if (!isBrowser) {
            return undefined;
        }

        let isActive = true;
        let timeoutId = null;
        let idleId = null;

        const activate = () => {
            if (!isActive) return;
            setIsReady(true);
        };

        const scheduleActivation = () => {
            if (typeof window.requestIdleCallback === "function") {
                idleId = window.requestIdleCallback(activate, {
                    timeout: delayMs,
                });
                return;
            }

            timeoutId = window.setTimeout(activate, delayMs);
        };

        scheduleActivation();

        return () => {
            isActive = false;

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }

            if (
                idleId !== null &&
                typeof window.cancelIdleCallback === "function"
            ) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, [delayMs, enabled, isReady]);

    return enabled && isReady;
}

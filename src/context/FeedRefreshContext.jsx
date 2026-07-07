import { useCallback, useMemo, useRef, useState } from "react";

import { FeedRefreshContext } from "./FeedRefreshContextValue";

export function FeedRefreshProvider({ children }) {
    const refreshHandlerRef = useRef(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const registerRefreshHandler = useCallback((handler) => {
        refreshHandlerRef.current = typeof handler === "function" ? handler : null;

        return () => {
            if (refreshHandlerRef.current === handler) {
                refreshHandlerRef.current = null;
            }
        };
    }, []);

    const requestRefresh = useCallback(async () => {
        if (isRefreshing || !refreshHandlerRef.current) {
            return false;
        }

        try {
            setIsRefreshing(true);
            await refreshHandlerRef.current();
            return true;
        } finally {
            setIsRefreshing(false);
        }
    }, [isRefreshing]);

    const value = useMemo(
        () => ({
            isRefreshing,
            registerRefreshHandler,
            requestRefresh,
        }),
        [isRefreshing, registerRefreshHandler, requestRefresh]
    );

    return (
        <FeedRefreshContext.Provider value={value}>
            {children}
        </FeedRefreshContext.Provider>
    );
}

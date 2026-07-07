import { useContext } from "react";

import { UI_TEXTS } from "../constants";
import { FeedRefreshContext } from "../context/FeedRefreshContextValue";

export function useFeedRefresh() {
    const context = useContext(FeedRefreshContext);

    if (!context) {
        throw new Error(UI_TEXTS.ERRORS.FEED_REFRESH_PROVIDER);
    }

    return context;
}

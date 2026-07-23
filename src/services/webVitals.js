import {
    OBSERVABILITY_CONFIG,
    OBSERVABILITY_TEXTS,
} from "../constants";
import { recordObservabilityEvent } from "./observability";

const isBrowser = typeof window !== "undefined";
const getNowIso = () => new Date().toISOString();

let observersInitialized = false;

const getMetricStore = () => {
    if (!isBrowser) return [];

    const currentStore = window[OBSERVABILITY_CONFIG.WEB_VITALS_STORAGE_KEY];

    if (Array.isArray(currentStore)) {
        return currentStore;
    }

    window[OBSERVABILITY_CONFIG.WEB_VITALS_STORAGE_KEY] = [];
    return window[OBSERVABILITY_CONFIG.WEB_VITALS_STORAGE_KEY];
};

const getCurrentRoute = () => {
    if (!isBrowser) return "";
    return `${window.location.pathname}${window.location.search}`;
};

const normalizeMetricValue = (name, value) => {
    if (name === "CLS") {
        return Number(value.toFixed(4));
    }

    return Math.round(value);
};

const getMetricRating = (name, value) => {
    const thresholds = OBSERVABILITY_CONFIG.WEB_VITAL_THRESHOLDS[name];

    if (!thresholds) return "informational";
    if (value <= thresholds.GOOD) return "good";
    if (value <= thresholds.NEEDS_IMPROVEMENT) return "needs-improvement";
    return "poor";
};

const getMetricLevel = (rating) => {
    if (rating === "poor") return "error";
    if (rating === "needs-improvement") return "warn";
    return "info";
};

const storeMetric = (metric) => {
    if (!isBrowser) return;

    const nextMetrics = [...getMetricStore(), metric].slice(
        -OBSERVABILITY_CONFIG.MAX_WEB_VITALS
    );

    window[OBSERVABILITY_CONFIG.WEB_VITALS_STORAGE_KEY] = nextMetrics;
};

const reportMetric = (name, rawValue, extraContext = {}) => {
    if (!isBrowser || !Number.isFinite(rawValue)) return null;

    const value = normalizeMetricValue(name, rawValue);
    const rating = getMetricRating(name, rawValue);
    const metric = {
        timestamp: getNowIso(),
        name,
        value,
        rating,
        route: getCurrentRoute(),
        context: extraContext,
    };

    storeMetric(metric);

    recordObservabilityEvent({
        scope: "web-vitals",
        type: `web-vital:${name.toLowerCase()}`,
        level: getMetricLevel(rating),
        message: OBSERVABILITY_TEXTS.WEB_VITAL_CAPTURED,
        context: metric,
    });

    return metric;
};

const safeObserve = (options, onObserve) => {
    if (!isBrowser || typeof PerformanceObserver === "undefined") {
        return null;
    }

    try {
        const observer = new PerformanceObserver(onObserve);
        observer.observe(options);
        return observer;
    } catch {
        return null;
    }
};

const registerFinalizeHandlers = (callback) => {
    if (!isBrowser) return () => {};

    let called = false;
    const finalize = () => {
        if (called) return;
        called = true;
        callback();
    };

    window.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            finalize();
        }
    });

    window.addEventListener("pagehide", finalize, { once: true });

    return finalize;
};

const observeTtfb = () => {
    if (!isBrowser || typeof performance === "undefined") return;

    const navigationEntry = performance.getEntriesByType("navigation")[0];

    if (!navigationEntry) return;

    window.setTimeout(() => {
        reportMetric("TTFB", navigationEntry.responseStart, {
            entryType: "navigation",
        });
    }, 0);
};

const observeFcp = () => {
    const observer = safeObserve(
        { type: "paint", buffered: true },
        (entryList) => {
            const firstContentfulPaint = entryList
                .getEntries()
                .find((entry) => entry.name === "first-contentful-paint");

            if (!firstContentfulPaint) return;

            reportMetric("FCP", firstContentfulPaint.startTime, {
                entryType: firstContentfulPaint.entryType,
            });

            observer?.disconnect();
        }
    );
};

const observeLcp = () => {
    let lastEntry = null;

    const observer = safeObserve(
        { type: "largest-contentful-paint", buffered: true },
        (entryList) => {
            const entries = entryList.getEntries();
            lastEntry = entries[entries.length - 1] ?? lastEntry;
        }
    );

    registerFinalizeHandlers(() => {
        if (!lastEntry) return;

        reportMetric("LCP", lastEntry.startTime, {
            entryType: lastEntry.entryType,
        });

        observer?.disconnect();
    });
};

const observeCls = () => {
    let cumulativeLayoutShift = 0;

    const observer = safeObserve(
        { type: "layout-shift", buffered: true },
        (entryList) => {
            entryList.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cumulativeLayoutShift += entry.value;
                }
            });
        }
    );

    registerFinalizeHandlers(() => {
        reportMetric("CLS", cumulativeLayoutShift, {
            entryType: "layout-shift",
        });

        observer?.disconnect();
    });
};

const observeInp = () => {
    let maxInteraction = 0;

    const observer = safeObserve(
        { type: "event", buffered: true, durationThreshold: 40 },
        (entryList) => {
            entryList.getEntries().forEach((entry) => {
                if (!entry.interactionId) return;
                maxInteraction = Math.max(maxInteraction, entry.duration);
            });
        }
    );

    registerFinalizeHandlers(() => {
        if (!maxInteraction) return;

        reportMetric("INP", maxInteraction, {
            entryType: "event",
        });

        observer?.disconnect();
    });
};

export const initializeWebVitalsObservers = () => {
    if (!isBrowser || observersInitialized) return;

    observersInitialized = true;

    observeTtfb();
    observeFcp();
    observeLcp();
    observeCls();
    observeInp();
};

import { useEffect, useMemo, useRef, useState } from "react";

import { RIGHT_SIDEBAR_SEARCH, ROUTES } from "../../../constants";
import { searchUsers } from "../services/userSearchService";
import { getUserId } from "../utils/userProfileAdapter";

const getResultPath = (userId, currentUserId) => {
    if (String(userId) === String(currentUserId)) {
        return ROUTES.PROFILE;
    }

    return ROUTES.USER_PROFILE(userId);
};

export const useUserSearch = ({ currentUserId }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const requestIdRef = useRef(0);
    const normalizedQuery = query.trim();

    useEffect(() => {
        if (!normalizedQuery) return undefined;

        const requestId = requestIdRef.current + 1;

        requestIdRef.current = requestId;

        const timeoutId = window.setTimeout(async () => {
            try {
                const response = await searchUsers(normalizedQuery);

                if (requestIdRef.current !== requestId) return;

                setResults(response.users);
                setError(null);
                setHasSearched(true);
            } catch {
                if (requestIdRef.current !== requestId) return;

                setResults([]);
                setError(RIGHT_SIDEBAR_SEARCH.ERROR_TEXT);
                setHasSearched(true);
            } finally {
                if (requestIdRef.current === requestId) {
                    setLoading(false);
                }
            }
        }, RIGHT_SIDEBAR_SEARCH.DEBOUNCE_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [normalizedQuery]);

    const handleQueryChange = (event) => {
        const nextQuery = event.target.value;

        setQuery(nextQuery);

        if (!nextQuery.trim()) {
            requestIdRef.current += 1;
            setResults([]);
            setLoading(false);
            setError(null);
            setHasSearched(false);
            return;
        }

        setLoading(true);
        setError(null);
        setHasSearched(false);
        setResults([]);
    };

    const handleResultSelect = () => {
        requestIdRef.current += 1;
        setQuery("");
        setResults([]);
        setLoading(false);
        setError(null);
        setHasSearched(false);
    };

    const mappedResults = useMemo(() => {
        return results.map((user) => {
            const userId = getUserId(user);

            return {
                ...user,
                profilePath: getResultPath(userId, currentUserId),
            };
        });
    }, [currentUserId, results]);

    return {
        query,
        results: mappedResults,
        loading,
        error,
        hasSearched,
        hasQuery: Boolean(normalizedQuery),
        onQueryChange: handleQueryChange,
        onResultSelect: handleResultSelect,
    };
};

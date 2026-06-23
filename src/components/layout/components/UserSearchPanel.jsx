import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { RIGHT_SIDEBAR_TEXTS } from "../../../constants";
import {
    getUserAvatar,
    getUserEmail,
    getUserName,
} from "../../users/utils/userProfileAdapter";

import styles from "../styles/UserSearchPanel.module.css";

const getStatusMessage = (search) => {
    if (search.error) return search.error;
    if (search.loading) return RIGHT_SIDEBAR_TEXTS.SEARCH_LOADING;
    if (!search.hasQuery) return RIGHT_SIDEBAR_TEXTS.SEARCH_IDLE;
    if (search.hasSearched && search.results.length === 0) {
        return RIGHT_SIDEBAR_TEXTS.SEARCH_EMPTY;
    }

    return null;
};

export function UserSearchPanel({ search }) {
    const statusMessage = getStatusMessage(search);

    return (
        <>
        <div className={styles.searchBox}>
            <SearchOutlinedIcon className={styles.searchIcon} />

            <input
            type="search"
            value={search.query}
            placeholder={RIGHT_SIDEBAR_TEXTS.SEARCH_PLACEHOLDER}
            className={styles.searchInput}
            onChange={search.onQueryChange}
            autoComplete="off"
            />
        </div>

        <section className={styles.resultsCard}>
            <div className={styles.resultsHeader}>
            <h3 className={styles.resultsTitle}>
                {RIGHT_SIDEBAR_TEXTS.SEARCH_RESULTS_TITLE}
            </h3>

            {search.results.length > 0 ? (
                <p className={styles.resultsCount}>
                {RIGHT_SIDEBAR_TEXTS.SEARCH_RESULTS_COUNT(search.results.length)}
                </p>
            ) : null}
            </div>

            {statusMessage ? (
                <p
                className={
                    search.error ? styles.errorText : styles.statusText
                }
                >
                {statusMessage}
                </p>
            ) : null}

            {search.results.length > 0 ? (
                <div className={styles.resultsList}>
                {search.results.map((user) => {
                    const userName = getUserName(user);
                    const email = getUserEmail(user);
                    const avatarUrl = getUserAvatar(user);
                    const avatarLetter = userName.charAt(0).toUpperCase();

                    return (
                    <Link
                        key={user.user_id}
                        to={user.profilePath}
                        className={styles.resultLink}
                        onClick={search.onResultSelect}
                    >
                        <div className={styles.resultAvatarWrapper}>
                        {avatarUrl ? (
                            <img
                            src={avatarUrl}
                            alt={userName}
                            className={styles.resultAvatarImage}
                            />
                        ) : (
                            <div className={styles.resultAvatarFallback}>
                            {avatarLetter}
                            </div>
                        )}
                        </div>

                        <div className={styles.resultMeta}>
                        <p className={styles.resultName}>{userName}</p>
                        <p className={styles.resultEmail}>{email}</p>
                        </div>
                    </Link>
                    );
                })}
                </div>
            ) : null}
        </section>
        </>
    );
}

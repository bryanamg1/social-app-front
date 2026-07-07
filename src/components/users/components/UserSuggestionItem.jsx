import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { USER_SUGGESTIONS_TEXTS } from "../../../constants";
import {
    getUserAvatar,
    getUserName,
} from "../utils/userProfileAdapter";

import styles from "../styles/UserSuggestionsPanel.module.css";

export function UserSuggestionItem({ suggestion, onFollow }) {
    const userName = getUserName(suggestion);
    const avatarUrl = getUserAvatar(suggestion);
    const avatarLetter = userName.charAt(0).toUpperCase();
    const followersCount = Number(suggestion?.followers_count ?? 0) || 0;

    return (
        <article className={styles.suggestionItem}>
            <div className={styles.suggestionUserLine}>
                <Link to={suggestion.profilePath} className={styles.avatarLink}>
                    <div className={styles.avatarWrapper}>
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={userName}
                                className={styles.avatarImage}
                            />
                        ) : (
                            <div className={styles.avatarFallback}>
                                {avatarLetter}
                            </div>
                        )}
                    </div>
                </Link>

                <Link to={suggestion.profilePath} className={styles.profileLink}>
                    <div className={styles.meta}>
                        <p className={styles.userName}>{userName}</p>
                        <p className={styles.userBio}>{suggestion.bio}</p>
                        <p className={styles.userStats}>
                            {USER_SUGGESTIONS_TEXTS.FOLLOWERS_COUNT(
                                followersCount
                            )}
                        </p>
                    </div>
                </Link>
            </div>

            <div className={styles.suggestionActionRow}>
                <Button
                    variant="outlined"
                    size="small"
                    className={styles.followButton}
                    disabled={suggestion.isFollowingAction}
                    onClick={() => onFollow(suggestion.id)}
                >
                    {suggestion.isFollowingAction
                        ? USER_SUGGESTIONS_TEXTS.FOLLOWING_BUTTON
                        : USER_SUGGESTIONS_TEXTS.FOLLOW_BUTTON}
                </Button>
            </div>
        </article>
    );
}

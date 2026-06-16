import { RIGHT_SIDEBAR_TEXTS } from "../../../constants";
import styles from "../styles/RightSidebar.module.css";

export function RightSidebar() {
    return (
        <aside className={styles.sidebar}>
        <section className={styles.searchCard}>
            <h2>{RIGHT_SIDEBAR_TEXTS.SEARCH_TITLE}</h2>

            <input
            type="search"
            placeholder={RIGHT_SIDEBAR_TEXTS.SEARCH_PLACEHOLDER}
            className={styles.searchInput}
            />
        </section>

        <section className={styles.suggestionsCard}>
            <h2>{RIGHT_SIDEBAR_TEXTS.SUGGESTIONS_TITLE}</h2>

            <p>{RIGHT_SIDEBAR_TEXTS.SUGGESTIONS_DESCRIPTION}</p>
        </section>
        </aside>
    );
}
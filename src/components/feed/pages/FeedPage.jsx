import { FEED_TEXTS, PREVIEW_REACTIONS } from "../../../constants";
import styles from "./FeedPage.module.css";

export function FeedPage() {
    return (
        <section className={styles.page}>
        <header className={styles.header}>
            <div>
            <span className={styles.eyebrow}>{FEED_TEXTS.EYEBROW}</span>
            <h1>{FEED_TEXTS.TITLE}</h1>
            </div>
        </header>

        <article className={styles.composer}>
            <div className={styles.avatar}>U</div>

            <div className={styles.composerBody}>
            <p>{FEED_TEXTS.COMPOSER_PLACEHOLDER}</p>
            <button type="button">{FEED_TEXTS.CREATE_POST}</button>
            </div>
        </article>

        <article className={styles.placeholderPost}>
            <div className={styles.postHeader}>
            <div className={styles.avatar}>S</div>

            <div>
                <strong>{FEED_TEXTS.PREVIEW_AUTHOR}</strong>
                <small>{FEED_TEXTS.PREVIEW_SUBTITLE}</small>
            </div>
            </div>

            <p>{FEED_TEXTS.PREVIEW_DESCRIPTION}</p>

            <div className={styles.fakeImage} />

            <div className={styles.reactions}>
            {PREVIEW_REACTIONS.map((reaction) => (
                <span key={reaction}>{reaction}</span>
            ))}
            </div>
        </article>
        </section>
    );
}
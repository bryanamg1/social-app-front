import { PROFILE_TEXTS } from "../../../constants";
import styles from "./ProfilePage.module.css";

export function ProfilePage() {
    return (
        <section className={styles.page}>
        <header className={styles.cover}>
            <div className={styles.avatar}>U</div>
        </header>

        <section className={styles.profileInfo}>
            <h1>{PROFILE_TEXTS.TITLE}</h1>

            <p>{PROFILE_TEXTS.DESCRIPTION}</p>

            <button type="button">{PROFILE_TEXTS.EDIT_PROFILE}</button>
        </section>
        </section>
    );
}
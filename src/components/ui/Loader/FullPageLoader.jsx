import { UI_TEXTS } from "../../../constants";
import styles from "./FullPageLoader.module.css";

export function FullPageLoader({ text = UI_TEXTS.LOADER.DEFAULT }) {
    return (
        <section className={styles.container}>
        <div className={styles.content}>
            <div className={styles.spinner} />
            <p className={styles.text}>{text}</p>
        </div>
        </section>
    );
}
import { Outlet } from "react-router-dom";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import styles from "../styles/MainLayout.module.css";

export function MainLayout() {
    return (
        <div className={styles.layout}>
        <LeftSidebar />

        <main className={styles.mainContent}>
            <Outlet />
        </main>

        <RightSidebar />
        </div>
    );
}
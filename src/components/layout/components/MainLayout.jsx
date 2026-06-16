import { Outlet } from "react-router-dom";
import { LeftSidebarContainer } from "./LeftSidebarContainer";
import { RightSidebar } from "./RightSidebar";
import styles from "../styles/MainLayout.module.css";

export function MainLayout() {
    return (
        <div className={styles.layout}>
        <LeftSidebarContainer />

        <main className={styles.mainContent}>
            <Outlet />
        </main>

        <RightSidebar />
        </div>
    );
}
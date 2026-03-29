import React from "react";
import styles from "./styles.module.scss";
import type { Project } from "../../../../../types/project";
import { ShortHeader } from "./components/Header";
import { ShortHero } from "./components/Hero";
import { ShortItinerary } from "./components/Itinerary";
import { ShortSidebar } from "./components/Sidebar";
import { ShortFooter } from "./components/Footer";

interface PreviewShortProps {
    project: Project;
}

const PreviewShort = ({ project }: PreviewShortProps) => {
    return (
        <div className={styles["short-template"]}>
            <ShortHeader project={project} styles={styles} />
            <ShortHero project={project} styles={styles} />

            <div className={styles["main-grid"]}>
                <ShortItinerary project={project} styles={styles} />
                <ShortSidebar project={project} styles={styles} />
            </div>

            <ShortFooter project={project} styles={styles} />
        </div>
    );
};

export default PreviewShort;

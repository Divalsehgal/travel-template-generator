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
    const bgImage = project.shortBgImage;

    return (
        <div
            className={styles["short-template"]}
            style={bgImage ? ({ "--bg-image": `url('${bgImage}')` } as React.CSSProperties) : undefined}
        >
            {bgImage && <div className={styles.overlay} aria-hidden="true" />}
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

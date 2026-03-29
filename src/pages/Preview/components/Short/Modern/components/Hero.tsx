import React from "react";
import type { Project } from "../../../../../../types/project";

export const ShortHero = ({ project, styles }: { project: Project, styles: Record<string, string> }) => (
    <section className={styles["hero"]}>
        <div className={styles["hero__image-container"]}>
            {project.hero.image && <img src={project.hero.image} alt={project.hero.title} className={styles["hero__image"]} />}
            <div className={styles["hero__overlay"]}>
                <h2 className={styles["hero__title"]}>{project.hero.title}</h2>
                <div className={styles["hero__stats"]}>
                    {project.hero.stats.duration && (
                        <div className={styles["hero__stat"]} data-label="Duration">
                            <span className={`material-symbols-outlined ${styles["hero__stat-icon"]}`}>schedule</span>
                            <div className={styles["hero__stat-text"]}>
                                <span className={styles["hero__stat-label"]}>Duration</span>
                                <span className={styles["hero__stat-value"]}>{project.hero.stats.duration}</span>
                            </div>
                        </div>
                    )}
                    {project.hero.stats.altitude && (
                        <div className={styles["hero__stat"]} data-label="Difficulty">
                            <span className={`material-symbols-outlined ${styles["hero__stat-icon"]}`}>terrain</span>
                            <div className={styles["hero__stat-text"]}>
                                <span className={styles["hero__stat-label"]}>Difficulty</span>
                                <span className={styles["hero__stat-value"]}>{project.hero.stats.altitude}</span>
                            </div>
                        </div>
                    )}
                    {project.leader.name && (
                        <div className={styles["hero__stat"]} data-label="Difficulty">
                            <span className={styles['hero__stat-label']}>{project.shortTemplateSettings?.leaderLabel || "LEADER"}</span>
                            <div className={styles["hero__stat-text"]}>
                                <span className={styles["hero__stat-value"]}>{project.leader.name}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {project.hero.expeditionOverview && (
            <div className={styles["hero__overview"]}>
                {project.hero.expeditionOverview}
            </div>
        )}
    </section>
);

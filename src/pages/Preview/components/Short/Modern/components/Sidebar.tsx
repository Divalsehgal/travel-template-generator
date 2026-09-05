import React from "react";
import type { Project } from "../../../../../../types/project";

export const ShortSidebar = ({ project, styles }: { project: Project, styles: Record<string, string> }) => (
    <div className={styles["sidebar"]}>
        <div className={styles["sidebar-section"]}>
            <h3 className={styles["sidebar-title"]}>Inclusions</h3>
            <ul className={styles["icon-list"]}>
                {((project.inclusions ?? []).length > 0 ? project.inclusions : [
                    { icon: "check_circle", title: "Inclusions to be confirmed", description: "" }
                ]).slice(0, 8).map((item, idx) => (
                    <li key={idx} className={styles["icon-list__item"]}>
                        <span className={styles["icon-list__bullet"]}></span>
                        <span className={`material-symbols-outlined ${styles["icon-list__icon"]}`}>{item.icon}</span>
                        <span className={styles["icon-list__text"]}>{item.title}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className={styles["sidebar-section"]}>
            <h3 className={styles["sidebar-title"]}>Must Carry</h3>
            <ul className={styles["icon-list"]}>
                {(project.thingsToCarry ?? []).slice(0, 6).map((item, idx) => (
                    <li key={idx} className={styles["icon-list__item"]}>
                        <span className={styles["icon-list__bullet"]}></span>
                        <span className={`material-symbols-outlined ${styles["icon-list__icon"]}`}>{item.icon}</span>
                        <span className={styles["icon-list__text"]}>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

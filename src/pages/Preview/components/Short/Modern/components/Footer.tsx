import React from "react";
import type { Project } from "../../../../../../types/project";

export const ShortFooter = ({ project, styles }: { project: Project, styles: Record<string, string> }) => (
    <footer className={styles["footer"]}>
        <div className={styles["footer__main"]}>
            <span className={styles["footer__label"]}>{project.shortTemplateSettings?.bookSlotText || "Book Your Slot"}</span>
            <p className={styles["footer__text"]}>Plan your next adventure with us.</p>
            {project.footer.slotsText && (
                <div className={styles["footer__badge"]}>{project.footer.slotsText}</div>
            )}
        </div>
        <div className={styles["footer__brand"]}>
            <span className={styles["footer__label"]}>{project.shortTemplateSettings?.websiteText || "Web"}</span>
            <div className={styles["footer__logo-container"]}>
                {project.brand.logo && <img src={project.brand.logo} alt="Logo" className={styles["footer__logo"]} />}
                <span>{project.footer.copyright}</span>
            </div>
            {project.footer.spotText && (
                <div className={styles["footer__spot"]}>{project.footer.spotText}</div>
            )}
        </div>
    </footer>
);

import React from "react";
import type { Project } from "../../../../../../types/project";
import BrandLogo from "../../../../../../components/common/BrandLogo";

export const ShortHeader = ({ project, styles }: { project: Project, styles: Record<string, string> }) => {
    const words = project.brand.title ? project.brand.title.split(' ') : [];
    const hasMultipleWords = words.length > 2;

    const renderTitle = () => {
        if (!hasMultipleWords) return project.brand.title;

        return (
            <>
                {words.slice(0, 2).join(' ')}<br className={styles["header__title--br"]} />
                <span className={styles["header__title--accent"]}>
                    {words.slice(2).join(' ')}
                </span>
            </>
        );
    };

    return (
        <header className={styles["header"]}>
            <div className={styles["header__content"]}>
                <div className={styles["header__brand"]}>
                    <div className={styles["header__logo-mark"]}>
                        {project.brand.logo ? (
                            <BrandLogo
                                className={styles["header__logo"]}
                                logoUrl={project.brand.logo}
                            />
                        ) : (
                            <span className={`material-symbols-outlined ${styles["header__logo-icon"]}`}>landscape</span>
                        )}
                    </div>
                    <div className={styles["header__copyright"]}>
                        {project.footer.copyright || "Summit Collective © 2024"}
                    </div>

                    {project.header.subBadge && <div className={styles["header__raw-label"]}>{project.header.subBadge}</div>}
                    {!project.header.subBadge && project.header.rawLabel && <div className={styles["header__raw-label"]}>{project.header.rawLabel}</div>}
                    <h1 className={styles["header__title"]}>{renderTitle()}</h1>
                    <div className={styles["header__subtitle"]}>{project.brand.subtitle}</div>
                    {project.header.coordinates && <div className={styles["header__coords"]}>{project.header.coordinates}</div>}
                </div>
                <div className={styles["header__contact"]}>
                    {project.header.phone && (
                        <div className={styles["contact-item"]}>
                            <span className="material-symbols-outlined">call</span>
                            {project.header.phone}
                        </div>
                    )}
                    {project.header.email && (
                        <div className={styles["contact-item"]}>
                            <span className="material-symbols-outlined">mail</span>
                            {project.header.email}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

import React from "react";
import type { Project } from "../../../../../types/project";
import styles from "./styles.module.scss";

/**
 * PreviewTechno - Brutalist / Neobrutalist short template
 *
 * Design language: dark background, neon lime accent (#ccff00),
 * Space Mono + Archivo Black fonts, hard box-shadows, no border-radius.
 *
 * This component is self-contained — it does NOT share styles with any other template.
 */

const STEP_ICONS = [
    "north_east",
    "ac_unit",
    "change_history",
    "trending_up",
    "south_east",
    "keyboard_double_arrow_up",
];

interface PreviewTechnoProps {
    project: Project;
}


const PreviewTechno: React.FC<PreviewTechnoProps> = ({ project }) => {
    const bgImage = project.shortBgImage;

    const itinerary = project.itinerary ?? [];
    const inclusions = project.inclusions ?? [];

    // Split brand title: first words in white, last word in neon
    const titleWords = (project.brand.title ?? "").split(" ");
    const titleMain = titleWords.slice(0, -1).join(" ");
    const titleAccent = titleWords[titleWords.length - 1] ?? "";

    return (
        <div
            className={styles.template}
            style={bgImage ? ({ "--bg-image": `url('${bgImage}')` } as React.CSSProperties) : undefined}
        >
            {/* Overlays */}
            <div className={styles.overlay} aria-hidden="true" />
            <div className={styles.vignette} aria-hidden="true" />

            <div className={styles.content}>
                {/* ── HEADER ── */}
                <header className={styles.header}>
                    {project.header.subBadge && (
                        <div className={styles.rawLabel}>{project.header.subBadge}</div>
                    )}

                    <h1 className={styles.title}>
                        {titleMain && <>{titleMain}<br /></>}
                        <span className={styles.titleAccent}>{titleAccent}</span>
                        <br />
                        <span className={styles.titleSuffix}>Exp.</span>
                    </h1>

                    <div className={styles.neonDivider} aria-hidden="true" />

                    {project.header.coordinates && (
                        <p className={styles.coords}>[ {project.header.coordinates} ]</p>
                    )}
                </header>

                {/* ── STATS GRID ── */}
                <section className={styles.statsGrid} aria-label="Expedition stats">
                    {project.hero.stats.duration && (
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>TIME</span>
                            <p className={styles.statValue}>{project.hero.stats.duration}</p>
                        </div>
                    )}
                    {project.hero.teamStat && (
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>TEAM</span>
                            <p className={styles.statValue}>{project.hero.teamStat}</p>
                        </div>
                    )}
                    {project.hero.stats.altitude && (
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>LVL</span>
                            <p className={styles.statValue}>{project.hero.stats.altitude}</p>
                        </div>
                    )}
                </section>

                {/* ── ITINERARY GRID ── */}
                <main className={styles.mainGrid}>
                    {itinerary.slice(0, 5).map((day, idx) => (
                        <div key={idx} className={styles.dayCard}>
                            <span className={styles.brutalLabel}>
                                STEP {String(day.day ?? idx + 1).padStart(2, "0")}
                            </span>
                            <h2 className={styles.dayTitle}>
                                {/* Split title across 2 lines for the brutalist look */}
                                {day.title.split(" ").slice(0, 1)}<br />
                                {day.title.split(" ").slice(1).join(" ")}
                            </h2>
                            <span
                                className={`material-symbols-outlined ${styles.dayIcon}`}
                                aria-hidden="true"
                            >
                                {STEP_ICONS[idx % STEP_ICONS.length]}
                            </span>
                        </div>
                    ))}

                    {/* Specs card (inclusions) */}
                    <div className={`${styles.dayCard} ${styles.dayCardSpecs}`}>
                        <span className={styles.specsLabel}>SPECS</span>
                        <ul className={styles.specsList}>
                            {inclusions.slice(0, 3).map((item, idx) => (
                                <li key={idx}>// {item.title.toUpperCase()}</li>
                            ))}
                        </ul>
                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className={styles.footer}>
                    <div className={styles.footerLeft}>
                        <span className={styles.footerLabel}>Contact</span>
                        {project.header.phone && (
                            <span className={styles.footerValue}>PH: {project.header.phone}</span>
                        )}
                    </div>
                    <div className={styles.footerRight}>
                        <div className={styles.footerSite}>
                            <span className={styles.footerLabel}>Source</span>
                            {project.header.email && (
                                <span className={styles.footerValue}>{project.header.email}</span>
                            )}
                        </div>
                        <div className={styles.logoShape} aria-hidden="true">
                            <span className={styles.logoLetter}>
                                {(project.brand.title ?? "A")[0]}
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PreviewTechno;

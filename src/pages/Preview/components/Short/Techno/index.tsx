import React from "react";
import type { Project } from "../../../../../types/project";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from "./styles.module.scss";
import BrandLogo from "../../../../../components/common/BrandLogo";


const getSocialIcon = (platform: string) => {
    switch (platform) {
        case 'instagram': return <InstagramIcon fontSize="inherit" />;
        case 'facebook': return <FacebookIcon fontSize="inherit" />;
        case 'linkedin': return <LinkedInIcon fontSize="inherit" />;
        case 'twitter': return <TwitterIcon fontSize="inherit" />;
        case 'youtube': return <YouTubeIcon fontSize="inherit" />;
        case 'whatsapp': return <WhatsAppIcon fontSize="inherit" />;
        case 'website': return <LanguageIcon fontSize="inherit" />;
        default: return null;
    }
};

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
    const itinerary = project.itinerary ?? [];
    const inclusions = project.inclusions ?? [];

    const titleWords = (project.brand.title ?? "").split(" ");
    const titleMain = titleWords.slice(0, -1).join(" ");
    const titleAccent = titleWords[titleWords.length - 1] ?? "";

    return (
        <div className={styles.techno}>
            <div className={styles.techno__content}>
                {/* ── HEADER ── */}
                <header className={styles.techno__header}>
                    {project.header.subBadge && (
                        <div className={styles['techno__raw-label']}>{project.header.subBadge}</div>
                    )}

                    <div className={styles['techno__header-split']}>
                        <div className={styles['techno__header-text']}>
                            <h1 className={styles['techno__brand-title']}>
                                {titleMain && <>{titleMain}<br /></>}
                                <span className={styles['techno__title-accent']}>{titleAccent}</span>
                                <br />
                            </h1>

                            <div className={styles['techno__trek-info']}>
                                <h2 className={styles['techno__trek-title']}>{project.hero.title}</h2>
                                {project.hero.location && (
                                    <div className={styles['techno__trek-location']}>
                                        {project.hero.locationUrl ? (
                                            <a href={project.hero.locationUrl} target="_blank" rel="noreferrer" className={styles['techno__location-link']}>
                                                {project.hero.location}
                                                <OpenInNewIcon fontSize="inherit" className={styles['techno__location-icon']} />
                                            </a>
                                        ) : (
                                            <span>{project.hero.location}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {project.brand.logo && (
                            <div className={styles['techno__header-logo-container']}>
                                <BrandLogo
                                    className={styles["techno__header-logo"]}
                                    logoUrl={project.brand.logo}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles['techno__neon-divider']} aria-hidden="true" />

                    {project.header.coordinates && (
                        <p className={styles.techno__coords}>[ {project.header.coordinates} ]</p>
                    )}
                </header>

                <section className={styles['techno__stats-grid']} aria-label="Expedition stats">
                    {project.hero.stats.duration && (
                        <div className={styles['techno__stat-item']}>
                            <span className={styles['techno__stat-label']}>{project.shortTemplateSettings?.timeLabel || "DURATION"}</span>
                            <p className={styles['techno__stat-value']}>{project.hero.stats.duration}</p>
                        </div>
                    )}
                    {project.hero.stats.altitude && (
                        <div className={styles['techno__stat-item']}>
                            <span className={styles['techno__stat-label']}>{project.shortTemplateSettings?.altitudeLabel || "LVL"}</span>
                            <p className={styles['techno__stat-value']}>{project.hero.stats.altitude}</p>
                        </div>
                    )}
                    {project.leader?.name && (
                        <div className={styles['techno__stat-item']}>
                            <span className={styles['techno__stat-label']}>{project.shortTemplateSettings?.leaderLabel || "LEADER"}</span>
                            <p className={styles['techno__stat-value']}>{project.leader.name}</p>
                        </div>
                    )}
                </section>

                {/* ── ITINERARY GRID ── */}
                <main className={styles['techno__main-grid']}>
                    {itinerary.map((day, idx) => (
                        <div key={idx} className={styles['techno__day-card']}>
                            <span className={styles['techno__brutal-label']}>
                                DAY {String(day.day ?? idx + 1).padStart(2, "0")}
                            </span>
                            <h2 className={styles['techno__day-title']}>
                                {/* Split title across 2 lines for the brutalist look */}
                                {day.title.split(" ").slice(0, 1)}<br />
                                {day.title.split(" ").slice(1).join(" ")}
                            </h2>

                            {(day.distance || day.time) && (
                                <div className={styles['techno__day-metrics']}>
                                    {day.distance && <span>{day.distance}</span>}
                                    {(day.distance && day.time) && <span className={styles['techno__metric-divider']}>/</span>}
                                    {day.time && <span>{day.time}</span>}
                                </div>
                            )}
                            <span
                                className={`material-symbols-outlined ${styles['techno__day-icon']}`}
                                aria-hidden="true"
                            >
                                {STEP_ICONS[idx % STEP_ICONS.length]}
                            </span>
                        </div>
                    ))}

                    {/* Specs card (inclusions) */}
                    <div className={`${styles['techno__day-card']} ${styles['techno__day-card--specs']}`}>
                        <span className={styles['techno__specs-label']}>{project.shortTemplateSettings?.specsLabel || "SPECS"}</span>
                        <ul className={styles['techno__specs-list']}>
                            {inclusions.slice(0, 3).map((item, idx) => (
                                <li key={idx}>// {item.title.toUpperCase()}</li>
                            ))}
                        </ul>
                    </div>
                </main>

                {/* ── FAQ SECTION ── */}
                {project.faqs && project.faqs.length > 0 && (
                    <div className={styles['techno__faq-section']}>
                        <div className={styles['techno__faq-header']}>
                            <span className={styles['techno__brutal-label']}>{project.shortTemplateSettings?.faqLabel || "FAQ"}</span>
                        </div>
                        <div className={styles['techno__faq-list']}>
                            {project.faqs.slice(0, 3).map((faq, idx) => (
                                <div key={idx} className={styles['techno__faq-item']}>
                                    <div className={styles['techno__faq-q']}>Q: {faq.question}</div>
                                    <div className={styles['techno__faq-a']}>A: {faq.answer}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── FOOTER ── */}
                <footer className={styles.techno__footer}>
                    <div className={styles['techno__footer-left']}>
                        <span className={styles['techno__footer-label']}>Contact</span>
                        {project.header.phone && (
                            <span className={styles['techno__footer-value']}>PH: {project.header.phone}</span>
                        )}
                    </div>
                    <div className={styles['techno__footer-right']}>
                        {project.header.links && project.header.links.length > 0 && (
                            <div className={styles['techno__footer-socials']}>
                                {project.header.links.map((link, idx) => {
                                    const icon = getSocialIcon(link.platform);
                                    if (!icon || !link.url) return null;
                                    return (
                                        <a key={idx} className={styles['techno__social-icon']} href={link.url} target="_blank" rel="noreferrer">
                                            {icon}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PreviewTechno;

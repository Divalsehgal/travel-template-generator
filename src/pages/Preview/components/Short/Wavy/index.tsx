import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import styles from "./styles.module.scss";
import type { Project } from "../../../../../types/project";

const getSocialIcon = (platform: string) => {
    switch (platform) {
        case 'instagram': return <InstagramIcon fontSize="inherit" />;
        case 'facebook': return <FacebookIcon fontSize="inherit" />;
        case 'linkedin': return <LinkedInIcon fontSize="inherit" />;
        case 'twitter': return <TwitterIcon fontSize="inherit" />;
        case 'youtube': return <YouTubeIcon fontSize="inherit" />;
        case 'website': return <LanguageIcon fontSize="inherit" />;
        default: return null;
    }
};

interface PreviewWavyProps {
    project: Project;
}

const PreviewWavy = ({ project }: PreviewWavyProps) => {
    const bgImage = project.shortBgImage;

    return (
        <div
            className={styles["wavy-template"]}
            style={bgImage ? ({ "--bg-image": `url('${bgImage}')` } as React.CSSProperties) : undefined}
        >
            {bgImage && <div className={styles.overlay} aria-hidden="true" />}

            <header className={styles["header"]}>
                <span className={styles["header__badge"]}>
                    {project.header.subBadge || "Premium Expedition 2024"}
                </span>
                <h1 className={styles["header__title"]}>
                    {project.brand.title.split(' ').slice(0, 2).join(' ')}<br />
                    <span className={styles["header__title--accent"]}>
                        {project.brand.title.split(' ').slice(2).join(' ') || "PREMIUM"}
                    </span>
                </h1>

                <div className={styles["header__socials"]}>
                    {project.header.links?.map((link, idx) => {
                        const icon = getSocialIcon(link.platform);
                        if (!icon || !link.url) return null;

                        return (
                            <a key={idx} className={styles["social-icon"]} href={link.url} target="_blank" rel="noreferrer">
                                {icon}
                            </a>
                        );
                    })}
                </div>
            </header>

            <main className={styles["main"]}>
                <div className={styles["itinerary"]}>
                    {project.itinerary.slice(0, 4).map((day, idx) => (
                        <div key={idx} className={styles["itinerary-item"]}>
                            <div className={styles["itinerary-item__header"]}>
                                <span className={styles["itinerary-item__day"]}>Day {day.day || `0${idx + 1}`}</span>
                                <span className="material-symbols-outlined">
                                    {idx === 0 ? 'flight_takeoff' : idx === 1 ? 'terrain' : idx === 2 ? 'ac_unit' : 'paragliding'}
                                </span>
                            </div>
                            <h3 className={styles["itinerary-item__title"]}>{day.title}</h3>
                            <p className={styles["itinerary-item__desc"]}>
                                {day.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className={styles["overview"]}>
                    <div className={styles["overview__content"]}>
                        <h2 className={styles["overview__title"]}>EXPEDITION OVERVIEW</h2>
                        <p className={styles["overview__subtitle"]}>
                            {project.hero.expeditionOverview || "5 Days | Elite Access | All-Inclusive"}
                        </p>
                        <div className={styles["overview__booking"]}>
                            {project.hero.bookingText || "Visit OUR SITE for Full Details & Booking"}
                        </div>
                    </div>
                    <div className={styles["overview__qr"]}>
                        <div className={styles["qr-box"]}>
                            <span className="material-symbols-outlined">qr_code_2</span>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles["footer"]}>
                <div className={styles["footer__copyright"]}>
                    {project.footer.copyright || "© 2024 Expedition Co."}
                </div>
                <div className={styles["footer__status"]}>
                    <div className={styles["footer__slots"]}>
                        {project.footer.slotsText || "LIMITED SLOTS"}
                    </div>
                    <div className={styles["footer__secure"]}>
                        {project.footer.spotText || "Secure Your Spot Now"}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PreviewWavy;

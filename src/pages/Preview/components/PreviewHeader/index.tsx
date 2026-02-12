import React from 'react';
import type { HeaderData, BrandData } from '../../../../types/project';
import styles from "./styles.module.scss";

interface PreviewHeaderProps {
  header: HeaderData;
  brand: BrandData;
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,5A1,1 0 0,1 20,6A1,1 0 0,1 19,7A1,1 0 0,1 18,6A1,1 0 0,1 19,5Z" />
    </svg>
  ),
  facebook: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.23L15.78 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z" />
    </svg>
  ),
  twitter: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.59,4 11.64,5.95 11.64,8.35C11.64,8.69 11.67,9.03 11.76,9.36C8.12,9.17 4.91,7.43 2.76,4.79C2.38,5.44 2.17,6.2 2.17,7C2.17,8.5 2.94,9.84 4.1,10.62C3.39,10.6 2.73,10.4 2.14,10.1C2.14,10.12 2.14,10.14 2.14,10.17C2.14,12.26 3.63,13.99 5.6,14.39C5.23,14.49 4.85,14.54 4.46,14.54C4.18,14.54 3.91,14.51 3.65,14.46C4.2,16.17 5.79,17.41 7.67,17.44C6.2,18.59 4.34,19.28 2.33,19.28C1.98,19.28 1.64,19.26 1.3,19.22C3.21,20.44 5.47,21.16 7.91,21.16C15.84,21.16 20.18,14.59 20.18,8.88C20.18,8.69 20.18,8.5 20.17,8.31C21,7.71 21.73,6.91 22.46,6Z" />
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
  ),
  youtube: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L15,19C12.81,19 11.2,18.84 10.17,18.56C9.27,18.31 8.69,17.73 8.44,16.83C8.31,16.36 8.22,15.73 8.16,14.93C8.09,14.13 8.06,13.44 8.06,12.84L8,12C8,9.81 8.16,8.2 8.44,7.17C8.69,6.27 9.27,5.69 10.17,5.44C10.64,5.31 11.27,5.22 12.07,5.16C12.87,5.09 13.56,5.06 14.16,5.06L15,5C17.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
    </svg>
  ),
};

const PreviewHeader = ({ header, brand }: PreviewHeaderProps): React.JSX.Element => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__content"]}>
        <div className={styles["header__brand"]}>
          {brand.logo && (
            <img
              src={brand.logo}
              alt={brand.title}
              className={styles["header__brand-logo"]}
            />
          )}
          <div className={styles["header__brand-details"]}>
            <h1 className={styles["header__brand-title"]}>{brand.title}</h1>
            <p className={styles["header__brand-subtitle"]}>{brand.subtitle}</p>
          </div>
        </div>
        <div className={styles["header__brand-title-contact"]}>
          <div className={styles["header__contact"]}>
            {header.phone && (
              <a href={`tel:${header.phone}`} className={styles["header__contact-item"]}>
                <span className="material-symbols-outlined">call</span>
                {header.phone}
              </a>
            )}
            {header.email && (
              <a href={`mailto:${header.email}`} className={styles["header__contact-item"]}>
                <span className="material-symbols-outlined">email</span>
                {header.email}
              </a>
            )}
            {header.website && (
              <a
                href={header.website.startsWith('http') ? header.website : `https://${header.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["header__contact-item"]}
              >
                <span className="material-symbols-outlined">language</span>
                {header.website}
              </a>
            )}

            {header.links?.map((link, index) => {
              const displayValue = link.alias || link.platform;
              const href = link.url.startsWith('http') ? link.url : `https://${link.url}`;
              const icon = SOCIAL_ICONS[link.platform] || <span className="material-symbols-outlined">link</span>;

              return (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["header__contact-item"]}
                >
                  {icon}
                  {displayValue}
                </a>
              );
            })}

            {(!header.links || header.links.length === 0) && (
              <>
                {header.instagram && (
                  <a
                    href={header.instagram.startsWith('http') ? header.instagram : `https://${header.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["header__contact-item"]}
                  >
                    {SOCIAL_ICONS.instagram}
                    {header.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@')}
                  </a>
                )}
                {header.facebook && (
                  <a
                    href={header.facebook.startsWith('http') ? header.facebook : `https://${header.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["header__contact-item"]}
                  >
                    {SOCIAL_ICONS.facebook}
                    {header.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, '/')}
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PreviewHeader;

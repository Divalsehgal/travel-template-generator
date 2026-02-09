import type { HeaderData, BrandData } from '../../../../types/project';
import type { SectionStyle } from '../../../../types/common';
import styles from "./styles.module.scss";

interface PreviewHeaderProps {
  header: HeaderData;
  brand: BrandData;
  sectionStyle?: SectionStyle;
}

const PreviewHeader = ({ header, brand, sectionStyle }: PreviewHeaderProps): JSX.Element => {
  const headerStyle = {
    color: sectionStyle?.textColor,
    backgroundColor: sectionStyle?.backgroundColor
  };

  return (
    <header className={styles["header"]} style={headerStyle}>
      <div className={styles["header__content"]}>
        <div className={styles["header__brand"]}>
          {brand.logo && (
            <img
              src={brand.logo}
              alt={brand.title}
              className={styles["header__brand-logo"]}
            />
          )}
        </div>
        <div className={styles["header__brand-title-contact"]}>
          <div className={styles["header__brand-title-details"]}>
            <h1 className={styles["header__brand-title"]}>{brand.title}</h1>
            <p className={styles["header__brand-subtitle"]}>{brand.subtitle}</p>
          </div>

          <div className={styles["header__contact"]}>

            {header.phone && (
              <div className={styles["header__contact-item"]}>
                <span className="material-symbols-outlined">call</span>
                {header.phone}
              </div>
            )}
            {header.email && (
              <div className={styles["header__contact-item"]}>
                <span className="material-symbols-outlined">email</span>
                {header.email}
              </div>
            )}
            {header.website && (
              <div className={styles["header__contact-item"]}>
                <span className="material-symbols-outlined">language</span>
                {header.website}
              </div>
            )}
            {header.instagram && (
              <div className={styles["header__contact-item"]}>
                <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,5A1,1 0 0,1 20,6A1,1 0 0,1 19,7A1,1 0 0,1 18,6A1,1 0 0,1 19,5Z" />
                </svg>
                {header.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@')}
              </div>
            )}
            {header.facebook && (
              <div className={styles["header__contact-item"]}>
                <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.23L15.78 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z" />
                </svg>
                {header.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, '/')}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PreviewHeader;

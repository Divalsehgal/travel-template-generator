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
          <div>
            <h1 className={styles["header__brand-title"]}>{brand.title}</h1>
            <p className={styles["header__brand-subtitle"]}>{brand.subtitle}</p>
          </div>
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
        </div>
      </div>
    </header>
  );
};

export default PreviewHeader;

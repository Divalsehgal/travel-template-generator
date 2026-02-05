import type { FooterData } from '../../../../types/project';
import type { SectionStyle } from '../../../../types/common';
import styles from "./styles.module.scss";

interface PreviewFooterProps {
  footer: FooterData;
  sectionStyle?: SectionStyle;
}

const PreviewFooter = ({ footer, sectionStyle }: PreviewFooterProps): JSX.Element => {
  const footerStyle = {
    color: sectionStyle?.textColor,
    backgroundColor: sectionStyle?.backgroundColor
  };
  
  return (
    <footer className={styles["footer"]} style={footerStyle}>
      <div className={styles["footer__content"]}>
        {footer.title && <h3 className={styles["footer__title"]}>{footer.title}</h3>}
        {footer.description && <p className={styles["footer__description"]}>{footer.description}</p>}
        {footer.copyright && <p className={styles["footer__copyright"]}>{footer.copyright}</p>}
      </div>
    </footer>
  );
};

export default PreviewFooter;

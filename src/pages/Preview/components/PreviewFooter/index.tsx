import React from 'react';
import type { FooterData } from '../../../../types/project';
import styles from "./styles.module.scss";

interface PreviewFooterProps {
    footer: FooterData;
}

const PreviewFooter = ({ footer }: PreviewFooterProps): React.JSX.Element => {
    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer__content"]}>
                {footer.title && <h3 className={styles["footer__title"]}>{footer.title}</h3>}
                {footer.description && <p className={styles["footer__description"]}>{footer.description}</p>}
                {footer.copyright && <p className={styles["footer__copyright"]}>{footer.copyright}</p>}
            </div>
        </footer>
    );
};

export default PreviewFooter;

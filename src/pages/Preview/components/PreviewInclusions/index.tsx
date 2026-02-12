import React from 'react';
import type { Inclusion } from '../../../../types/project';
import styles from "./styles.module.scss";

interface PreviewInclusionsProps {
    inclusions: Inclusion[];
}

const PreviewInclusions = ({ inclusions }: PreviewInclusionsProps): React.JSX.Element | null => {
    if (!inclusions || inclusions.length === 0) return null;

    return (
        <section className={styles["inclusions"]}>
            <h3 className={styles["section__title"]}>What's Included</h3>
            <div className={styles["inclusions__grid"]}>
                {inclusions.map((item, index) => (
                    <div key={index} className={styles["inclusions__item"]}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PreviewInclusions;

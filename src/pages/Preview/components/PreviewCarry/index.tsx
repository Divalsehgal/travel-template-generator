import React from 'react';
import type { CarryItem } from '../../../../types/project';
import styles from "./styles.module.scss";

interface PreviewCarryProps {
    thingsToCarry: CarryItem[];
}

const PreviewCarry = ({ thingsToCarry }: PreviewCarryProps): React.JSX.Element | null => {
    if (!thingsToCarry || thingsToCarry.length === 0) return null;

    return (
        <section className={styles["carry"]}>
            <h3 className={styles["section__title"]}>Essential Items to Carry</h3>
            <div className={styles["carry__grid"]}>
                {thingsToCarry.map((item, index) => (
                    <div key={index} className={styles["carry__item"]}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PreviewCarry;

import React from "react";
import type { Project } from "../../../../../../types/project";

const getStepIcon = (idx: number) => {
    const icons = ['south_east', 'ac_unit', 'keyboard_double_arrow_up', 'explore', 'flag', 'terrain'];
    return icons[idx % icons.length];
};

export const ShortItinerary = ({ project, styles }: { project: Project, styles: Record<string, string> }) => (
    <div className={styles["itinerary"]}>
        <h3 className={styles["grid-title"]}>Itinerary</h3>
        <div className={styles["itinerary__list"]}>
            {project.itinerary.map((day, idx) => (
                <div key={idx} className={`${styles["itinerary__item"]} ${styles[`itinerary__item--step-${idx + 1}`] || ''}`}>
                    <div className={styles["itinerary__item-left"]}>
                        <span className={styles["itinerary__day"]}>{day.day ? `0${day.day}` : `0${idx + 1}`} / {(day.title || "Step").split(' ')[0]}</span>
                        <div className={styles["itinerary__content"]}>
                            <h4 className={styles["itinerary__title"]}>{day.title}</h4>
                            <p className={styles["itinerary__description"]}>{day.description}</p>
                        </div>
                    </div>
                    <span className={`material-symbols-outlined ${styles["itinerary__icon"]}`}>
                        {getStepIcon(idx)}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

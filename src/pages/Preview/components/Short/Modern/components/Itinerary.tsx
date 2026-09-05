import React from "react";
import type { Project } from "../../../../../../types/project";
import { useNormalizedItinerary } from "../../../../../../hooks/useNormalizedItinerary";

const getStepIcon = (idx: number) => {
    const icons = ['south_east', 'ac_unit', 'keyboard_double_arrow_up', 'explore', 'flag', 'terrain'];
    return icons[idx % icons.length];
};

export const ShortItinerary = ({ project, styles }: { project: Project, styles: Record<string, string> }) => {
    const days = useNormalizedItinerary(project.itinerary);

    return (
        <div className={styles["itinerary"]}>
            <h3 className={styles["grid-title"]}>Day-by-Day Itinerary</h3>
            <div className={styles["itinerary__list"]}>
                {days.map((day) => (
                    <div key={day.index} className={`${styles["itinerary__item"]} ${styles[`itinerary__item--step-${day.index + 1}`] || ''}`}>
                        <div className={styles["itinerary__item-left"]}>
                            <span className={styles["itinerary__day"]}>
                                Day {day.dayLabel}
                                {day.badge ? ` / ${day.badge}` : ""}
                            </span>
                            <div className={styles["itinerary__content"]}>
                                <h4 className={styles["itinerary__title"]}>{day.title}</h4>
                                {day.hasMetrics && (
                                    <div className={styles["itinerary__metrics"]}>
                                        {day.distance && (
                                            <span className={styles["itinerary__metric"]}>
                                                <span className="material-symbols-outlined">route</span>
                                                {day.distance}
                                            </span>
                                        )}
                                        {day.time && (
                                            <span className={styles["itinerary__metric"]}>
                                                <span className="material-symbols-outlined">schedule</span>
                                                {day.time}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <p className={styles["itinerary__description"]}>{day.description}</p>
                            </div>
                        </div>
                        <span className={`material-symbols-outlined ${styles["itinerary__icon"]}`}>
                            {getStepIcon(day.index)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

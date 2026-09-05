import React from 'react';
import type { ItineraryDay } from '../../../../types/project';
import { useNormalizedItinerary } from '../../../../hooks/useNormalizedItinerary';
import styles from "./styles.module.scss";

interface PreviewItineraryProps {
  itinerary: ItineraryDay[];
}

const PreviewItinerary = ({ itinerary }: PreviewItineraryProps): React.JSX.Element | null => {
  const days = useNormalizedItinerary(itinerary);
  if (days.length === 0) return null;

  return (
    <section className={styles["itinerary"]}>
      <h3 className={styles["section__title"]}>Day-by-Day Itinerary</h3>
      <div className={styles["itinerary__list"]}>
        {days.map((day) => {
          const isEven = day.index % 2 === 0;

          return (
            <div key={day.index} className={`${styles["itinerary__item"]} ${isEven ? styles["itinerary__item--even"] : styles["itinerary__item--odd"]}`}>
              <div className={styles["itinerary__day"]}>
                <span className={styles["itinerary__day-number"]}>Day {day.dayLabel}</span>
                {day.badge && <span className={styles["itinerary__badge"]}>{day.badge}</span>}
              </div>

              <div className={styles["itinerary__content"]}>
                <div className={styles["itinerary__visual-side"]}>
                  {day.hasImages && (
                    <div className={styles["itinerary__media"]}>
                      {day.images.length >= 3 ? (
                        <div className={styles["itinerary__grid"]}>
                          <div className={styles["itinerary__grid-main"]}>
                            <img src={day.images[0]} alt={day.title} />
                          </div>
                          <div className={styles["itinerary__grid-side"]}>
                            <img src={day.images[1]} alt="" />
                            <img src={day.images[2]} alt="" />
                          </div>
                        </div>
                      ) : (
                        <div className={styles["itinerary__image-wrap"]}>
                          {day.images.map((img, i) => (
                            <img key={i} src={img} alt={`${day.title} ${i + 1}`} className={styles["itinerary__image"]} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles["itinerary__text-side"]}>
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewItinerary;

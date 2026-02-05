import type { ItineraryDay } from '../../../../types/project';
import type { SectionStyle } from '../../../../types/common';
import styles from "./styles.module.scss";

interface PreviewItineraryProps {
  itinerary: ItineraryDay[];
  sectionStyle?: SectionStyle;
}

const PreviewItinerary = ({ itinerary, sectionStyle }: PreviewItineraryProps): JSX.Element | null => {
  if (!itinerary || itinerary.length === 0) return null;

  const itineraryStyle = {
    color: sectionStyle?.textColor,
    backgroundColor: sectionStyle?.backgroundColor
  };

  return (
    <section className={styles["itinerary"]} style={itineraryStyle}>
      <h3 className={styles["section__title"]}>Day-by-Day Itinerary</h3>
      <div className={styles["itinerary__list"]}>
        {itinerary.map((day, index) => (
          <div key={index} className={styles["itinerary__item"]}>
            <div className={styles["itinerary__day"]}>
              <span className={styles["itinerary__day-number"]}>Day {day.day}</span>
              {day.badge && <span className={styles["itinerary__badge"]}>{day.badge}</span>}
            </div>
            <div className={styles["itinerary__content"]}>
              <h4 className={styles["itinerary__title"]}>{day.title}</h4>
              <p className={styles["itinerary__description"]}>{day.description}</p>
              {day.image && (
                <img src={day.image} alt={day.title} className={styles["itinerary__image"]} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewItinerary;

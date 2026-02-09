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
        {itinerary.map((day, index) => {
          // Combine images for display logic
          const images = day.images && day.images.length > 0
            ? day.images
            : day.image ? [day.image] : [];

          const hasImages = images.length > 0;
          const isEven = index % 2 === 0; // Zig-zag pattern

          return (
            <div key={index} className={styles["itinerary__item"]}>
              <div className={styles["itinerary__day"]}>
                <span className={styles["itinerary__day-number"]}>Day {day.day}</span>
                {day.badge && <span className={styles["itinerary__badge"]}>{day.badge}</span>}
              </div>

              <div className={`${styles["itinerary__content"]} ${isEven ? styles["itinerary__content--even"] : styles["itinerary__content--odd"]}`}>
                <div className={styles["itinerary__text-content"]}>
                  <h4 className={styles["itinerary__title"]}>{day.title}</h4>
                  <p className={styles["itinerary__description"]}>{day.description}</p>
                </div>

                {hasImages && (
                  <div className={styles["itinerary__media"]}>
                    {images.length >= 3 ? (
                      <div className={styles["itinerary__grid"]}>
                        <div className={styles["itinerary__grid-main"]}>
                          <img src={images[0]} alt={day.title} />
                        </div>
                        <div className={styles["itinerary__grid-side"]}>
                          <img src={images[1]} alt="" />
                          <img src={images[2]} alt="" />
                        </div>
                      </div>
                    ) : (
                      images.map((img, i) => (
                        <img key={i} src={img} alt={`${day.title} ${i + 1}`} className={styles["itinerary__image"]} />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewItinerary;

import type { HeroData } from '../../../../types/project';
import type { SectionStyle } from '../../../../types/common';
import styles from "./styles.module.scss";

interface PreviewHeroProps {
  hero: HeroData;
  sectionStyle?: SectionStyle;
}

const PreviewHero = ({ hero, sectionStyle }: PreviewHeroProps): JSX.Element => {
  const heroStyle = {
    color: sectionStyle?.textColor,
    backgroundColor: sectionStyle?.backgroundColor
  };

  return (
    <section className={styles["hero"]} style={heroStyle}>
      {hero.image && (
        <div className={styles["hero__image-wrapper"]}>
          <img src={hero.image} alt={hero.title} className={styles["hero__image"]} />
          {hero.badge && (
            <span className={styles["hero__badge"]} style={
              heroStyle
            }>{hero.badge}</span>
          )}
        </div>
      )}
      <div className={styles["hero__content"]}>
        <h2 className={styles["hero__title"]}>{hero.title}</h2>
        {hero.location && (
          <div className={styles["hero__location"]}>
            <span className="material-symbols-outlined">location_on</span>
            <span>{hero.location}</span>
          </div>
        )}
        {hero.stats && (
          <div className={styles["hero__stats"]}>
            {hero.stats.duration && (
              <div className={styles["hero__stat"]}>
                <span className="material-symbols-outlined">schedule</span>
                <span>{hero.stats.duration}</span>
              </div>
            )}
            {hero.stats.altitude && (
              <div className={styles["hero__stat"]}>
                <span className="material-symbols-outlined">terrain</span>
                <span>{hero.stats.altitude}</span>
              </div>
            )}
            {hero.stats.difficulty && (
              <div className={styles["hero__stat"]}>
                <span className="material-symbols-outlined">fitness_center</span>
                <span>{hero.stats.difficulty}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewHero;

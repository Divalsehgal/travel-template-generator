import type { Inclusion } from '../../../../types/project';
import type { SectionStyle } from '../../../../types/common';
import styles from "./styles.module.scss";

interface PreviewInclusionsProps {
  inclusions: Inclusion[];
  sectionStyle?: SectionStyle;
}

const PreviewInclusions = ({ inclusions, sectionStyle }: PreviewInclusionsProps): JSX.Element | null => {
  if (!inclusions || inclusions.length === 0) return null;

  const inclusionsStyle = {
    color: sectionStyle?.textColor,
    backgroundColor: sectionStyle?.backgroundColor
  };

  return (
    <section className={styles["inclusions"]} style={inclusionsStyle}>
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

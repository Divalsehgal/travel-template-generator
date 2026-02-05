import type { CarryItem } from '../../../../types/project';
import type { SectionStyle } from '../../../../types/common';
import styles from "./styles.module.scss";

interface PreviewCarryProps {
  thingsToCarry: CarryItem[];
  sectionStyle?: SectionStyle;
}

const PreviewCarry = ({ thingsToCarry, sectionStyle }: PreviewCarryProps): JSX.Element | null => {
  if (!thingsToCarry || thingsToCarry.length === 0) return null;

  const carryStyle = {
    color: sectionStyle?.textColor,
    backgroundColor: sectionStyle?.backgroundColor
  };

  return (
    <section className={styles["carry"]} style={carryStyle}>
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

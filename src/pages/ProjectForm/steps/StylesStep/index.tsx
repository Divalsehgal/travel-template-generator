import { Controller, Control } from "react-hook-form";
import styles from "./styles.module.scss";

interface StylesStepProps {
  control: Control<any>;
}

// Helper to generate section styles from colors
const generateSectionStyles = (primary: string, text: string): any => ({
  header: { textColor: text, backgroundColor: primary },
  hero: { textColor: primary, backgroundColor: "#ffffff" },
  overview: { textColor: primary, backgroundColor: "#ffffff" },
  leader: { textColor: text, backgroundColor: primary },
  itinerary: { textColor: primary, backgroundColor: "#ffffff" },
  inclusions: { textColor: primary, backgroundColor: "#f0f5fa" },
  thingsToCarry: { textColor: primary, backgroundColor: "#ffffff" },
  faqs: { textColor: primary, backgroundColor: "#f0f5fa" },
  footer: { textColor: text, backgroundColor: primary }
});


const StylesStep = ({ control }: StylesStepProps): JSX.Element => {
  return (
    <div className={styles["styles-step"]}>
      <h2 className={styles["styles-step__title"]}>
        <span className="material-symbols-outlined">palette</span>
        Color Theme
      </h2>
      <p className={styles["styles-step__description"]}>
        Select a color theme for your brochure.
      </p>

      <Controller
        name="styles"
        control={control}
        render={({ field }) => (
          <div className={styles["styles-step__themes"]}>
            <div className={styles["styles-step__picker"]}>
              <label>Primary Color</label>
              <input
                type="color"
                value={field.value?.header?.backgroundColor || "#1b3022"}
                onChange={(e) => {
                  const newPrimary = e.target.value;
                  const currentText = field.value?.header?.textColor || "#ffffff";
                  field.onChange(generateSectionStyles(newPrimary, currentText));
                }}
              />
            </div>

            <div className={styles["styles-step__picker"]}>
              <label>Text Color</label>
              <input
                type="color"
                value={field.value?.header?.textColor || "#ffffff"}
                onChange={(e) => {
                  const currentPrimary = field.value?.header?.backgroundColor || "#1b3022";
                  const newText = e.target.value;
                  field.onChange(generateSectionStyles(currentPrimary, newText));
                }}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default StylesStep;

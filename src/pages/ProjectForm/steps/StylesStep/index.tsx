import { Controller, Control } from "react-hook-form";
import styles from "./styles.module.scss";

interface StylesStepProps {
  control: Control<any>;
}

// Full layout color themes - AA accessible
const THEMES = [
  {
    name: "Forest",
    preview: { dark: "#1b3022", light: "#f5f9f6" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#1b3022" },
      hero: { textColor: "#1b3022", backgroundColor: "#ffffff" },
      overview: { textColor: "#1b3022", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#1b3022" },
      itinerary: { textColor: "#1b3022", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#1b3022", backgroundColor: "#f5f9f6" },
      thingsToCarry: { textColor: "#1b3022", backgroundColor: "#ffffff" },
      faqs: { textColor: "#1b3022", backgroundColor: "#f5f9f6" },
      footer: { textColor: "#ffffff", backgroundColor: "#1b3022" }
    }
  },
  {
    name: "Ocean",
    preview: { dark: "#1e3a5f", light: "#f0f5fa" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#1e3a5f" },
      hero: { textColor: "#1e3a5f", backgroundColor: "#ffffff" },
      overview: { textColor: "#1e3a5f", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#1e3a5f" },
      itinerary: { textColor: "#1e3a5f", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#1e3a5f", backgroundColor: "#f0f5fa" },
      thingsToCarry: { textColor: "#1e3a5f", backgroundColor: "#ffffff" },
      faqs: { textColor: "#1e3a5f", backgroundColor: "#f0f5fa" },
      footer: { textColor: "#ffffff", backgroundColor: "#1e3a5f" }
    }
  },
  {
    name: "Charcoal",
    preview: { dark: "#2d2d2d", light: "#f5f5f5" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#2d2d2d" },
      hero: { textColor: "#2d2d2d", backgroundColor: "#ffffff" },
      overview: { textColor: "#2d2d2d", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#2d2d2d" },
      itinerary: { textColor: "#2d2d2d", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#2d2d2d", backgroundColor: "#f5f5f5" },
      thingsToCarry: { textColor: "#2d2d2d", backgroundColor: "#ffffff" },
      faqs: { textColor: "#2d2d2d", backgroundColor: "#f5f5f5" },
      footer: { textColor: "#ffffff", backgroundColor: "#2d2d2d" }
    }
  },
  {
    name: "Purple",
    preview: { dark: "#4a2c6a", light: "#f8f5fb" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#4a2c6a" },
      hero: { textColor: "#4a2c6a", backgroundColor: "#ffffff" },
      overview: { textColor: "#4a2c6a", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#4a2c6a" },
      itinerary: { textColor: "#4a2c6a", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#4a2c6a", backgroundColor: "#f8f5fb" },
      thingsToCarry: { textColor: "#4a2c6a", backgroundColor: "#ffffff" },
      faqs: { textColor: "#4a2c6a", backgroundColor: "#f8f5fb" },
      footer: { textColor: "#ffffff", backgroundColor: "#4a2c6a" }
    }
  },
  {
    name: "Burgundy",
    preview: { dark: "#6b2737", light: "#fdf5f7" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#6b2737" },
      hero: { textColor: "#6b2737", backgroundColor: "#ffffff" },
      overview: { textColor: "#6b2737", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#6b2737" },
      itinerary: { textColor: "#6b2737", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#6b2737", backgroundColor: "#fdf5f7" },
      thingsToCarry: { textColor: "#6b2737", backgroundColor: "#ffffff" },
      faqs: { textColor: "#6b2737", backgroundColor: "#fdf5f7" },
      footer: { textColor: "#ffffff", backgroundColor: "#6b2737" }
    }
  },
  {
    name: "Teal",
    preview: { dark: "#0d5c63", light: "#f0fafb" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#0d5c63" },
      hero: { textColor: "#0d5c63", backgroundColor: "#ffffff" },
      overview: { textColor: "#0d5c63", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#0d5c63" },
      itinerary: { textColor: "#0d5c63", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#0d5c63", backgroundColor: "#f0fafb" },
      thingsToCarry: { textColor: "#0d5c63", backgroundColor: "#ffffff" },
      faqs: { textColor: "#0d5c63", backgroundColor: "#f0fafb" },
      footer: { textColor: "#ffffff", backgroundColor: "#0d5c63" }
    }
  }
];

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
            {THEMES.map((theme, index) => {
              const isSelected = field.value?.header?.backgroundColor === theme.preview.dark;
              return (
                <button
                  key={index}
                  type="button"
                  className={`${styles["styles-step__theme"]} ${isSelected ? styles["styles-step__theme--selected"] : ""}`}
                  onClick={() => field.onChange(theme.styles)}
                >
                  <div className={styles["styles-step__theme-preview"]}>
                    <span style={{ backgroundColor: theme.preview.dark }}></span>
                    <span style={{ backgroundColor: theme.preview.light }}></span>
                  </div>
                  <span className={styles["styles-step__theme-name"]}>{theme.name}</span>
                </button>
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default StylesStep;

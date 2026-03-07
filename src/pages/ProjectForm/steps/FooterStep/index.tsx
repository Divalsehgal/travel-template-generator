import { useFormContext } from "react-hook-form";
import { FormGroup, FormInput, FormTextarea } from "../../../../components/FormComponents";
import type { Project } from "../../../../types/project";
import styles from "./styles.module.scss";

const FooterStep = () => {
  const { register } = useFormContext<Project>();
  return (
    <div className={styles["step"]}>
      <h2 className={styles["step__title"]}>
        <span className="material-symbols-outlined">description</span>
        Footer
      </h2>
      <FormInput
        label="Footer Title"
        register={register("footer.title")}
      />
      <FormTextarea
        label="Footer Description"
        register={register("footer.description")}
        rows={3}
      />
      <FormInput
        label="Copyright"
        register={register("footer.copyright")}
        placeholder="e.g., © 2024 Company Name"
      />

      <FormGroup label="High-Impact Template Footer Extras">
        <FormInput
          label="Limited Slots Text"
          register={register("footer.slotsText")}
          placeholder="e.g. LIMITED SLOTS"
        />
        <FormInput
          label="Secure Spot Text"
          register={register("footer.spotText")}
          placeholder="e.g. Secure Your Spot Now"
        />
      </FormGroup>
    </div>
  );
};

export default FooterStep;

import { Controller } from "react-hook-form";
import { FormInput } from "../../../../components/FormComponents";
import ImageUpload from "../../../../components/ImageUpload";
import styles from "./styles.module.scss";

const BrandStep = ({ register, errors, control }) => {
  return (
    <div className={styles["step"]}>
      <h2 className={styles["step__title"]}>
        <span className="material-symbols-outlined">branding_watermark</span>
        Brand Information
      </h2>
      
      <Controller
        name="brand.logo"
        control={control}
        render={({ field }) => (
          <ImageUpload
            value={field.value}
            onChange={field.onChange}
            label="Company Logo"
          />
        )}
      />
      
      <FormInput
        label="Brand Title *"
        register={register("brand.title", { required: "Brand title is required" })}
        error={errors.brand?.title}
      />
      <FormInput
        label="Brand Subtitle"
        register={register("brand.subtitle")}
        error={errors.brand?.subtitle}
      />
    </div>
  );
};

export default BrandStep;

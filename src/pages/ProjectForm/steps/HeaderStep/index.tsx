import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { FormRow, FormInput } from "../../../../components/FormComponents";
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import * as tokens from "@shiv-bhoomi/design-tokens";
import type { Project } from "../../../../types/project";
import styles from "./styles.module.scss";

const PLATFORM_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other" },
];

const HeaderStep = () => {
  const { register, control, formState: { errors } } = useFormContext<Project>();

  const { fields: headerLinksFields, append: appendHeaderLink, remove: removeHeaderLink } = useFieldArray({
    control,
    name: "header.links"
  });
  return (
    <div className={styles["step"]}>
      <h2 className={styles["step__title"]}>
        <span className="material-symbols-outlined">business</span>
        Company Header
      </h2>
      <FormRow>
        <FormInput
          label="Phone Number"
          register={register("header.phone")}
          error={errors.header?.phone}
        />
        <FormInput
          label="Email"
          type="email"
          register={register("header.email")}
          error={errors.header?.email}
        />
      </FormRow>
      <FormInput
        label="Website"
        register={register("header.website")}
        error={errors.header?.website}
      />
      <FormInput
        label="Expedition Badge (e.g. Premium Expedition 2024)"
        register={register("header.subBadge")}
        error={errors.header?.subBadge}
      />

      <div className={styles["social-links"]}>
        <div className={styles["social-links__header"]}>
          <h3 className={styles["social-links__title"]}>
            <span className="material-symbols-outlined">share</span>
            Social Media & Links
          </h3>
          <button
            type="button"
            onClick={() => appendHeaderLink({ platform: "instagram", url: "", alias: "" })}
            className={styles["social-links__add"]}
          >
            <span className="material-symbols-outlined">add</span>
            Add Link
          </button>
        </div>

        {headerLinksFields.map((field, index) => (
          <div key={field.id} className={styles["social-links__item"]}>
            <div className={styles["social-links__item-row"]}>
              <Controller
                control={control}
                name={`header.links.${index}.platform`}
                render={({ field }) => (
                  <FormControl
                    className={styles["social-links__platform"]}
                    size="small"
                    error={!!errors.header?.links?.[index]?.platform}
                  >
                    <InputLabel id={`platform-label-${index}`}>Platform</InputLabel>
                    <Select
                      {...field}
                      labelId={`platform-label-${index}`}
                      label="Platform"
                      defaultValue={field.value || ""} // Ensure default value is an empty string if undefined to avoid controlled/uncontrolled warning
                    >
                      {PLATFORM_OPTIONS.map(opt => (
                        <MenuItem key={opt.value} value={opt.value} sx={{ fontFamily: tokens.FontFamilyBody }}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.header?.links?.[index]?.platform && (
                      <FormHelperText>{errors.header.links[index].platform.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <FormInput
                label="URL"
                register={register(`header.links.${index}.url`)}
                placeholder="https://..."
                className={styles["social-links__url"]}
              />
              <FormInput
                label="Alias (Optional)"
                register={register(`header.links.${index}.alias`)}
                placeholder="@handle or text"
                className={styles["social-links__alias"]}
              />
              <button
                type="button"
                onClick={() => removeHeaderLink(index)}
                className={styles["social-links__remove"]}
                title="Remove Link"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderStep;

import React from "react";
import { FormRow, FormInput, FormSelect } from "../../../../components/FormComponents";
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

interface HeaderStepProps {
  register: any;
  errors: any;
  headerLinksFields: any[];
  appendHeaderLink: (data: any) => void;
  removeHeaderLink: (index: number) => void;
  [key: string]: any;
}

const HeaderStep = ({
  register,
  errors,
  headerLinksFields = [],
  appendHeaderLink,
  removeHeaderLink
}: HeaderStepProps) => {
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
              <FormSelect
                label="Platform"
                options={PLATFORM_OPTIONS}
                register={register(`header.links.${index}.platform`)}
                className={styles["social-links__platform"]}
                error={errors.header?.links?.[index]?.platform}
                placeholder="Select Platform"
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

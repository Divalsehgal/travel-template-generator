import React from "react";
import { Controller } from "react-hook-form";
import { FormGroup, FormRow, FormInput, FormTextarea } from "../../../../components/FormComponents";
import ImageUpload from "../../../../components/ImageUpload";
import styles from "./styles.module.scss";

const TrekDetailsStep = ({ register, control, errors }) => {
  return (
    <div className={styles["step"]}>
      <h2 className={styles["step__title"]}>
        <span className="material-symbols-outlined">landscape</span>
        Trek Details
      </h2>

      <FormGroup label="Hero Section">
        <FormInput
          label="Badge"
          register={register("hero.badge")}
          placeholder="e.g., Featured Trek"
        />
        <FormInput
          label="Trek Title *"
          register={register("hero.title", { required: "Trek title is required" })}
          error={errors.hero?.title}
        />
        <FormInput
          label="Location"
          register={register("hero.location")}
          placeholder="e.g., Himachal Pradesh, India"
        />
      </FormGroup>

      <FormGroup label="Hero Images (Up to 3)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Controller
            name="hero.images.0"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  // Sync first image with legacy field
                  control._formValues.hero.image = val;
                }}
                label="Main Image"
                aspect={16 / 9}
              />
            )}
          />
          <Controller
            name="hero.images.1"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                label="Side Image Top"
              />
            )}
          />
          <Controller
            name="hero.images.2"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                label="Side Image Bottom"
              />
            )}
          />
        </div>
      </FormGroup>

      <FormGroup label="Trek Stats">
        <FormRow>
          <FormInput
            label="Duration"
            register={register("hero.stats.duration")}
            placeholder="e.g., 5 Days"
          />
          <FormInput
            label="Altitude"
            register={register("hero.stats.altitude")}
            placeholder="e.g., 4000m"
          />
          <FormInput
            label="Difficulty"
            register={register("hero.stats.difficulty")}
            placeholder="e.g., Moderate"
          />
        </FormRow>
      </FormGroup>

      <FormGroup label="Overview">
        <FormTextarea
          label="Overview Text"
          register={register("overview.text")}
          rows={4}
        />
      </FormGroup>

      <FormGroup label="Trek Leader">
        <div className={styles["step__checkbox-wrapper"]} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            id="leader-visible"
            {...register("leader.visible")}
            style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
          />
          <label htmlFor="leader-visible" style={{ cursor: 'pointer', fontWeight: 500 }}>
            Show Trek Leader Section
          </label>
        </div>
        <FormRow>
          <FormInput
            label="Leader Name"
            register={register("leader.name")}
          />
          <FormInput
            label="Role"
            register={register("leader.role")}
            placeholder="e.g., Lead Guide"
          />
        </FormRow>
        <Controller
          name="leader.image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              label="Upload Leader Image"
              aspect={1}
            />
          )}
        />
      </FormGroup>
    </div>
  );
};

export default TrekDetailsStep;

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormGroup, FormRow, FormInput, FormTextarea } from "../../../../components/FormComponents";
import ImageUpload from "../../../../components/ImageUpload";
import type { Project } from "../../../../types/project";
import styles from "./styles.module.scss";

const TrekDetailsStep = () => {
  const { register, control, formState: { errors } } = useFormContext<Project>();
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
        <Controller
          name="hero.image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              label="Upload Hero Image"
            />
          )}
        />
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

      <FormGroup label="High-Impact Template Extras">
        <FormTextarea
          label="Expedition Overview (A4 Footer)"
          register={register("hero.expeditionOverview")}
          placeholder="e.g. 5 Days | Elite Access | All-Inclusive"
        />
        <FormInput
          label="Booking Text/URL"
          register={register("hero.bookingText")}
          placeholder="e.g. Visit ADVENTURE.CH/EXTREME for Full Details & Booking"
        />
      </FormGroup>

      <FormGroup label="Overview">
        <FormTextarea
          label="Overview Text"
          register={register("overview.text")}
          rows={4}
        />
      </FormGroup>

      <FormGroup label="Trek Leader">
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
            />
          )}
        />
      </FormGroup>
    </div>
  );
};

export default TrekDetailsStep;

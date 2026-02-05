import React from "react";
import { Controller } from "react-hook-form";
import { FormRow, FormInput, FormTextarea } from "../../../../components/FormComponents";
import ImageUpload from "../../../../components/ImageUpload";
import styles from "./styles.module.scss";

const ItineraryStep = ({ register, control, itineraryFields, appendItinerary, removeItinerary }) => {
  return (
    <div className={styles["step"]}>
      <h2 className={styles["step__title"]}>
        <span className="material-symbols-outlined">map</span>
        Itinerary
      </h2>
      {itineraryFields.map((field, index) => (
        <div key={field.id} className={styles["step__array-item"]}>
          <div className={styles["step__array-header"]}>
            <h3>Day {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeItinerary(index)}
              className={styles["step__button--delete"]}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
          <FormRow>
            <FormInput
              label="Day Number"
              type="number"
              register={register(`itinerary.${index}.day`)}
            />
            <FormInput
              label="Badge"
              register={register(`itinerary.${index}.badge`)}
              placeholder="e.g., Basecamp"
            />
          </FormRow>
          <FormInput
            label="Title"
            register={register(`itinerary.${index}.title`)}
          />
          <FormTextarea
            label="Description"
            register={register(`itinerary.${index}.description`)}
            rows={3}
          />
          <Controller
            name={`itinerary.${index}.image`}
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                label="Upload Day Image"
              />
            )}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendItinerary({ day: itineraryFields.length + 1, badge: "", title: "", description: "", image: "" })}
        className={styles["step__button--add"]}
      >
        <span className="material-symbols-outlined">add</span>
        Add Day
      </button>
    </div>
  );
};

export default ItineraryStep;

import { useFormContext, useFieldArray } from "react-hook-form";
import { FormGroup, FormRow, FormInput, FormTextarea, FormSelect } from "../../../../components/FormComponents";
import type { Project } from "../../../../types/project";
import styles from "./styles.module.scss";

// Predefined icon options for inclusions
const INCLUSION_ICON_OPTIONS = [
  { value: "hotel", label: "🏨 Hotel / Accommodation" },
  { value: "restaurant", label: "🍽️ Restaurant / Meals" },
  { value: "directions_bus", label: "🚌 Bus / Transport" },
  { value: "hiking", label: "🥾 Hiking / Trekking" },
  { value: "local_hospital", label: "🏥 Medical / First Aid" },
  { value: "photo_camera", label: "📷 Photography" },
  { value: "camping", label: "⛺ Camping" },
  { value: "water_drop", label: "💧 Water / Hydration" },
  { value: "groups", label: "👥 Guide / Team" },
  { value: "shield", label: "🛡️ Insurance / Safety" },
  { value: "confirmation_number", label: "🎫 Permits / Tickets" },
  { value: "backpack", label: "🎒 Backpack / Gear" },
  { value: "local_cafe", label: "☕ Refreshments" },
  { value: "wifi", label: "📶 WiFi / Connectivity" },
  { value: "electric_bolt", label: "⚡ Electricity / Charging" },
  { value: "outdoor_grill", label: "🔥 Outdoor Kitchen / Bonfire" },
  { value: "landscape", label: "🏔️ Sightseeing" },
  { value: "celebration", label: "🎉 Activities / Events" },
  { value: "clean_hands", label: "🧼 Hygiene / Sanitation" }
];

// Predefined icon options for things to carry
const THINGS_TO_CARRY_ICON_OPTIONS = [
  { value: "backpack", label: "🎒 Backpack" },
  { value: "checkroom", label: "🧥 Jacket / Warm Clothes" },
  { value: "hiking", label: "🥾 Trekking Shoes" },
  { value: "water_drop", label: "💧 Water Bottle" },
  { value: "medical_services", label: "🩹 First Aid Kit" },
  { value: "flashlight", label: "🔦 Flashlight / Torch" },
  { value: "sunglasses", label: "🕶️ Sunglasses" },
  { value: "spa", label: "🧴 Sunscreen" },
  { value: "umbrella", label: "☂️ Rain Gear / Umbrella" },
  { value: "power", label: "🔋 Power Bank" },
  { value: "photo_camera", label: "📷 Camera" },
  { value: "badge", label: "🪪 ID Proof" },
  { value: "medication", label: "💊 Personal Medication" },
  { value: "local_dining", label: "🍫 Snacks / Energy Bars" },
  { value: "dry_cleaning", label: "👕 Extra Clothes" },
  { value: "night_shelter", label: "🛏️ Sleeping Bag" },
  { value: "headphones", label: "🎧 Headphones" },
  { value: "style", label: "🧢 Cap / Hat" },
  { value: "do_not_touch", label: "🧤 Gloves" }
];

const InclusionsStep = () => {
  const { register, control } = useFormContext<Project>();

  const { fields: inclusionsFields, append: appendInclusion, remove: removeInclusion } = useFieldArray({
    control,
    name: "inclusions"
  });

  const { fields: thingsToCarryFields, append: appendThingToCarry, remove: removeThingToCarry } = useFieldArray({
    control,
    name: "thingsToCarry"
  });
  return (
    <div className={styles["step"]}>
      <h2 className={styles["step__title"]}>
        <span className="material-symbols-outlined">checklist</span>
        Inclusions & Things to Carry
      </h2>

      <FormGroup label="Inclusions">
        {inclusionsFields.map((field, index) => (
          <div key={field.id} className={styles["step__array-item"]}>
            <div className={styles["step__array-header"]}>
              <h4>Inclusion {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeInclusion(index)}
                className={styles["step__button--delete"]}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
            <FormRow>
              <FormSelect
                label="Icon"
                register={register(`inclusions.${index}.icon`)}
                options={INCLUSION_ICON_OPTIONS}
                error={undefined}
                placeholder="Select an icon..."
              />
              <FormInput
                label="Title"
                register={register(`inclusions.${index}.title`)}
              />
            </FormRow>
            <FormTextarea
              label="Description"
              register={register(`inclusions.${index}.description`)}
              rows={2}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendInclusion({ icon: "", title: "", description: "" })}
          className={styles["step__button--add"]}
        >
          <span className="material-symbols-outlined">add</span>
          Add Inclusion
        </button>
      </FormGroup>

      <FormGroup label="Things to Carry">
        {thingsToCarryFields.map((field, index) => (
          <div key={field.id} className={styles["step__array-item"]}>
            <div className={styles["step__array-header"]}>
              <h4>Item {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeThingToCarry(index)}
                className={styles["step__button--delete"]}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
            <FormRow>
              <FormSelect
                label="Icon"
                register={register(`thingsToCarry.${index}.icon`)}
                options={THINGS_TO_CARRY_ICON_OPTIONS}
                error={undefined}
                placeholder="Select an icon..."
              />
              <FormInput
                label="Label"
                register={register(`thingsToCarry.${index}.label`)}
              />
            </FormRow>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendThingToCarry({ icon: "", label: "" })}
          className={styles["step__button--add"]}
        >
          <span className="material-symbols-outlined">add</span>
          Add Item
        </button>
      </FormGroup>
    </div>
  );
};

export default InclusionsStep;

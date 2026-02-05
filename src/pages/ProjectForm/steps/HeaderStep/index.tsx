import React from "react";
import { FormRow, FormInput } from "../../../../components/FormComponents";
import styles from "./styles.module.scss";

const HeaderStep = ({ register, errors }) => {
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
    </div>
  );
};

export default HeaderStep;

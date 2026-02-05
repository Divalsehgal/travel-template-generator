import React from "react";
import { FormInput, FormTextarea } from "../../../../components/FormComponents";
import styles from "./styles.module.scss";

const FooterStep = ({ register }) => {
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
    </div>
  );
};

export default FooterStep;

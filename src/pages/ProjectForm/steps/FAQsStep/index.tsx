import React from "react";
import { FormInput, FormTextarea } from "../../../../components/FormComponents";
import styles from "./styles.module.scss";

const FAQsStep = ({ register, faqFields, appendFaq, removeFaq }) => {
  return (
    <div className={styles["step"]}>
      <h2 className={styles["step__title"]}>
        <span className="material-symbols-outlined">help</span>
        FAQs
      </h2>
      {faqFields.map((field, index) => (
        <div key={field.id} className={styles["step__array-item"]}>
          <div className={styles["step__array-header"]}>
            <h4>FAQ {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeFaq(index)}
              className={styles["step__button--delete"]}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
          <FormInput
            label="Question"
            register={register(`faqs.${index}.question`)}
          />
          <FormTextarea
            label="Answer"
            register={register(`faqs.${index}.answer`)}
            rows={3}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendFaq({ question: "", answer: "" })}
        className={styles["step__button--add"]}
      >
        <span className="material-symbols-outlined">add</span>
        Add FAQ
      </button>
    </div>
  );
};

export default FAQsStep;

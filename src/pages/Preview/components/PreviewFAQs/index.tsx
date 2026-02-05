import type { FAQ } from '../../../../types/project';
import type { SectionStyle } from '../../../../types/common';
import styles from "./styles.module.scss";

interface PreviewFAQsProps {
  faqs: FAQ[];
  sectionStyle?: SectionStyle;
}

const PreviewFAQs = ({ faqs, sectionStyle }: PreviewFAQsProps): JSX.Element | null => {
  if (!faqs || faqs.length === 0) return null;

  const faqsStyle = {
    color: sectionStyle?.textColor,
    backgroundColor: sectionStyle?.backgroundColor
  };

  return (
    <section className={styles["faqs"]} style={faqsStyle}>
      <h3 className={styles["section__title"]}>Frequently Asked Questions</h3>
      <div className={styles["faqs__list"]}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles["faqs__item"]}>
            <h4 className={styles["faqs__question"]}>{faq.question}</h4>
            <p className={styles["faqs__answer"]}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewFAQs;

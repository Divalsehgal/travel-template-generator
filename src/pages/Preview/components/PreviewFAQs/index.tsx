import React from 'react';
import type { FAQ } from '../../../../types/project';
import styles from "./styles.module.scss";

interface PreviewFAQsProps {
    faqs: FAQ[];
}

const PreviewFAQs = ({ faqs }: PreviewFAQsProps): React.JSX.Element | null => {
    if (!faqs || faqs.length === 0) return null;

    return (
        <section className={styles["faqs"]}>
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

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { Project } from "../../../../types/project";
import styles from "./styles.module.scss";
import ImageUpload from "../../../../components/ImageUpload";

const TypeStep = () => {
    const { register, watch, control } = useFormContext<Project>();
    const projectType = watch("projectType");
    const shortTemplate = watch("shortTemplate");

    const templates = [
        { id: 'modern', name: 'Modern', icon: 'view_quilt' },
        { id: 'wavy', name: 'Wavy', icon: 'waves' },
        { id: 'techno', name: 'Techno', icon: 'grid_view' },
    ];

    return (
        <div className={styles["type-step"]}>
            <h2 className={styles["type-step__title"]}>
                <span className="material-symbols-outlined">dashboard_customize</span>
                Select Template Type
            </h2>
            <p className={styles["type-step__description"]}>
                Choose the layout that best fits your itinerary.
            </p>

            <div className={styles["type-step__options"]}>
                <label className={`${styles["type-step__option"]} ${projectType === 'long' ? styles["type-step__option--active"] : ""}`}>
                    <input
                        type="radio"
                        value="long"
                        {...register("projectType")}
                        className={styles["type-step__radio"]}
                    />
                    <div className={styles["type-step__card"]}>
                        <span className={`material-symbols-outlined ${styles["type-step__icon"]}`}>description</span>
                        <div className={styles["type-step__info"]}>
                            <h3>Long Brochure</h3>
                            <p>Multi-page detailed itinerary with full-width images and extensive descriptions.</p>
                        </div>
                    </div>
                </label>

                <label className={`${styles["type-step__option"]} ${projectType === 'short' ? styles["type-step__option--active"] : ""}`}>
                    <input
                        type="radio"
                        value="short"
                        {...register("projectType")}
                        className={styles["type-step__radio"]}
                    />
                    <div className={styles["type-step__card"]}>
                        <span className={`material-symbols-outlined ${styles["type-step__icon"]}`}>file_copy</span>
                        <div className={styles["type-step__info"]}>
                            <h3>Short One-Page</h3>
                            <p>Compact A4 layout perfect for single-day or summary itineraries. Fits everything on one page.</p>
                        </div>
                    </div>
                </label>
            </div>

            {projectType === 'short' && (
                <div className={styles["type-step__sub-section"]}>
                    <h3 className={styles["type-step__sub-title"]}>Choose layout style</h3>
                    <div className={styles["type-step__templates"]}>
                        {templates.map((tpl) => (
                            <label key={tpl.id} className={`${styles["type-step__template"]} ${shortTemplate === tpl.id ? styles["type-step__template--active"] : ""}`}>
                                <input
                                    type="radio"
                                    value={tpl.id}
                                    {...register("shortTemplate")}
                                    className={styles["type-step__radio"]}
                                />
                                <div className={styles["type-step__template-card"]}>
                                    <div className={styles["type-step__template-preview"]}>
                                        <span className="material-symbols-outlined">{tpl.icon}</span>
                                    </div>
                                    <div className={styles["type-step__template-check"]}>
                                        <span className="material-symbols-outlined">check</span>
                                    </div>
                                    <h4>{tpl.name}</h4>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <Controller
                            name="shortBgImage"
                            control={control}
                            render={({ field }) => (
                                <ImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Template Background Image (Optional)"
                                />
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypeStep;

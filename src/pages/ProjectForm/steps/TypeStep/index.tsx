import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { Project } from "../../../../types/project";
import styles from "./styles.module.scss";
import ImageUpload from "../../../../components/ImageUpload";
import { FormInput } from "../../../../components/FormComponents";

const SHORT_TEMPLATES: { value: NonNullable<Project['shortTemplate']>; label: string; icon: string }[] = [
    { value: "modern", label: "Modern A4 Brochure", icon: "view_quilt" },
    { value: "wavy", label: "Wavy Adventure", icon: "waves" },
    { value: "techno", label: "Techno Industrial", icon: "grid_view" },
];

const TypeStep = () => {
    const { register, watch, control, setValue } = useFormContext<Project>();
    const projectType = watch("projectType");
    const shortTemplate = watch("shortTemplate");

    useEffect(() => {
        if (projectType === "short" && !shortTemplate) {
            setValue("shortTemplate", "modern", { shouldDirty: false });
        }
    }, [projectType, shortTemplate, setValue]);

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
                    <input type="hidden" {...register("shortTemplate")} />
                    <h3 className={styles["type-step__sub-title"]}>Short layout</h3>
                    <div className={styles["type-step__templates"]}>
                        {SHORT_TEMPLATES.map((template) => (
                            <button
                                type="button"
                                key={template.value}
                                className={`${styles["type-step__template"]} ${shortTemplate === template.value ? styles["type-step__template--active"] : ""}`}
                                onClick={() => setValue("shortTemplate", template.value, { shouldDirty: true })}
                            >
                                <div className={styles["type-step__template-card"]}>
                                    <div className={styles["type-step__template-preview"]}>
                                        <span className="material-symbols-outlined">{template.icon}</span>
                                    </div>
                                    {shortTemplate === template.value && (
                                        <div className={styles["type-step__template-check"]}>
                                            <span className="material-symbols-outlined">check</span>
                                        </div>
                                    )}
                                    <h4>{template.label}</h4>
                                </div>
                            </button>
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

                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 className={styles["type-step__sub-title"]}>Template Settings (Optional)</h3>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '-0.5rem' }}>Customize hardcoded labels for your short templates.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <FormInput
                                label="Time Label (e.g. TIME)"
                                register={register("shortTemplateSettings.timeLabel")}
                            />
                            <FormInput
                                label="Team Label (e.g. TEAM)"
                                register={register("shortTemplateSettings.teamLabel")}
                            />
                            <FormInput
                                label="Altitude Level Label (e.g. LVL)"
                                register={register("shortTemplateSettings.altitudeLabel")}
                            />
                            <FormInput
                                label="Specs Label (e.g. SPECS)"
                                register={register("shortTemplateSettings.specsLabel")}
                            />
                            <FormInput
                                label="Book Slot Text (e.g. Book Your Slot)"
                                register={register("shortTemplateSettings.bookSlotText")}
                            />
                            <FormInput
                                label="Website Label (e.g. Web)"
                                register={register("shortTemplateSettings.websiteText")}
                            />
                            <FormInput
                                label="FAQ Section Label (e.g. FAQ)"
                                register={register("shortTemplateSettings.faqLabel")}
                            />
                            <FormInput
                                label="Leader Label (e.g. LEADER)"
                                register={register("shortTemplateSettings.leaderLabel")}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypeStep;

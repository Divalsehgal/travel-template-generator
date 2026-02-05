import React, { useEffect, useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProjects } from "../../hooks/useFirestoreProjects";
import HeaderStep from "./steps/HeaderStep";
import BrandStep from "./steps/BrandStep";
import TrekDetailsStep from "./steps/TrekDetailsStep";
import ItineraryStep from "./steps/ItineraryStep";
import InclusionsStep from "./steps/InclusionsStep";
import FAQsStep from "./steps/FAQsStep";
import FooterStep from "./steps/FooterStep";
import StylesStep from "./steps/StylesStep";
import styles from "./styles.module.scss";

const STEPS = [
  { id: 0, title: "Header", icon: "business" },
  { id: 1, title: "Brand", icon: "branding_watermark" },
  { id: 2, title: "Trek Details", icon: "landscape" },
  { id: 3, title: "Itinerary", icon: "map" },
  { id: 4, title: "Inclusions", icon: "checklist" },
  { id: 5, title: "FAQs", icon: "help" },
  { id: 6, title: "Footer", icon: "description" },
  { id: 7, title: "Styles", icon: "palette" }
];

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, fetchProject, addProject, updateProject } = useProjects();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);

  const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      header: { phone: "", email: "", website: "" },
      brand: { title: "", subtitle: "", logo: "" },
      hero: {
        badge: "",
        title: "",
        location: "",
        image: "",
        stats: { duration: "", altitude: "", difficulty: "" }
      },
      overview: { text: "" },
      leader: { name: "", role: "", image: "" },
      itinerary: [],
      inclusions: [],
      thingsToCarry: [],
      faqs: [],
      footer: { title: "", description: "", copyright: "" },
      styles: {
        header: { textColor: "#ffffff", backgroundColor: "#1b3022" },
        hero: { textColor: "#1b3022", backgroundColor: "#ffffff" },
        overview: { textColor: "#1b3022", backgroundColor: "#ffffff" },
        leader: { textColor: "#ffffff", backgroundColor: "#1b3022" },
        itinerary: { textColor: "#1b3022", backgroundColor: "#ffffff" },
        inclusions: { textColor: "#1b3022", backgroundColor: "#f5f9f6" },
        thingsToCarry: { textColor: "#1b3022", backgroundColor: "#ffffff" },
        faqs: { textColor: "#1b3022", backgroundColor: "#f5f9f6" },
        footer: { textColor: "#ffffff", backgroundColor: "#1b3022" }
      }
    }
  });

  const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({
    control,
    name: "itinerary"
  });

  const { fields: inclusionsFields, append: appendInclusion, remove: removeInclusion } = useFieldArray({
    control,
    name: "inclusions"
  });

  const { fields: thingsToCarryFields, append: appendThingToCarry, remove: removeThingToCarry } = useFieldArray({
    control,
    name: "thingsToCarry"
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control,
    name: "faqs"
  });

  const formData = watch();

  // Load existing project data
  useEffect(() => {
    const loadProject = async () => {
      if (id) {
        setIsLoading(true);
        try {
          // First try local state
          let project = getProject(id);
          
          // If not found locally, fetch from Firestore
          if (!project && fetchProject) {
            project = await fetchProject(id);
          }
          
          if (project) {
            reset(project);
          }
        } catch (error) {
          console.error('Error loading project:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadProject();
  }, [id, getProject, fetchProject, reset]);

  // Auto-save with debounce
  useEffect(() => {
    if (!id || isLoading) return;

    const timer = setTimeout(async () => {
      try {
        setIsSaving(true);
        await updateProject(id, formData);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save error:', error);
      } finally {
        setIsSaving(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData, id, updateProject, isLoading]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateProject(id, data);
      } else {
        await addProject(data);
      }
      navigate("/projects");
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={styles["form"]}>
      <div className={styles["form__header"]}>
        <Link to="/projects" className={styles["form__back"]}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Projects
        </Link>
        <h1 className={styles["form__title"]}>
          {id ? "Edit Project" : "Create New Project"}
        </h1>
        {id && lastSaved && (
          <p className={styles["form__save-status"]}>
            {isSaving ? "Saving..." : `Last saved: ${lastSaved.toLocaleTimeString()}`}
          </p>
        )}
      </div>

      <div className={styles["form__progress"]}>
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`${styles["form__progress-step"]} ${
              index === currentStep ? styles["form__progress-step--active"] : ""
            } ${index < currentStep ? styles["form__progress-step--completed"] : ""}`}
            onClick={() => setCurrentStep(index)}
          >
            <span className="material-symbols-outlined">{step.icon}</span>
            <span className={styles["form__progress-label"]}>{step.title}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form__content"]}>
        <div className={styles["form__steps"]}>
          {currentStep === 0 && (
            <HeaderStep register={register} errors={errors} />
          )}

          {currentStep === 1 && (
            <BrandStep register={register} control={control} errors={errors} />
          )}

          {currentStep === 2 && (
            <TrekDetailsStep register={register} control={control} errors={errors} />
          )}

          {currentStep === 3 && (
            <ItineraryStep
              register={register}
              control={control}
              itineraryFields={itineraryFields}
              appendItinerary={appendItinerary}
              removeItinerary={removeItinerary}
            />
          )}

          {currentStep === 4 && (
            <InclusionsStep
              register={register}
              inclusionsFields={inclusionsFields}
              appendInclusion={appendInclusion}
              removeInclusion={removeInclusion}
              thingsToCarryFields={thingsToCarryFields}
              appendThingToCarry={appendThingToCarry}
              removeThingToCarry={removeThingToCarry}
            />
          )}

          {currentStep === 5 && (
            <FAQsStep
              register={register}
              faqFields={faqFields}
              appendFaq={appendFaq}
              removeFaq={removeFaq}
            />
          )}

          {currentStep === 6 && (
            <FooterStep register={register} />
          )}

          {currentStep === 7 && (
            <StylesStep control={control} />
          )}
        </div>

        <div className={styles["form__actions"]}>
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={styles["form__button--secondary"]}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Previous
          </button>
          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className={styles["form__button--primary"]}
            >
              Next
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : (
            <button type="submit" className={styles["form__button--primary"]}>
              <span className="material-symbols-outlined">save</span>
              {id ? "Update Project" : "Create Project"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

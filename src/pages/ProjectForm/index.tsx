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
import styles from "./styles.module.scss";

const STEPS = [
  { id: 0, title: "Header", icon: "business" },
  { id: 1, title: "Brand", icon: "branding_watermark" },
  { id: 2, title: "Trek Details", icon: "landscape" },
  { id: 3, title: "Itinerary", icon: "map" },
  { id: 4, title: "Inclusions", icon: "checklist" },
  { id: 5, title: "FAQs", icon: "help" },
  { id: 6, title: "Footer", icon: "description" }
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
      header: { phone: "", email: "", website: "", links: [] },
      brand: { title: "", subtitle: "", logo: "" },
      hero: {
        badge: "",
        title: "",
        location: "",
        image: "",
        images: [],
        stats: { duration: "", altitude: "", difficulty: "" }
      },
      overview: { text: "" },
      leader: { name: "", role: "", image: "" },
      itinerary: [],
      inclusions: [],
      thingsToCarry: [],
      faqs: [],
      footer: { title: "", description: "", copyright: "" }
    }
  });

  const { fields: headerLinksFields, append: appendHeaderLink, remove: removeHeaderLink } = useFieldArray({
    control,
    name: "header.links"
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
            // Normalize hero images
            if (!project.hero.images) project.hero.images = [];
            if (project.hero.image && !project.hero.images[0]) project.hero.images[0] = project.hero.image;

            // Migrate legacy social links
            if (!project.header.links) {
              project.header.links = [];
              if (project.header.instagram) {
                project.header.links.push({
                  platform: 'instagram',
                  url: project.header.instagram,
                  alias: project.header.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@')
                });
              }
              if (project.header.facebook) {
                project.header.links.push({
                  platform: 'facebook',
                  url: project.header.facebook,
                  alias: 'Facebook'
                });
              }
            }

            // Normalize itinerary images
            if (project.itinerary) {
              project.itinerary.forEach((day: any) => {
                if (!day.images) day.images = [];
                if (day.image && !day.images[0]) day.images[0] = day.image;
              });
            }
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
            className={`${styles["form__progress-step"]} ${index === currentStep ? styles["form__progress-step--active"] : ""
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
            <HeaderStep
              register={register}
              control={control}
              errors={errors}
              headerLinksFields={headerLinksFields}
              appendHeaderLink={appendHeaderLink}
              removeHeaderLink={removeHeaderLink}
            />
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

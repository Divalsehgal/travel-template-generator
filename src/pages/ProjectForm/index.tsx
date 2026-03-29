import React, { useEffect, useState, useCallback } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProjects } from "../../hooks/useFirestoreProjects";
import { useProjectLoader } from "../../hooks/useProjectLoader";
import { useProjectAutoSave } from "../../hooks/useProjectAutoSave";
import type { Project } from "../../types/project";
import HeaderStep from "./steps/HeaderStep";
import BrandStep from "./steps/BrandStep";
import TrekDetailsStep from "./steps/TrekDetailsStep";
import ItineraryStep from "./steps/ItineraryStep";
import InclusionsStep from "./steps/InclusionsStep";
import FAQsStep from "./steps/FAQsStep";
import FooterStep from "./steps/FooterStep";
import TypeStep from "./steps/TypeStep";
import ConfirmModal from "../../components/ConfirmModal";
import PreviewModal from "../../components/PreviewModal";
import styles from "./styles.module.scss";

const STEPS = [
  { id: 0, title: "Template", icon: "dashboard_customize" },
  { id: 1, title: "Header", icon: "business" },
  { id: 2, title: "Brand", icon: "branding_watermark" },
  { id: 3, title: "Trek Details", icon: "landscape" },
  { id: 4, title: "Itinerary", icon: "map" },
  { id: 5, title: "Inclusions", icon: "checklist" },
  { id: 6, title: "FAQs", icon: "help" },
  { id: 7, title: "Footer", icon: "description" }
];

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProject, updateProject } = useProjects();
  const [currentStep, setCurrentStep] = useState(0);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [manualSaving, setManualSaving] = useState(false);

  const { project, isLoading: isProjectLoading } = useProjectLoader(id);

  const methods = useForm<Project>({
    defaultValues: {
      projectType: "long",
      header: { phone: "", email: "", website: "", subBadge: "", links: [] },
      brand: { title: "", subtitle: "", logo: "" },
      hero: {
        badge: "",
        title: "",
        location: "",
        image: "",
        images: [],
        stats: { duration: "", altitude: "", difficulty: "" },
        expeditionOverview: "",
        bookingText: ""
      },
      overview: { text: "" },
      leader: { name: "", role: "", image: "" },
      itinerary: [],
      inclusions: [],
      thingsToCarry: [],
      faqs: [],
      footer: { title: "", description: "", copyright: "", slotsText: "", spotText: "" },
      shortBgImage: "",
      shortThemeVariables: {}
    } as any
  });

  const { handleSubmit, watch, reset, formState: { isDirty } } = methods;
  const formData = watch();

  const { isSaving, lastSaved } = useProjectAutoSave(id, formData, !isProjectLoading);

  useEffect(() => {
    if (project) {
      reset(project);
    }
  }, [project, reset]);

  const performSave = async (data: Project): Promise<Project | null> => {
    try {
      setManualSaving(true);
      if (id) {
        await updateProject(id, data);
        reset(data);
        return { ...data, id };
      } else {
        const newProject = await addProject(data);
        // Change URL to edit mode so further saves work correctly
        navigate(`/projects/${newProject.id}/edit`, { replace: true });
        reset(newProject);
        return newProject;
      }
    } catch (error) {
      console.error('Error saving project:', error);
      return null;
    } finally {
      setManualSaving(false);
    }
  };

  const onSubmit = async (data: Project) => {
    const saved = await performSave(data);
    if (saved) {
      navigate("/projects");
    }
  };

  const handleManualSave = async () => {
    const data = watch();
    await performSave(data);
  };

  const guardNavigation = (targetStep: number) => {
    if (isDirty) {
      setPendingStep(targetStep);
      setShowConfirmModal(true);
    } else {
      setCurrentStep(targetStep);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      guardNavigation(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      guardNavigation(currentStep - 1);
    }
  };

  const handleConfirmSave = async () => {
    const data = watch();
    await performSave(data);

    if (pendingStep !== null) {
      setCurrentStep(pendingStep);
    }
    setShowConfirmModal(false);
    setPendingStep(null);
  };

  const handleDiscardChanges = () => {
    if (project) {
      reset(project);
    }
    if (pendingStep !== null) {
      setCurrentStep(pendingStep);
    }
    setShowConfirmModal(false);
    setPendingStep(null);
  };

  const handleCancelNavigation = () => {
    setShowConfirmModal(false);
    setPendingStep(null);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {id && lastSaved && (
            <p className={styles["form__save-status"]}>
              {isSaving ? "Saving..." : `Last saved: ${lastSaved.toLocaleTimeString()}`}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className={styles["form__button--secondary"]}
            style={{ padding: '0.5rem 1rem', minWidth: 'auto', gap: '0.25rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>visibility</span>
            Preview
          </button>
        </div>
      </div>

      <div className={styles["form__progress"]}>
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`${styles["form__progress-step"]} ${index === currentStep ? styles["form__progress-step--active"] : ""
              } ${index < currentStep ? styles["form__progress-step--completed"] : ""}`}
            onClick={() => guardNavigation(index)}
          >
            <span className="material-symbols-outlined">{step.icon}</span>
            <span className={styles["form__progress-label"]}>{step.title}</span>
          </div>
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form__content"]}>
          <div className={styles["form__steps"]}>
            {currentStep === 0 && <TypeStep />}
            {currentStep === 1 && <HeaderStep />}
            {currentStep === 2 && <BrandStep />}
            {currentStep === 3 && <TrekDetailsStep />}
            {currentStep === 4 && <ItineraryStep />}
            {currentStep === 5 && <InclusionsStep />}
            {currentStep === 6 && <FAQsStep />}
            {currentStep === 7 && <FooterStep />}
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
              <div className={styles["form__actions_right"]}>
                <button
                  type="button"
                  onClick={handleManualSave}
                  className={`${styles["form__button--secondary"]} ${styles["form__button--save"]}`}
                  disabled={!isDirty || manualSaving || isSaving}
                >
                  <span className="material-symbols-outlined">{manualSaving ? 'sync' : 'save'}</span>
                  {manualSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className={styles["form__button--primary"]}
                >
                  Next
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            ) : (
              <button type="submit" className={styles["form__button--primary"]}>
                <span className="material-symbols-outlined">save</span>
                {id ? "Update Project" : "Create Project"}
              </button>
            )}
          </div>
        </form>
      </FormProvider>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Unsaved Changes"
        message="You have unsaved changes. Would you like to save them before moving to the next step?"
        onConfirm={handleConfirmSave}
        onDiscard={handleDiscardChanges}
        onCancel={handleCancelNavigation}
      />

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        project={formData as Project}
      />
    </div>
  );
};

export default ProjectForm;

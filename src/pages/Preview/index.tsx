import { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useProjects } from "../../hooks/useFirestoreProjects";
import PreviewHeader from "./components/PreviewHeader/index.tsx";
import PreviewHero from "./components/PreviewHero/index.tsx";
import PreviewLeader from "./components/PreviewLeader/index.tsx";
import PreviewItinerary from "./components/PreviewItinerary/index.tsx";
import PreviewInclusions from "./components/PreviewInclusions/index.tsx";
import PreviewCarry from "./components/PreviewCarry/index.tsx";
import PreviewFAQs from "./components/PreviewFAQs/index.tsx";
import PreviewFooter from "./components/PreviewFooter/index.tsx";
import styles from "./styles.module.scss";
import type { Project } from "../../types/project";
import type { SectionStyles } from "../../types/common";

// Full layout color themes - AA accessible
const THEMES = [
  {
    name: "Forest",
    preview: { dark: "#1b3022", light: "#f5f9f6" },
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
  },
  {
    name: "Ocean",
    preview: { dark: "#1e3a5f", light: "#f0f5fa" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#1e3a5f" },
      hero: { textColor: "#1e3a5f", backgroundColor: "#ffffff" },
      overview: { textColor: "#1e3a5f", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#1e3a5f" },
      itinerary: { textColor: "#1e3a5f", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#1e3a5f", backgroundColor: "#f0f5fa" },
      thingsToCarry: { textColor: "#1e3a5f", backgroundColor: "#ffffff" },
      faqs: { textColor: "#1e3a5f", backgroundColor: "#f0f5fa" },
      footer: { textColor: "#ffffff", backgroundColor: "#1e3a5f" }
    }
  },
  {
    name: "Charcoal",
    preview: { dark: "#2d2d2d", light: "#f5f5f5" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#2d2d2d" },
      hero: { textColor: "#2d2d2d", backgroundColor: "#ffffff" },
      overview: { textColor: "#2d2d2d", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#2d2d2d" },
      itinerary: { textColor: "#2d2d2d", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#2d2d2d", backgroundColor: "#f5f5f5" },
      thingsToCarry: { textColor: "#2d2d2d", backgroundColor: "#ffffff" },
      faqs: { textColor: "#2d2d2d", backgroundColor: "#f5f5f5" },
      footer: { textColor: "#ffffff", backgroundColor: "#2d2d2d" }
    }
  },
  {
    name: "Purple",
    preview: { dark: "#4a2c6a", light: "#f8f5fb" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#4a2c6a" },
      hero: { textColor: "#4a2c6a", backgroundColor: "#ffffff" },
      overview: { textColor: "#4a2c6a", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#4a2c6a" },
      itinerary: { textColor: "#4a2c6a", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#4a2c6a", backgroundColor: "#f8f5fb" },
      thingsToCarry: { textColor: "#4a2c6a", backgroundColor: "#ffffff" },
      faqs: { textColor: "#4a2c6a", backgroundColor: "#f8f5fb" },
      footer: { textColor: "#ffffff", backgroundColor: "#4a2c6a" }
    }
  },
  {
    name: "Burgundy",
    preview: { dark: "#6b2737", light: "#fdf5f7" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#6b2737" },
      hero: { textColor: "#6b2737", backgroundColor: "#ffffff" },
      overview: { textColor: "#6b2737", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#6b2737" },
      itinerary: { textColor: "#6b2737", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#6b2737", backgroundColor: "#fdf5f7" },
      thingsToCarry: { textColor: "#6b2737", backgroundColor: "#ffffff" },
      faqs: { textColor: "#6b2737", backgroundColor: "#fdf5f7" },
      footer: { textColor: "#ffffff", backgroundColor: "#6b2737" }
    }
  },
  {
    name: "Teal",
    preview: { dark: "#0d5c63", light: "#f0fafb" },
    styles: {
      header: { textColor: "#ffffff", backgroundColor: "#0d5c63" },
      hero: { textColor: "#0d5c63", backgroundColor: "#ffffff" },
      overview: { textColor: "#0d5c63", backgroundColor: "#ffffff" },
      leader: { textColor: "#ffffff", backgroundColor: "#0d5c63" },
      itinerary: { textColor: "#0d5c63", backgroundColor: "#ffffff" },
      inclusions: { textColor: "#0d5c63", backgroundColor: "#f0fafb" },
      thingsToCarry: { textColor: "#0d5c63", backgroundColor: "#ffffff" },
      faqs: { textColor: "#0d5c63", backgroundColor: "#f0fafb" },
      footer: { textColor: "#ffffff", backgroundColor: "#0d5c63" }
    }
  }
];

const Preview = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { getProject, fetchProject, updateProject, loading } = useProjects();
  const printRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStyles, setCurrentStyles] = useState<SectionStyles | undefined>(undefined);

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // First try local state
        let projectData = getProject(id);
        
        // If not found locally, fetch from Firestore
        if (!projectData && fetchProject) {
          projectData = await fetchProject(id) || undefined;
        }
        
        setProject(projectData);
        setCurrentStyles(projectData?.styles);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProject();
  }, [id, getProject, fetchProject]);

  const handleThemeChange = async (newStyles: SectionStyles) => {
    setCurrentStyles(newStyles);
    if (project && id && updateProject) {
      try {
        await updateProject(id, { ...project, styles: newStyles });
        setProject({ ...project, styles: newStyles });
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${project?.hero?.title || 'Trek'}_Brochure`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `
  });

  if (isLoading || loading) {
    return (
      <div className={styles["preview"]}>
        <div className={styles["preview__loading"]}>
          <span className="material-symbols-outlined">progress_activity</span>
          <p>Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles["preview"]}>
        <div className={styles["preview__error"]}>
          <h1>Project not found</h1>
          <Link to="/projects" className={styles["preview__button"]}>
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  console.log('Rendering preview for project:', project);

  return (
    <div className={styles["preview"]}>
      <div className={styles["preview__toolbar"]}>
        <Link to="/projects" className={styles["preview__button--secondary"]}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Projects
        </Link>
        
        {/* Theme Selector */}
        <div className={styles["preview__themes"]}>
          {THEMES.map((theme, index) => {
            const isSelected = currentStyles?.header?.backgroundColor === theme.preview.dark;
            return (
              <button
                key={index}
                type="button"
                className={`${styles["preview__theme"]} ${isSelected ? styles["preview__theme--selected"] : ""}`}
                onClick={() => handleThemeChange(theme.styles)}
                title={theme.name}
              >
                <span style={{ backgroundColor: theme.preview.dark }}></span>
                <span style={{ backgroundColor: theme.preview.light }}></span>
              </button>
            );
          })}
        </div>

        <div className={styles["preview__toolbar-actions"]}>
          <Link
            to={`/projects/${id}/edit`}
            className={styles["preview__button--secondary"]}
          >
            <span className="material-symbols-outlined">edit</span>
            Edit
          </Link>
          <button onClick={handlePrint} className={styles["preview__button--primary"]}>
            <span className="material-symbols-outlined">download</span>
            Export PDF
          </button>
        </div>
      </div>

      <div ref={printRef} className={styles["preview__content"]}>
        {/* Header */}
        <PreviewHeader header={project.header} brand={project.brand} sectionStyle={currentStyles?.header} />
        <PreviewHero hero={project.hero} sectionStyle={currentStyles?.hero} />

        {project.overview?.text && (
          <section 
            className={styles["section"]}
            style={{
              color: currentStyles?.overview?.textColor,
              backgroundColor: currentStyles?.overview?.backgroundColor
            }}
          >
            <h3 className={styles["section__title"]}>Overview</h3>
            <p className={styles["section__text"]}>{project.overview.text}</p>
          </section>
        )}

        <PreviewLeader leader={project.leader} sectionStyle={currentStyles?.leader} />
        <PreviewItinerary itinerary={project.itinerary} sectionStyle={currentStyles?.itinerary} />
        <PreviewInclusions inclusions={project.inclusions} sectionStyle={currentStyles?.inclusions} />
        <PreviewCarry thingsToCarry={project.thingsToCarry} sectionStyle={currentStyles?.thingsToCarry} />
        <PreviewFAQs faqs={project.faqs} sectionStyle={currentStyles?.faqs} />
        <PreviewFooter footer={project.footer} sectionStyle={currentStyles?.footer} />

    </div>
    </div>
  );
};

export default Preview;

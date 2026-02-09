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
// Helper to generate section styles from colors
const generateSectionStyles = (primary: string, text: string): SectionStyles => ({
  header: { textColor: text, backgroundColor: primary },
  hero: { textColor: primary, backgroundColor: "#ffffff" },
  overview: { textColor: primary, backgroundColor: "#ffffff" },
  leader: { textColor: text, backgroundColor: primary },
  itinerary: { textColor: primary, backgroundColor: "#ffffff" },
  inclusions: { textColor: primary, backgroundColor: "#f0f5fa" },
  thingsToCarry: { textColor: primary, backgroundColor: "#ffffff" },
  faqs: { textColor: primary, backgroundColor: "#f0f5fa" },
  footer: { textColor: text, backgroundColor: primary }
});

const Preview = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { getProject, fetchProject, updateProject, loading } = useProjects();
  const printRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStyles, setCurrentStyles] = useState<SectionStyles | undefined>(undefined);
  const [primaryColor, setPrimaryColor] = useState("#1b3022");
  const [textColor, setTextColor] = useState("#ffffff");

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

  const handleColorChange = async (type: 'primary' | 'text', value: string) => {
    const newPrimary = type === 'primary' ? value : primaryColor;
    const newText = type === 'text' ? value : textColor;

    if (type === 'primary') setPrimaryColor(value);
    if (type === 'text') setTextColor(value);

    const newStyles = generateSectionStyles(newPrimary, newText);
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
        </Link>

        {/* Theme Selector */}
        <div className={styles["preview__themes"]}>
          <div className={styles["preview__color-picker"]}>
            <label>Primary</label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => handleColorChange('primary', e.target.value)}
            />
          </div>
          <div className={styles["preview__color-picker"]}>
            <label>Text</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => handleColorChange('text', e.target.value)}
            />
          </div>
        </div>

        <div className={styles["preview__toolbar-actions"]}>
          <Link
            to={`/projects/${id}/edit`}
            className={styles["preview__button--secondary"]}
          >
            <span className="material-symbols-outlined">edit</span>
          </Link>
          <button onClick={handlePrint} className={styles["preview__button--primary"]}>
            <span className="material-symbols-outlined">download</span>
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

        {project.leader?.visible && (
          <PreviewLeader leader={project.leader} sectionStyle={currentStyles?.leader} />
        )}
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

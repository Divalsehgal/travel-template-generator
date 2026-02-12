import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useProjects } from "../../hooks/useFirestoreProjects";
import PreviewHeader from "./components/PreviewHeader";
import PreviewHero from "./components/PreviewHero";
import PreviewLeader from "./components/PreviewLeader";
import PreviewItinerary from "./components/PreviewItinerary";
import PreviewInclusions from "./components/PreviewInclusions";
import PreviewCarry from "./components/PreviewCarry";
import PreviewFAQs from "./components/PreviewFAQs";
import PreviewFooter from "./components/PreviewFooter";
import styles from "./styles.module.scss";
import type { Project } from "../../types/project";
import type { SectionStyles } from "../../types/common";

const Preview = (): React.JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const { getProject, fetchProject, loading } = useProjects();
    const printRef = useRef<HTMLDivElement>(null);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

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
            } catch (error) {
                console.error('Error loading project:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProject();
    }, [id, getProject, fetchProject]);

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
                <PreviewHeader header={project.header} brand={project.brand} />
                <PreviewHero hero={project.hero} />

                {project.overview?.text && (
                    <section className={styles["section"]}>
                        <h3 className={styles["section__title"]}>Overview</h3>
                        <p className={styles["section__text"]}>{project.overview.text}</p>
                    </section>
                )}

                {project.leader?.visible && (
                    <PreviewLeader leader={project.leader} />
                )}
                <PreviewItinerary itinerary={project.itinerary} />
                <PreviewInclusions inclusions={project.inclusions} />
                <PreviewCarry thingsToCarry={project.thingsToCarry} />
                <PreviewFAQs faqs={project.faqs} />
                <PreviewFooter footer={project.footer} />
            </div>
        </div>
    );
};

export default Preview;

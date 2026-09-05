import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useProjectLoader } from "../../hooks/useProjectLoader";
import PreviewLong from "./components/PreviewLong";
import PreviewShort from "./components/Short";
import ThemeEditor from "./components/ThemeEditor";
import { useProjects } from "../../hooks/useFirestoreProjects";
import styles from "./styles.module.scss";
import type { Project } from "../../types/project";

const Preview = (): React.JSX.Element => {
    const { updateProject } = useProjects();
    const { id } = useParams<{ id: string }>();
    const { project, isLoading, refresh } = useProjectLoader(id);
    const printRef = useRef<HTMLDivElement>(null);

    const handleSaveTheme = async (updates: Partial<Project>) => {
        if (!id) return;
        try {
            await updateProject(id, updates);
            await refresh();
        } catch (error) {
            console.error("Failed to save theme updates:", error);
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

    if (isLoading) {
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
                {project.projectType === 'short' ? (
                    <PreviewShort project={project} />
                ) : (
                    <PreviewLong project={project} />
                )}
            </div>

            <ThemeEditor project={project} onSave={handleSaveTheme} />
        </div>
    );
};

export default Preview;

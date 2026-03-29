import React from "react";
import type { Project } from "../../../../types/project";
import PreviewModern from "./Modern";
import PreviewWavy from "./Wavy";
import PreviewTechno from "./Techno";

interface PreviewShortProps {
    project: Project;
}

/**
 * PreviewShort — template router
 *
 * Each `shortTemplate` value maps to a fully self-contained component.
 * Do NOT add template-specific styles to shared components or to another
 * template's SCSS — every template owns its own folder and styles.
 *
 * Adding a new template:
 *   1. Add tokens to design-tokens/token/template/<name>-token.json
 *   2. Create Short/<Name>/index.tsx  (component)
 *   3. Create Short/<Name>/styles.module.scss  (styles)
 *   4. Add a case below
 */
const PreviewShort = ({ project }: PreviewShortProps) => {
    const renderTemplate = () => {
        switch (project.shortTemplate) {
            case "wavy":
                return <PreviewWavy project={project} />;
            case "techno":
                return <PreviewTechno project={project} />;
            case "modern":
            default:
                return <PreviewModern project={project} />;
        }
    };

    return (
        <div 
            style={{ 
                backgroundColor: 'transparent',
                backgroundImage: project.shortBgImage ? `url(${project.shortBgImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100%',
                width: '100%',
                position: 'relative'
            }}
        >
            {renderTemplate()}
        </div>
    );
};

export default PreviewShort;

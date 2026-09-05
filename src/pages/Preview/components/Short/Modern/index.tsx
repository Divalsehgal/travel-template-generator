import styles from "./styles.module.scss";
import type { Project } from "../../../../../types/project";
import { RenderBlocks } from "../../../blocks/RenderBlocks";
import { ModernBlockRegistry, DEFAULT_MODERN_LAYOUT } from "../../../blocks/short";

interface PreviewShortProps {
    project: Project;
}

const PreviewShort = ({ project }: PreviewShortProps) => (
    <div className={styles["short-template"]}>
        <RenderBlocks project={project} layout={DEFAULT_MODERN_LAYOUT} registry={ModernBlockRegistry} />
    </div>
);

export default PreviewShort;

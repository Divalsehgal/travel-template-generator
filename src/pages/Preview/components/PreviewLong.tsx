import { RenderBlocks } from "../blocks/RenderBlocks";
import { LongBlockRegistry, DEFAULT_LONG_LAYOUT } from "../blocks/long";
import type { Project } from "../../../types/project";

interface PreviewLongProps {
    project: Project;
}

const PreviewLong = ({ project }: PreviewLongProps) => (
    <RenderBlocks project={project} layout={DEFAULT_LONG_LAYOUT} registry={LongBlockRegistry} />
);

export default PreviewLong;

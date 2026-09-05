import React from 'react';
import type { BlockRegistry } from './types';
import type { Project } from '../../../types/project';

interface RenderBlocksProps<TId extends string> {
    project: Project;
    layout: readonly TId[];
    registry: BlockRegistry<TId>;
}

/** Renders an ordered list of registry block ids for a template family. */
export function RenderBlocks<TId extends string>({ project, layout, registry }: RenderBlocksProps<TId>) {
    return (
        <>
            {layout.map((id) => (
                <React.Fragment key={id}>{registry[id](project)}</React.Fragment>
            ))}
        </>
    );
}

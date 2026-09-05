import type { ReactNode } from 'react';
import type { Project } from '../../../types/project';

export type BlockRenderer = (project: Project) => ReactNode;

export type LongBlockId =
    | 'header' | 'hero' | 'overview' | 'leader' | 'itinerary'
    | 'inclusions' | 'carry' | 'faqs' | 'footer';

export type ModernBlockId = 'header' | 'hero' | 'content-grid' | 'footer';

export type BlockRegistry<TId extends string> = Record<TId, BlockRenderer>;

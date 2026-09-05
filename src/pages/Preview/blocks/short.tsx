import { ShortHeader } from '../components/Short/Modern/components/Header';
import { ShortHero } from '../components/Short/Modern/components/Hero';
import { ShortItinerary } from '../components/Short/Modern/components/Itinerary';
import { ShortSidebar } from '../components/Short/Modern/components/Sidebar';
import { ShortFooter } from '../components/Short/Modern/components/Footer';
import modernStyles from '../components/Short/Modern/styles.module.scss';
import type { BlockRegistry, ModernBlockId } from './types';

export const ModernBlockRegistry: BlockRegistry<ModernBlockId> = {
    header: (p) => <ShortHeader project={p} styles={modernStyles} />,
    hero: (p) => <ShortHero project={p} styles={modernStyles} />,
    'content-grid': (p) => (
        <div className={modernStyles['main-grid']}>
            <ShortItinerary project={p} styles={modernStyles} />
            <ShortSidebar project={p} styles={modernStyles} />
        </div>
    ),
    footer: (p) => <ShortFooter project={p} styles={modernStyles} />,
};

export const DEFAULT_MODERN_LAYOUT: readonly ModernBlockId[] = [
    'header', 'hero', 'content-grid', 'footer',
];

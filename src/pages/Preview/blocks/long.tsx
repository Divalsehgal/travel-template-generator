import PreviewHeader from '../components/PreviewHeader';
import PreviewHero from '../components/PreviewHero';
import PreviewLeader from '../components/PreviewLeader';
import PreviewItinerary from '../components/PreviewItinerary';
import PreviewInclusions from '../components/PreviewInclusions';
import PreviewCarry from '../components/PreviewCarry';
import PreviewFAQs from '../components/PreviewFAQs';
import PreviewFooter from '../components/PreviewFooter';
import styles from '../styles.module.scss';
import type { BlockRegistry, LongBlockId } from './types';

export const LongBlockRegistry: BlockRegistry<LongBlockId> = {
    header: (p) => <PreviewHeader header={p.header} brand={p.brand} />,
    hero: (p) => <PreviewHero hero={p.hero} />,
    overview: (p) => p.overview?.text ? (
        <section className={styles['section']}>
            <h3 className={styles['section__title']}>Overview</h3>
            <p className={styles['section__text']}>{p.overview.text}</p>
        </section>
    ) : null,
    leader: (p) => p.leader?.visible ? <PreviewLeader leader={p.leader} /> : null,
    itinerary: (p) => <PreviewItinerary itinerary={p.itinerary} />,
    inclusions: (p) => <PreviewInclusions inclusions={p.inclusions} />,
    carry: (p) => <PreviewCarry thingsToCarry={p.thingsToCarry} />,
    faqs: (p) => <PreviewFAQs faqs={p.faqs} />,
    footer: (p) => <PreviewFooter footer={p.footer} />,
};

export const DEFAULT_LONG_LAYOUT: readonly LongBlockId[] = [
    'header', 'hero', 'overview', 'leader', 'itinerary',
    'inclusions', 'carry', 'faqs', 'footer',
];

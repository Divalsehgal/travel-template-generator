import type {
  BaseEntity,
  ContactInfo,
  BrandIdentity,
  MediaItem,
  ActivityStats,
  LabeledIconItem,
  TitledIconItem,
  QuestionAnswer,
  TitledContent,
  SectionStyles,
} from './common';

// ============================================================================
// Project Types
// ============================================================================

/**
 * Main project structure representing a trek/tour
 */
export interface Project extends BaseEntity {
  projectType: 'long' | 'short';
  /**
   * Which short-format layout to use.
   * Each value maps to a self-contained component in Short/<Name>/
   */
  shortTemplate?: 'modern' | 'wavy' | 'techno';
  /**
   * Optional full-bleed background image for short templates that support it
   */
  shortBgImage?: string;
  /**
   * Configurable text labels for short templates (e.g. TIME, TEAM, Book Your Slot)
   */
  shortTemplateSettings?: {
    timeLabel?: string;
    teamLabel?: string;
    altitudeLabel?: string;
    specsLabel?: string;
    bookSlotText?: string;
    websiteText?: string;
    faqLabel?: string;
    leaderLabel?: string;
    [key: string]: string | undefined;
  };
  /**
   * Custom theme variables (CSS overrides) for the short template
   */
  shortThemeVariables?: Record<string, string>;
  header: HeaderData;
  brand: BrandData;
  hero: HeroData;
  overview: OverviewData;
  leader: LeaderData;
  itinerary: ItineraryDay[];
  inclusions: Inclusion[];
  thingsToCarry: CarryItem[];
  faqs: FAQ[];
  footer: FooterData;
  styles?: SectionStyles;
}

/**
 * Partial project for updates (all fields optional except id)
 */
export type ProjectUpdate = Partial<Omit<Project, 'id' | 'createdAt'>> & Pick<Project, 'id'>;

/**
 * Project without system fields (for creation)
 */
export type ProjectCreate = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

// ============================================================================
// Header & Brand Types
// ============================================================================

/**
 * Header contact information
 */
export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'youtube' | 'whatsapp' | 'website' | 'other';

export interface HeaderLink {
  platform: SocialPlatform;
  url: string;
  alias?: string;
}

/**
 * Header contact information
 */
export interface HeaderData extends ContactInfo {
  links?: HeaderLink[];
  rawLabel?: string;
  subBadge?: string;
  coordinates?: string;
  instagram?: string; // @deprecated - migrate to links
  facebook?: string; // @deprecated - migrate to links
}

/**
 * Brand information
 */
export interface BrandData extends BrandIdentity { }

// ============================================================================
// Hero Section Types
// ============================================================================

/**
 * Hero section with media and stats
 */
export interface HeroData extends MediaItem {
  title: string;
  location?: string;
  locationUrl?: string;
  stats: ActivityStats;
  teamStat?: string;
  images?: string[];
  expeditionOverview?: string;
  bookingText?: string;
}

// ============================================================================
// Overview & Leader Types
// ============================================================================

/**
 * Trek overview content
 */
export interface OverviewData {
  text: string;
}

/**
 * Trek leader information
 */
export interface LeaderData {
  name: string;
  role: string;
  image?: string;
  visible?: boolean;
}

// ============================================================================
// Itinerary Types
// ============================================================================

/**
 * Single day in the itinerary
 */
export interface ItineraryDay extends MediaItem, TitledContent {
  day: string;
  images?: string[];
  distance?: string;
  time?: string;
}

// ============================================================================
// Inclusions & Items Types
// ============================================================================

/**
 * Included service/feature
 */
export interface Inclusion extends TitledIconItem { }

/**
 * Item to carry on trek
 */
export interface CarryItem extends LabeledIconItem { }

// ============================================================================
// FAQ Types
// ============================================================================

/**
 * Frequently asked question
 */
export interface FAQ extends QuestionAnswer { }

// ============================================================================
// Footer Types
// ============================================================================

/**
 * Footer content
 */
export interface FooterData extends TitledContent {
  copyright: string;
  slotsText?: string;
  spotText?: string;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if object is a valid Project
 */
export function isProject(obj: unknown): obj is Project {
  if (!obj || typeof obj !== 'object') return false;

  const project = obj as Project;
  return (
    typeof project.id === 'string' &&
    typeof project.createdAt === 'string' &&
    project.hero !== undefined &&
    project.brand !== undefined &&
    typeof project.hero === 'object' &&
    typeof project.brand === 'object'
  );
}

/**
 * Type guard for valid itinerary day
 */
export function isItineraryDay(obj: unknown): obj is ItineraryDay {
  if (!obj || typeof obj !== 'object') return false;

  const day = obj as ItineraryDay;
  return (
    typeof day.day === 'string' &&
    typeof day.title === 'string' &&
    typeof day.description === 'string'
  );
}

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
export interface HeaderData extends ContactInfo {
  instagram?: string;
  facebook?: string;
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
  stats: ActivityStats;
  images?: string[];
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

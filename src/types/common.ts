// Common base types used across the application

/**
 * Base entity with standard fields
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Contact information structure
 */
export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
}

/**
 * Brand identity structure
 */
export interface BrandIdentity {
  title: string;
  subtitle: string;
  logo?: string;
}

/**
 * Media item with image and optional badge
 */
export interface MediaItem {
  image?: string;
  badge?: string;
}

/**
 * Statistics for trek/activity
 */
export interface ActivityStats {
  duration?: string;
  altitude?: string;
  difficulty?: string;
}

/**
 * Icon-based item (used for UI elements)
 */
export interface IconItem {
  icon: string;
}

/**
 * Labeled icon item
 */
export interface LabeledIconItem extends IconItem {
  label: string;
}

/**
 * Titled icon item with description
 */
export interface TitledIconItem extends IconItem {
  title: string;
  description: string;
}

/**
 * Question and answer pair
 */
export interface QuestionAnswer {
  question: string;
  answer: string;
}

/**
 * Content with title and description
 */
export interface TitledContent {
  title: string;
  description: string;
}

/**
 * Timestamped content
 */
export interface TimestampedContent {
  createdAt: string;
  updatedAt?: string;
}

/**
 * Style configuration for a section
 */
export interface SectionStyle {
  textColor?: string;
  backgroundColor?: string;
}

/**
 * Styles configuration for all sections
 */
export interface SectionStyles {
  header?: SectionStyle;
  hero?: SectionStyle;
  overview?: SectionStyle;
  leader?: SectionStyle;
  itinerary?: SectionStyle;
  inclusions?: SectionStyle;
  thingsToCarry?: SectionStyle;
  faqs?: SectionStyle;
  footer?: SectionStyle;
}

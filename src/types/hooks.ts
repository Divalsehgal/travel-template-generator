// Hook return types and utilities

import type { Project, ProjectCreate, ItineraryDay } from './project';

// ============================================================================
// Project Hook Types
// ============================================================================

/**
 * An itinerary day with the per-template rendering fallbacks
 * (day-number label, resolved image list, metrics presence) already
 * resolved consistently, so templates don't each reimplement them.
 */
export interface NormalizedItineraryDay extends ItineraryDay {
  index: number;
  /** Zero-padded day label, e.g. "01" — falls back to position when `day` is unset. */
  dayLabel: string;
  images: string[];
  hasImages: boolean;
  hasMetrics: boolean;
}

/**
 * Named demo datasets available for seeding a new project, one per
 * project type / short template combination (see src/data/demos/).
 */
export type DemoVariant = 'long' | 'short-modern' | 'short-wavy' | 'short-techno';

/**
 * Return type for useProjects hook
 */
export interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: Error | null;
  getProject: (id: string) => Project | undefined;
  fetchProject?: (id: string) => Promise<Project | null>;
  addProject: (data: ProjectCreate) => Project | Promise<Project>;
  updateProject: (id: string, data: Partial<Project>) => void | Promise<void>;
  deleteProject: (id: string) => void | Promise<void>;
  resetToDefault: () => void | Promise<void>;
  createDefaultProject?: (variant?: DemoVariant) => Promise<Project>;
}

// ============================================================================
// Local Storage Hook Types
// ============================================================================

/**
 * Return type for useLocalStorage hook
 */
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  remove: () => void;
}

// ============================================================================
// Form Hook Types
// ============================================================================

/**
 * Form validation error
 */
export interface FormError {
  field: string;
  message: string;
}

/**
 * Form state
 */
export interface FormState<T> {
  values: T;
  errors: FormError[];
  touched: Set<keyof T>;
  isSubmitting: boolean;
  isValid: boolean;
}

/**
 * Form actions
 */
export interface FormActions<T> {
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setError: (field: keyof T, message: string) => void;
  clearError: (field: keyof T) => void;
  setTouched: (field: keyof T) => void;
  reset: () => void;
  submit: () => Promise<void>;
}

/**
 * Return type for useForm hook
 */
export interface UseFormReturn<T> {
  state: FormState<T>;
  actions: FormActions<T>;
  register: <K extends keyof T>(field: K) => {
    name: string;
    value: T[K];
    onChange: (value: T[K]) => void;
    onBlur: () => void;
    error?: string;
  };
}

// ============================================================================
// Async Hook Types
// ============================================================================

/**
 * Async state
 */
export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

/**
 * Return type for useAsync hook
 */
export interface UseAsyncReturn<T> {
  state: AsyncState<T>;
  execute: () => Promise<void>;
  reset: () => void;
}

// ============================================================================
// Hook Utilities
// ============================================================================

/**
 * Callback with no arguments
 */
export type VoidCallback = () => void;

/**
 * Callback with single argument
 */
export type Callback<T> = (arg: T) => void;

/**
 * Async callback
 */
export type AsyncCallback<T = void> = () => Promise<T>;

/**
 * Debounced function type
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

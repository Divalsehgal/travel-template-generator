// Component prop types following consistent patterns

import type { Project } from './project';

// ============================================================================
// Base Component Props
// ============================================================================

/**
 * Base props for components with children
 */
export interface WithChildren {
  children?: React.ReactNode;
}

/**
 * Base props for components with className
 */
export interface WithClassName {
  className?: string;
}

/**
 * Base props for styled components
 */
export interface StyledComponentProps extends WithChildren, WithClassName {}

// ============================================================================
// CRUD Operation Props
// ============================================================================

/**
 * Props for components handling item deletion
 */
export interface WithDelete<T = string> {
  onDelete: (id: T) => void;
}

/**
 * Props for components handling item creation
 */
export interface WithCreate<T> {
  onCreate: (data: T) => void;
}

/**
 * Props for components handling item updates
 */
export interface WithUpdate<T> {
  onUpdate: (id: string, data: Partial<T>) => void;
}

/**
 * Props for components with full CRUD operations
 */
export interface WithCRUD<T> extends WithCreate<T>, WithUpdate<T>, WithDelete {
  onRead?: (id: string) => T | undefined;
}

// ============================================================================
// Project Component Props
// ============================================================================

/**
 * Props for project card component
 */
export interface ProjectCardProps extends WithDelete {
  project: Project;
}

/**
 * Props for project list component
 */
export interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

// ============================================================================
// Form Component Props
// ============================================================================

/**
 * Base form input props
 */
export interface BaseInputProps extends WithClassName {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Text input props
 */
export interface TextInputProps extends BaseInputProps {
  type?: 'text' | 'email' | 'tel' | 'url' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * Textarea props
 */
export interface TextareaProps extends BaseInputProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * Select props
 */
export interface SelectProps extends BaseInputProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
}

// ============================================================================
// Preview Component Props
// ============================================================================

/**
 * Base preview component props
 */
export interface BasePreviewProps {
  data: unknown;
}

/**
 * Preview component props with print functionality
 */
export interface PreviewWithPrintProps extends BasePreviewProps {
  onPrint?: () => void;
}

// ============================================================================
// Modal Component Props
// ============================================================================

/**
 * Base modal props
 */
export interface ModalProps extends WithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * Confirmation modal props
 */
export interface ConfirmModalProps extends Omit<ModalProps, 'children'> {
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

// ============================================================================
// Loading & Error Props
// ============================================================================

/**
 * Props for loading state components
 */
export interface LoadingProps {
  isLoading: boolean;
  message?: string;
}

/**
 * Props for error display components
 */
export interface ErrorProps {
  error: Error | string | null;
  onRetry?: () => void;
}

/**
 * Props for async components with loading and error states
 */
export interface AsyncComponentProps extends LoadingProps, ErrorProps {
  children?: React.ReactNode;
}

// ============================================================================
// Type Utilities for Components
// ============================================================================

/**
 * Extract props from component type
 */
export type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * Make specific props required
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific props optional
 */
export type OptionalProps<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

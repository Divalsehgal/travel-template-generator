// Central type export - barrel file for all types

// Common types
export type * from './common';

// Project-specific types
export type * from './project';

// Component prop types
export type * from './components';

// Hook types
export type * from './hooks';

// Auth types
export type * from './auth';

// Re-export commonly used types for convenience
export type {
  Project,
  ProjectCreate,
  ProjectUpdate,
  HeaderData,
  BrandData,
  HeroData,
  ItineraryDay,
  Inclusion,
  CarryItem,
  FAQ,
} from './project';

export type {
  ProjectCardProps,
  TextInputProps,
  ModalProps,
  LoadingProps,
  ErrorProps,
} from './components';

export type {
  UseProjectsReturn,
  UseAutoSaveReturn,
  FormState,
  AsyncState,
} from './hooks';

export type {
  AuthContextType,
  UserProfile,
  FirebaseUser,
} from './auth';

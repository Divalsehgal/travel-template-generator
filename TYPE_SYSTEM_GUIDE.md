# TypeScript Type System Guide

## Overview

This project follows industry-standard TypeScript practices with a well-organized type system that promotes:
- **Type Reusability**: Common types are shared across the codebase
- **Type Safety**: Strict typing with comprehensive interfaces
- **Maintainability**: Clear type hierarchies and documentation
- **Scalability**: Modular type definitions that can grow with the project

## Type Organization

### Directory Structure

```
src/types/
├── index.ts          # Barrel file - central export point
├── common.ts         # Shared base types
├── project.ts        # Project-specific types
├── components.ts     # Component prop types
└── hooks.ts          # Hook return types
```

## Type Modules

### 1. Common Types (`common.ts`)

Base types used across the entire application:

#### Base Entities
```typescript
interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}
```

#### Reusable Structures
- `ContactInfo` - Phone, email, website
- `BrandIdentity` - Title and subtitle
- `MediaItem` - Image with optional badge
- `ActivityStats` - Duration, altitude, difficulty
- `IconItem` - Base for icon-based UI elements
- `LabeledIconItem` - Icon with label
- `TitledIconItem` - Icon with title and description
- `QuestionAnswer` - Q&A pairs
- `TitledContent` - Title and description pairs

### 2. Project Types (`project.ts`)

Domain-specific types using composition:

```typescript
// Main project interface extends BaseEntity
interface Project extends BaseEntity {
  header: HeaderData;
  brand: BrandData;
  hero: HeroData;
  // ... other fields
}

// HeaderData reuses ContactInfo
interface HeaderData extends ContactInfo {}

// HeroData combines MediaItem and adds specific fields
interface HeroData extends MediaItem {
  title: string;
  stats: ActivityStats;
}
```

#### Utility Types

```typescript
// For creating new projects (no id/timestamps)
type ProjectCreate = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

// For partial updates
type ProjectUpdate = Partial<Omit<Project, 'id' | 'createdAt'>> & Pick<Project, 'id'>;
```

#### Type Guards

```typescript
// Runtime type checking
function isProject(obj: unknown): obj is Project {
  if (!obj || typeof obj !== 'object') return false;
  const project = obj as Project;
  return (
    typeof project.id === 'string' &&
    typeof project.createdAt === 'string' &&
    // ... other checks
  );
}
```

### 3. Component Types (`components.ts`)

Consistent prop interfaces for React components:

#### Base Props

```typescript
// For components with children
interface WithChildren {
  children?: React.ReactNode;
}

// For styled components
interface StyledComponentProps extends WithChildren, WithClassName {}
```

#### CRUD Operation Props

```typescript
// Reusable patterns for data operations
interface WithDelete<T = string> {
  onDelete: (id: T) => void;
}

interface WithCreate<T> {
  onCreate: (data: T) => void;
}

interface WithUpdate<T> {
  onUpdate: (id: string, data: Partial<T>) => void;
}

// Full CRUD
interface WithCRUD<T> extends WithCreate<T>, WithUpdate<T>, WithDelete {}
```

#### Form Component Props

```typescript
// Base for all form inputs
interface BaseInputProps extends WithClassName {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// Specific input types extend base
interface TextInputProps extends BaseInputProps {
  type?: 'text' | 'email' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
```

### 4. Hook Types (`hooks.ts`)

Return types for custom hooks:

```typescript
// Clear contract for hook returns
interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: Error | null;
  getProject: (id: string) => Project | undefined;
  addProject: (data: ProjectCreate) => Project;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  resetToDefault: () => void;
}

// Generic hook with options
interface UseAutoSaveReturn {
  isSaving: boolean;
  lastSaved: Date | null;
  error: Error | null;
}

interface UseAutoSaveOptions {
  delay?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
```

## Type Reusability Patterns

### 1. Composition over Inheritance

✅ **DO**: Use `extends` to compose types
```typescript
interface Inclusion extends TitledIconItem {}
interface CarryItem extends LabeledIconItem {}
```

❌ **DON'T**: Duplicate type definitions
```typescript
// Bad
interface Inclusion {
  icon: string;
  title: string;
  description: string;
}
```

### 2. Utility Types

✅ **DO**: Use TypeScript utility types
```typescript
type ProjectCreate = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
type RequiredProject = Required<Project>;
type PartialProject = Partial<Project>;
```

### 3. Generic Types

✅ **DO**: Create reusable generic interfaces
```typescript
interface WithDelete<T = string> {
  onDelete: (id: T) => void;
}

// Use with different ID types
WithDelete<string>
WithDelete<number>
```

### 4. Type Guards

✅ **DO**: Provide runtime type validation
```typescript
function isProject(obj: unknown): obj is Project {
  // Runtime checks
  return typeof obj === 'object' && ...;
}

// Usage
if (isProject(data)) {
  // TypeScript knows data is Project
  console.log(data.hero.title);
}
```

## Import Patterns

### Barrel Exports

Use the barrel file for clean imports:

```typescript
// ✅ Good - Import from barrel
import type { Project, ProjectCreate, UseProjectsReturn } from '../types';

// ❌ Avoid - Deep imports
import type { Project } from '../types/project';
import type { UseProjectsReturn } from '../types/hooks';
```

### Type-only Imports

Use `type` keyword for type imports:

```typescript
// ✅ Good - Clearly marks as type import
import type { Project } from '../types';

// ⚠️ Less clear
import { Project } from '../types';
```

## Best Practices

### 1. Documentation

Add JSDoc comments to interfaces:

```typescript
/**
 * Main project structure representing a trek/tour
 */
export interface Project extends BaseEntity {
  // ...
}
```

### 2. Naming Conventions

- **Interfaces**: PascalCase, descriptive names
  - `Project`, `ProjectCreate`, `UseProjectsReturn`
  
- **Type Aliases**: PascalCase
  - `AsyncState`, `ProjectUpdate`
  
- **Props**: Component name + "Props"
  - `ProjectCardProps`, `ModalProps`
  
- **Returns**: Hook name + "Return"
  - `UseProjectsReturn`, `UseAutoSaveReturn`

### 3. Optional vs Required

Be explicit about optional fields:

```typescript
interface Config {
  // Required
  apiUrl: string;
  
  // Optional
  timeout?: number;
  retries?: number;
}
```

### 4. Discriminated Unions

Use for state management:

```typescript
type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

// TypeScript narrows types based on status
if (state.status === 'success') {
  console.log(state.data); // Type: T
}
```

### 5. Const Assertions

Use for literal types:

```typescript
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

type Status = typeof STATUS[keyof typeof STATUS];
// Type: "idle" | "loading" | "success" | "error"
```

## Advanced Patterns

### 1. Branded Types

For type-safe IDs:

```typescript
type ProjectId = string & { readonly __brand: 'ProjectId' };
type UserId = string & { readonly __brand: 'UserId' };

// Can't mix up IDs
function getProject(id: ProjectId) { }
getProject('123' as ProjectId); // ✅
getProject(userId); // ❌ Type error
```

### 2. Template Literal Types

For dynamic keys:

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickHandler = EventName<'click'>; // "onClick"
type ChangeHandler = EventName<'change'>; // "onChange"
```

### 3. Mapped Types

Transform existing types:

```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type ReadonlyPartial<T> = {
  readonly [K in keyof T]?: T[K];
};
```

## Migration Guide

### Adding New Types

1. Determine if type is reusable → Add to `common.ts`
2. Domain-specific type → Add to appropriate module
3. Export from barrel file (`index.ts`)
4. Document with JSDoc comments

### Refactoring Existing Types

1. Identify duplicate patterns
2. Extract to common base type
3. Use composition (`extends`)
4. Update imports to use barrel exports

## Type Safety Checklist

- [ ] All props interfaces defined
- [ ] Hook returns typed
- [ ] No `any` types (use `unknown` instead)
- [ ] Type guards for runtime checks
- [ ] Utility types for transformations
- [ ] JSDoc comments on public interfaces
- [ ] Barrel exports used consistently
- [ ] Generic types where appropriate

## Tools & Validation

### Type Checking

```bash
# Check types without building
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

### IDE Integration

- Enable TypeScript strict mode
- Use auto-imports
- Enable type hints
- Configure ESLint for TypeScript

## Conclusion

This type system provides:
- ✅ Strong type safety
- ✅ Excellent code reusability
- ✅ Clear component contracts
- ✅ Scalable architecture
- ✅ Self-documenting code

Follow these patterns for maintainable, professional TypeScript code.

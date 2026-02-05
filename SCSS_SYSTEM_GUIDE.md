# SCSS Token System Documentation

## Overview

This project now uses a custom SCSS-based design token system instead of Tailwind CSS. The system provides:

- **Centralized design tokens** (colors, spacing, typography, etc.)
- **Reusable mixins** for common patterns
- **Modular component styles** using SCSS modules
- **Type-safe styling** with folder-based component structure

## File Structure

### Folder-Based Components

All components and pages follow this structure:

```
ComponentName/
  ├── index.jsx          # Component logic
  └── styles.module.scss # Component styles
```

**Example:**
```
src/
  components/
    CreateProjectModal/
      ├── index.jsx
      └── styles.module.scss
  pages/
    Home/
      ├── index.jsx
      └── styles.module.scss
```

## Design Tokens

Located in `src/styles/_tokens.scss`

### Colors

```scss
// Primary Brand
$color-primary: #1997f0;
$color-primary-light: #4db3ff;
$color-primary-dark: #0077cc;

// Nature-inspired
$color-glacier-blue: #72bcd4;
$color-forest-green: #1b3022;
$color-stone-gray: #4a4e51;
$color-sunrise-orange: #f4a261;

// Semantic
$color-success: #4caf50;
$color-warning: #ff9800;
$color-error: #f44336;
$color-info: #2196f3;

// Grayscale
$color-gray-{50-900}
```

### Spacing

```scss
$spacing-1: 0.25rem;   // 4px
$spacing-2: 0.5rem;    // 8px
$spacing-3: 0.75rem;   // 12px
$spacing-4: 1rem;      // 16px
$spacing-6: 1.5rem;    // 24px
$spacing-8: 2rem;      // 32px
$spacing-16: 4rem;     // 64px
$spacing-20: 5rem;     // 80px
```

### Typography

```scss
$font-size-xs: 0.75rem;      // 12px
$font-size-sm: 0.875rem;     // 14px
$font-size-base: 1rem;       // 16px
$font-size-lg: 1.125rem;     // 18px
$font-size-2xl: 1.5rem;      // 24px
$font-size-4xl: 2.25rem;     // 36px
$font-size-6xl: 3.75rem;     // 60px

$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
$font-weight-black: 900;
```

### Borders & Shadows

```scss
$border-radius-sm: 0.25rem;
$border-radius-md: 0.5rem;
$border-radius-lg: 0.75rem;
$border-radius-xl: 1rem;
$border-radius-2xl: 1.5rem;
$border-radius-full: 9999px;

$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

## Mixins

Located in `src/styles/_mixins.scss`

### Layout Mixins

```scss
@include flex-center;       // Display flex with centered items
@include flex-between;      // Display flex with space-between
@include flex-column;       // Display flex column
```

### Responsive Mixins

```scss
@include sm { ... }  // @media (min-width: 640px)
@include md { ... }  // @media (min-width: 768px)
@include lg { ... }  // @media (min-width: 1024px)
@include xl { ... }  // @media (min-width: 1280px)
```

### Typography Mixins

```scss
@include heading-1;  // Large heading style
@include heading-2;  // Medium heading style
@include heading-3;  // Small heading style
@include body-text;  // Body text style
@include small-text; // Small text style
```

### Component Mixins

```scss
@include button-base;      // Base button styles
@include button-primary;   // Primary button
@include button-secondary; // Secondary button
@include card;             // Card component
@include card-glass;       // Glass-morphism card
@include input-base;       // Input field styles
```

### Gradient Mixins

```scss
@include gradient-primary; // Blue gradient
@include gradient-dark;    // Dark gradient
@include gradient-sunset;  // Orange gradient
```

### Utility Mixins

```scss
@include truncate;        // Text ellipsis
@include visually-hidden; // Screen reader only
@include hover-lift;      // Hover lift effect
```

## Usage Examples

### Creating a Component with SCSS Module

**Component Structure:**
```
MyComponent/
  ├── index.jsx
  └── styles.module.scss
```

**styles.module.scss:**
```scss
@use '../../styles/tokens' as *;
@use '../../styles/mixins' as *;

.container {
  padding: $spacing-6;
  background-color: $color-white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-md;
  
  @include md {
    padding: $spacing-8;
  }
}

.title {
  @include heading-2;
  color: $color-forest-green;
  margin-bottom: $spacing-4;
}

.button {
  @include button-primary;
}
```

**index.jsx:**
```jsx
import styles from './styles.module.scss';

export default function MyComponent() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hello World</h2>
      <button className={styles.button}>Click Me</button>
    </div>
  );
}
```

### Using Multiple Classes

```jsx
<div className={`${styles.card} ${styles.highlighted}`}>
  Content
</div>
```

### Using Global Utility Classes

Global utility classes are available from `src/styles/index.scss`:

```jsx
<div className="flex items-center gap-4">
  <div className="text-center">...</div>
</div>
```

## Customization

### Changing Brand Colors

Edit `src/styles/_tokens.scss`:

```scss
$color-primary: #your-color;
$color-glacier-blue: #your-color;
$color-forest-green: #your-color;
```

### Adding New Tokens

```scss
// In _tokens.scss
$color-custom-brand: #123456;
$spacing-custom: 2.5rem;
```

### Creating Custom Mixins

```scss
// In _mixins.scss
@mixin my-custom-mixin {
  // Your styles
}
```

## Migration from Tailwind

### Before (Tailwind):
```jsx
<div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Title</h2>
</div>
```

### After (SCSS Modules):
```scss
// styles.module.scss
.container {
  background-color: $color-white;
  padding: $spacing-6;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-md;
}

.title {
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  color: $color-gray-800;
  margin-bottom: $spacing-4;
}
```

```jsx
// index.jsx
<div className={styles.container}>
  <h2 className={styles.title}>Title</h2>
</div>
```

## Benefits

1. **Type Safety**: SCSS modules prevent class name collisions
2. **Better Organization**: Folder-based structure keeps related files together
3. **Maintainability**: Centralized tokens make updates easier
4. **Performance**: No unused CSS in production
5. **Flexibility**: Full power of SCSS (nesting, variables, mixins)
6. **Customization**: Complete control over design system

## Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

## File Imports

```jsx
// Importing a component
import MyComponent from './components/MyComponent';

// Importing styles in a component
import styles from './styles.module.scss';

// Using global utilities (already imported in main.jsx)
// No import needed, just use className
```

## Best Practices

1. **Use tokens**: Always use design tokens instead of hardcoded values
2. **Use mixins**: Leverage mixins for common patterns
3. **Component scoping**: Keep styles scoped to components using modules
4. **Naming convention**: Use kebab-case for class names in SCSS
5. **Organization**: Group related styles together
6. **Comments**: Document complex styles
7. **Nesting**: Limit nesting to 3 levels max for specificity control

## Troubleshooting

### Module not found
Ensure you're importing from the correct relative path:
```scss
@use '../../styles/tokens' as *;
```

### Styles not applying
1. Check that you're using `styles.className` in JSX
2. Verify the SCSS file is imported
3. Clear build cache: Delete `node_modules/.vite`

### Token not available
Make sure you're importing tokens:
```scss
@use '../../styles/tokens' as *;
```

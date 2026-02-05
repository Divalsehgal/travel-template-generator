# Design Tokens

This package generates design tokens for the Shiv Bhoomi PDF Generator project using Style Dictionary.

## Structure

- `tokens.json` - Token definitions (colors, spacing, typography, etc.)
- `build.js` - Style Dictionary build configuration
- `build/` - Generated output files (SCSS & JavaScript)

## Installation

```bash
npm install
```

## Build Tokens

```bash
npm run build
```

This generates:
- `build/_tokens.scss` - SCSS variables
- `build/tokens.js` - JavaScript ES6 module

## Usage in Main Project

### SCSS
```scss
@use '@shiv-bhoomi/design-tokens/scss' as tokens;

.my-component {
  color: tokens.$color-primary;
  padding: tokens.$spacing-4;
}
```

### JavaScript
```javascript
import tokens from '@shiv-bhoomi/design-tokens';

const primaryColor = tokens.colorPrimary;
```

## Token Categories

- **Colors**: Primary, nature-inspired, grayscale, semantic (success, warning, error, info)
- **Spacing**: 0-32 scale (0.25rem increments)
- **Typography**: Font families, sizes, weights, line-heights
- **Border**: Radius and width values
- **Shadow**: Box shadow presets (sm, md, lg, xl)
- **Transition**: Duration presets (fast, base, slow)
- **Z-Index**: Layering values for UI components

## Clean Build

```bash
npm run clean
```

# ADR-0001: Template Architecture for PDF Layouts

## Status
Proposed

## Context
The user wants to expand the "Short One-Page" (A4) PDF export with multiple distinct visual styles: Modern, Wavy, Techno, and Futuristic. We need a system that can easily switch between these layouts while maintaining the same underlying data structure.

## Decision Drivers
- **Extensibility**: Easy to add more templates in the future.
- **Maintainability**: Low code duplication between templates.
- **Performance**: Fast rendering and PDF generation.
- **User Experience**: Clear selection flow in the project form.

## Considered Options
1. **Conditional Rendering in `PreviewShort`**: Use `if/else` or `switch` to swap between major JSX blocks.
2. **Strategy Pattern for Layouts**: Map template names to specific layout components.
3. **CSS-Only Variations**: Use a single JSX structure and switch classes/variables.

## Decision
We will use a **Hybrid Strategy Pattern**. `PreviewShort` will remain the main entry point but will delegate rendering to specific sub-components for each template type (e.g., `ModernLayout`, `WavyLayout`). This keeps the main component clean and allows each layout to have its own CSS modules.

## Consequences
- **Positive**: Clean separation of concerns. Easy to test layouts in isolation.
- **Negative**: Slight increase in file count.
- **Neutral**: Requires updating the `Project` type to store the selected template.

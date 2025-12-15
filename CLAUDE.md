# Funstuff Website - Development Guidelines

## Project Overview
Modern, high-tech website with luxury green glow aesthetic using dark mode design system.

## Tech Stack
- **UI Framework**: React with shadcn/ui components
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design tokens
- **Theme**: Dark mode with techy green glow aesthetic

## Design System

### Typography
**Font Family**: `system-ui, -apple-system, sans-serif`

**Heading Scale**:
- H1: 64px (4rem) - Hero headlines - weight: 700 (bold) - with decrypt animation
- H2: 32px (2rem) - Section titles - weight: 400
- H3: 24px (1.5rem) - Subsections - weight: 400
- H4: 20px (1.25rem) - Card headings - weight: 400
- H5: 16px (1rem) - Small labels - weight: 500
- H6: 14px (0.875rem) - Tiny headings - weight: 500

**Font Weights**:
- H1 uses `font-bold` (700) for maximum impact
- H2-H4 use `font-normal` (400) for clean hierarchy
- H5-H6 use `font-medium` (500) for small text clarity

**See [TYPOGRAPHY.md](./TYPOGRAPHY.md) for complete style guide**

### Color Palette
**Primary Green (3 shades):**
- `--green-light`: #9FFFCB (bright mint)
- `--green-medium`: #7AE582 (vibrant green)
- `--green-dark`: #25A18E (deep teal-green)

**Secondary Blue (3 shades):**
- `--blue-light`: #00A5CF (cyan blue)
- `--blue-medium`: #004E64 (deep navy)
- `--blue-dark`: #003247 (darker navy - derived)

**Text Colors**:
- Primary: `rgba(255, 255, 255, 0.87)` - Headings, important text
- Secondary: `rgba(255, 255, 255, 0.6)` - Body text
- Muted: `rgba(255, 255, 255, 0.4)` - De-emphasized text

### Design Principles
- **Minimal & Clean**: Light typography, generous whitespace, clear hierarchy
- **High-tech**: Clean geometric layouts, sharp edges, minimal design
- **Green glow**: Strategic use of green accents with subtle glow effects
- **Dark mode**: Primary dark background with strategic light elements

### Component Guidelines
- Use shadcn/ui as the base component library
- Customize components with the defined color palette
- Implement consistent spacing using Tailwind's scale
- Add subtle glow effects to primary green elements
- Use Lucide icons consistently throughout
- Follow typography scale defined in TYPOGRAPHY.md

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## File Structure
```
/src
  /components
    /ui              # shadcn components
    /layout          # Layout components
    /sections        # Page sections
  /lib
    /utils.ts        # Utility functions
  /styles
    /globals.css     # Global styles and CSS variables
  /pages or /app     # Next.js pages/app router
```

## Development Notes
- Always use the defined color palette - no off-brand colors
- Maintain consistency with the luxury high-tech aesthetic
- Test components in dark mode
- Ensure accessibility standards are met
- Use TypeScript for type safety
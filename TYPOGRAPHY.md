# Typography Style Guide

## Font Family
- **Primary**: `system-ui, -apple-system, sans-serif`
- Clean, native sans-serif stack for optimal readability and performance

---

## Heading System

### H1 - Hero Headlines
```css
font-size: 64px (4rem)
line-height: 1.1
font-weight: 700 (bold)
letter-spacing: -0.03em
color: rgba(255, 255, 255, 0.87)
```
**Usage**: Main page headlines, hero sections
**Tailwind**: Use semantic `<h1>` tag (styles applied automatically)
**Special Effect**: Decrypt text animation on page load

**Mobile**: 48px (3rem)

---

### H2 - Section Titles
```css
font-size: 32px (2rem)
line-height: 1.3
font-weight: 400 (normal)
letter-spacing: -0.01em
color: rgba(255, 255, 255, 0.87)
```
**Usage**: Section headings, major content areas
**Tailwind**: `text-3xl md:text-4xl font-normal`

**Mobile**: 28px (1.75rem)

---

### H3 - Subsection Titles
```css
font-size: 24px (1.5rem)
line-height: 1.4
font-weight: 400 (normal)
letter-spacing: 0
color: rgba(255, 255, 255, 0.87)
```
**Usage**: Card titles, subsection headings
**Tailwind**: `text-2xl font-normal`

**Mobile**: 20px (1.25rem)

---

### H4 - Card Headings
```css
font-size: 20px (1.25rem)
line-height: 1.5
font-weight: 400 (normal)
color: rgba(255, 255, 255, 0.87)
```
**Usage**: Smaller card headings, list titles
**Tailwind**: `text-xl font-normal`

---

### H5 - Small Headings
```css
font-size: 16px (1rem)
line-height: 1.5
font-weight: 500 (medium)
color: rgba(255, 255, 255, 0.87)
```
**Usage**: Small section labels, form labels
**Tailwind**: `text-base font-medium`

---

### H6 - Tiny Headings
```css
font-size: 14px (0.875rem)
line-height: 1.5
font-weight: 500 (medium)
color: rgba(255, 255, 255, 0.87)
```
**Usage**: Metadata, badges, tags
**Tailwind**: `text-sm font-medium`

---

## Body Text

### Paragraph - Default
```css
font-size: 16px (1rem)
line-height: 1.6
font-weight: 400 (normal)
color: rgba(255, 255, 255, 0.6)
```
**Usage**: Body copy, descriptions
**Tailwind**: `text-base`

### Small Text
**Tailwind**: `text-sm` (14px)
**Usage**: Supporting text, captions

### Extra Small Text
**Tailwind**: `text-xs` (12px)
**Usage**: Metadata, timestamps

---

## Color System

### Text Colors
- **Primary**: `rgba(255, 255, 255, 0.87)` - Main headings, important text
- **Secondary**: `rgba(255, 255, 255, 0.6)` - Body text, descriptions
- **Muted**: `rgba(255, 255, 255, 0.4)` - De-emphasized text, hints

### Brand Colors
- **Green Light**: `#9FFFCB` - Bright accents
- **Green Medium**: `#7AE582` - Primary brand color
- **Green Dark**: `#25A18E` - Deep accents
- **Blue Light**: `#00A5CF` - Secondary accents
- **Blue Medium**: `#004E64` - Dark blue accents

### Tailwind Classes
- Primary text: `text-white opacity-87` or default
- Secondary text: `opacity-60`
- Muted text: `opacity-40`
- Green accent: `text-green-medium`
- Blue accent: `text-blue-light`

---

## Font Weights

- **Normal**: `font-normal` (400) - Default for all text
- **Medium**: `font-medium` (500) - For emphasis on small text
- **Semibold**: `font-semibold` (600) - Rarely used, for strong emphasis

**Note**: Avoid heavy weights (700+) to maintain the light, techy aesthetic

---

## Usage Examples

### Hero Section
```jsx
<h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight">
  Your Headline Here
</h1>
<p className="text-base md:text-lg opacity-60 leading-relaxed">
  Your description text
</p>
```

### Section Header
```jsx
<h2 className="text-3xl md:text-4xl font-normal mb-4">
  Section Title
</h2>
<p className="text-base opacity-60">
  Section description
</p>
```

### Card Title
```jsx
<h3 className="text-2xl font-normal mb-2">
  Card Headline
</h3>
<p className="text-sm opacity-60">
  Card description
</p>
```

---

## Best Practices

1. **Maintain Hierarchy**: Use headings in order (h1 → h2 → h3)
2. **One H1 per page**: Only use H1 for the main hero headline
3. **Use opacity for hierarchy**: `opacity-87` for primary, `opacity-60` for secondary
4. **Responsive sizing**: Always provide responsive variants for large headings
5. **Letter spacing**: Use negative tracking (`tracking-tight`) for large headings
6. **Line height**: Tighter for headings (1.2-1.3), looser for body (1.6)
7. **Keep it light**: Stick to font-weight 400-500 for the modern aesthetic

---

## Don'ts

❌ Don't use font weights above 600
❌ Don't mix multiple font families
❌ Don't use colored text without purpose
❌ Don't use text-center unless intentional (prefer left-align)
❌ Don't skip heading levels (h1 → h3)
❌ Don't use all caps for headings (use normal case)

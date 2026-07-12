# Design System

**Date**: July 8, 2026
**Designer**: Cascade AI
**Purpose**: Complete product design language for Neo's AI-native Agency Platform

---

## Design Philosophy

### Core Principles

1. **Dark-First**: The default experience is dark. Light mode is secondary.
2. **Minimal**: Every element has a purpose. No decoration without function.
3. **Keyboard-First**: Every interaction must be keyboard accessible.
4. **AI-Native**: AI states have their own visual language.
5. **Premium**: The product should feel like Linear, Raycast, or Vercel.
6. **Consistent**: Same tokens, components, and patterns everywhere.
7. **Accessible**: WCAG 2.1 AA compliant by default.

### Personality

- **Confident**: Clean lines, strong contrast, decisive actions.
- **Calm**: No harsh colors, no visual noise.
- **Intelligent**: Subtle hints that AI is active.
- **Fast**: Snappy feedback, no unnecessary delays.

---

## Color System

### Primary Palette

```css
:root {
  /* Background */
  --bg-base: #07080A;
  --bg-surface: #0C0E12;
  --bg-elevated: #11141A;
  --bg-overlay: #1A1D24;
  --bg-subtle: #0F1216;

  /* Text */
  --text-primary: #F0F2F5;
  --text-secondary: #8A919E;
  --text-tertiary: #5C6370;
  --text-muted: #3A404A;
  --text-inverse: #07080A;

  /* Brand */
  --brand-primary: #5E6AD2;
  --brand-primary-hover: #6F7DDA;
  --brand-primary-subtle: rgba(94, 106, 210, 0.15);
  --brand-secondary: #FF5757;
  --brand-secondary-subtle: rgba(255, 87, 87, 0.15);

  /* Gradients */
  --gradient-brand: linear-gradient(135deg, #5E6AD2 0%, #8B5CF6 100%);
  --gradient-accent: linear-gradient(135deg, #FF5757 0%, #F59E0B 100%);
  --gradient-ai: linear-gradient(135deg, #5E6AD2 0%, #3B82F6 50%, #10B981 100%);

  /* Status */
  --status-success: #10B981;
  --status-warning: #F59E0B;
  --status-error: #FF5757;
  --status-info: #3B82F6;
  --status-neutral: #6B7280;

  /* Border */
  --border-default: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.12);
  --border-active: rgba(94, 106, 210, 0.5);
  --border-error: rgba(255, 87, 87, 0.5);

  /* Focus */
  --focus-ring: 0 0 0 2px rgba(94, 106, 210, 0.4);

  /* AI Glow */
  --ai-glow: 0 0 20px rgba(94, 106, 210, 0.3);
}
```

### Semantic Color Usage

| Token | Usage |
|-------|-------|
| bg-base | Main app background |
| bg-surface | Cards, panels, lists |
| bg-elevated | Modals, dropdowns, popovers |
| bg-overlay | Backdrops, overlays |
| text-primary | Headings, primary text |
| text-secondary | Body text, descriptions |
| text-tertiary | Placeholders, disabled text |
| brand-primary | Primary actions, active states |
| brand-secondary | Destructive actions, urgent |
| status-success | Success states, published |
| status-warning | Warnings, draft |
| status-error | Errors, rejected |
| status-info | Information, processing |

### AI States

| State | Visual Treatment |
|-------|-----------------|
| AI Active | Subtle gradient border + glow |
| AI Generating | Pulsing gradient shimmer |
| AI Complete | Fade to brand-primary subtle |
| AI Error | Red subtle background + icon |

---

## Typography

### Font Stack

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-display: 'Inter', sans-serif;
}
```

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| text-hero | 48px | 700 | 1.1 | -0.02em | Hero titles |
| text-h1 | 32px | 600 | 1.2 | -0.02em | Page titles |
| text-h2 | 24px | 600 | 1.25 | -0.01em | Section headings |
| text-h3 | 20px | 600 | 1.3 | -0.01em | Subsection headings |
| text-h4 | 18px | 500 | 1.35 | 0 | Card titles |
| text-h5 | 16px | 500 | 1.4 | 0 | Labels |
| text-body | 14px | 400 | 1.5 | 0 | Body text |
| text-body-sm | 13px | 400 | 1.5 | 0 | Secondary body |
| text-caption | 12px | 400 | 1.4 | 0.01em | Captions |
| text-mono | 13px | 400 | 1.4 | 0 | Code, data |
| text-tiny | 11px | 500 | 1.3 | 0.02em | Badges, tags |

### Typography Rules

1. **Inter** for all UI text.
2. **JetBrains Mono** for code, data, keyboard shortcuts.
3. **Tight headings** with negative letter-spacing.
4. **Relaxed body** with normal letter-spacing.
5. **Maximum line length** of 65 characters for readability.
6. **No all-caps** except for tiny labels.

---

## Spacing

### Base Unit

Base unit: **4px**

```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

### Spacing Patterns

| Context | Value | Usage |
|---------|-------|-------|
| Tight | 4-8px | Icon gaps, inline elements |
| Default | 12-16px | Card padding, form fields |
| Medium | 20-24px | Section gaps, modal padding |
| Large | 32-48px | Page sections |
| XLarge | 64-96px | Hero sections |

### Component Spacing

- Button padding: 8px 12px
- Input padding: 8px 12px
- Card padding: 16px
- Modal padding: 24px
- Sidebar item padding: 8px 12px

---

## Grid System

### Container

```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

### Grid

- **Base grid**: 12 columns
- **Gutter**: 16px desktop, 12px tablet, 8px mobile
- **Margin**: 24px desktop, 16px tablet, 12px mobile

### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Small phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large desktops |

---

## Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;
}
```

### Usage

| Token | Usage |
|-------|-------|
| radius-sm | Tags, badges, small buttons |
| radius-md | Inputs, buttons, cards |
| radius-lg | Modals, panels, dropdowns |
| radius-xl | Large cards, feature sections |
| radius-full | Avatars, pills, status dots |

**Default component radius**: `--radius-md` (6px)

---

## Shadows & Elevation

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.2);
  --shadow-glow: 0 0 20px rgba(94, 106, 210, 0.3);
}
```

### Elevation Levels

| Level | Use | Shadow |
|-------|-----|--------|
| 0 | Base surface | None |
| 1 | Cards, inputs | shadow-sm |
| 2 | Dropdowns, popovers | shadow-md |
| 3 | Modals, command palette | shadow-lg |
| 4 | Toasts, notifications | shadow-xl |

---

## Borders

```css
:root {
  --border-width-0: 0;
  --border-width-1: 1px;
  --border-width-2: 2px;
  --border-width-3: 3px;
}
```

### Usage

| Width | Usage |
|-------|-------|
| 0 | Clean surfaces |
| 1 | Default borders |
| 2 | Focus rings, active states |
| 3 | AI-generated highlights |

---

## Icons

### Icon System

- **Primary**: Lucide icons (18x18 default)
- **Secondary**: Custom icons for Neo-specific concepts
- **Size scale**: 12px, 14px, 16px, 18px, 20px, 24px

### Icon Rules

1. Default icon size: 18px
2. Icon-only buttons: 20px
3. Small inline icons: 14px
4. Navigation icons: 18px
5. Empty state icons: 24px

### Icon Usage

| Icon | Meaning |
|------|---------|
| Search (⌘K) | Command palette |
| Sparkles | AI feature |
| Plus | Create new |
| Settings (Cmd+,) | Settings |
| Bell | Notifications |
| User | Profile |
| LogOut | Sign out |

---

## Motion

### Animation Principles

1. **Fast**: Most animations 150-250ms
2. **Meaningful**: Animations guide attention
3. **Subtle**: No bouncy or playful motion
4. **Respectful**: Honor `prefers-reduced-motion`

### Duration Tokens

```css
:root {
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 150ms;
  --duration-slow: 250ms;
  --duration-slower: 350ms;
  --duration-ai: 2000ms;
}
```

### Easing Tokens

```css
:root {
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### Animation Patterns

| Pattern | Duration | Easing | Use |
|---------|----------|--------|-----|
| Fade In | 150ms | ease-out | Modals, dropdowns |
| Scale In | 150ms | ease-out | Popovers, toasts |
| Slide In | 200ms | ease-out | Sidebar, panels |
| AI Shimmer | 2000ms | linear | AI generating state |
| Pulse | 1500ms | ease-in-out | Loading states |
| Hover | 100ms | ease-default | Buttons, links |
| Focus | 0ms | - | Immediate feedback |

### Specific Animations

**Command Palette Open**:
```css
@keyframes cmdk-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
```

**AI Generating Shimmer**:
```css
@keyframes ai-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

**Loading Skeleton**:
```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}
```

---

## Component Philosophy

### Component Rules

1. **Single responsibility**: Each component does one thing well.
2. **Composable**: Complex components built from simple ones.
3. **Accessible**: Keyboard navigable, screen reader friendly.
4. **Type-safe**: Full TypeScript support.
5. **Theme-aware**: Works in dark and light modes.
6. **AI-aware**: Has states for AI interaction.

### Component Tiers

**Tier 1: Primitives**
- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Textarea

**Tier 2: Composed**
- Card
- Modal
- Dropdown
- Command Palette
- Sidebar
- Tabs
- Accordion
- Toast

**Tier 3: Domain**
- Content Card
- Media Uploader
- AI Assistant
- Review Panel
- Activity Feed
- Permission Editor

### Component Anatomy: Button

```
Button
├── Container
│   ├── Background
│   ├── Border
│   └── Shadow
├── Content
│   ├── Icon (optional)
│   ├── Label
│   └── Shortcut (optional)
└── States
    ├── Default
    ├── Hover
    ├── Active
    ├── Focus
    ├── Disabled
    └── Loading
```

### Button Variants

| Variant | Background | Border | Text | Use |
|---------|------------|--------|------|-----|
| Primary | brand-primary | none | text-primary | Main CTA |
| Secondary | bg-elevated | border-default | text-primary | Secondary action |
| Ghost | transparent | none | text-secondary | Subtle action |
| Destructive | brand-secondary-subtle | brand-secondary/30 | brand-secondary | Delete/remove |
| AI | brand-primary-subtle | gradient | text-primary | AI action |

### Component Anatomy: Card

```
Card
├── Container
│   ├── Background (bg-surface)
│   ├── Border (border-default)
│   └── Radius (radius-md)
├── Header (optional)
│   ├── Title
│   ├── Description
│   └── Actions
├── Content
└── Footer (optional)
```

---

## Design Tokens Summary

```css
:root {
  /* Brand */
  --brand-primary: #5E6AD2;
  --brand-secondary: #FF5757;

  /* Background */
  --bg-base: #07080A;
  --bg-surface: #0C0E12;
  --bg-elevated: #11141A;
  --bg-overlay: #1A1D24;

  /* Text */
  --text-primary: #F0F2F5;
  --text-secondary: #8A919E;
  --text-tertiary: #5C6370;

  /* Border */
  --border-default: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.12);

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Motion */
  --duration-fast: 100ms;
  --duration-normal: 150ms;
  --duration-slow: 250ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Accessibility

### WCAG 2.1 AA Requirements

1. **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text.
2. **Focus Indicators**: Visible focus rings on all interactive elements.
3. **Keyboard Navigation**: Full keyboard operability.
4. **Screen Readers**: Proper labels, roles, and ARIA attributes.
5. **Motion**: Respect `prefers-reduced-motion`.
6. **Touch Targets**: Minimum 44x44px for touch devices.

### Implementation Checklist

- [ ] All interactive elements have focus states
- [ ] All images have alt text
- [ ] All forms have proper labels
- [ ] All icons have aria-labels
- [ ] All modals trap focus
- [ ] All color combinations pass contrast checks
- [ ] All animations respect reduced motion
- [ ] All tables have proper headers

---

## Next Steps

1. Move to Phase 3 (UX Design)
2. Design every screen using these tokens
3. Move to Phase 4 (AI Design)
4. Move to Phase 5 (Implementation)

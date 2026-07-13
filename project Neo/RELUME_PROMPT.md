# Relume Prompt for Project Neo

## Sitemap Generation Prompt

```
Create a sitemap for "Project Neo" - an AI-native Agency Platform that serves as a modern CMS replacement for creative agencies.

The platform should have the following structure:

**Main Pages:**
1. Home - Hero section showcasing the platform's AI-native capabilities, features overview (Visual Editing, AI Assist, Live Content API, Type Generation), pricing section, and CTA to get started
2. Features - Detailed breakdown of platform features organized by category (Content Management, Visual Editing, AI Features, Developer Experience, Performance)
3. Developers - Technical documentation, API reference, getting started guides, integration examples
4. Pricing - Tiered pricing plans (Free, Pro, Enterprise) with feature comparison
5. About - Company information, team, mission, contact
6. Blog - Content marketing articles about CMS, AI, and modern web development
7. Contact - Contact form, office locations, support information

**Supporting Pages:**
- Legal (Privacy Policy, Terms of Service)
- Login/Auth pages
- Dashboard (for authenticated users)
- Documentation subsections (Getting Started, API Reference, Guides, Tutorials)

**Design Direction:**
- Dark, minimal aesthetic inspired by Raycast (deep charcoal backgrounds, single accent color in red, hairline borders)
- Clean typography with Inter font
- High contrast for readability
- Sparse use of accent color (only for CTAs and interactive elements)
- Editorial feel with generous whitespace
- Focus on technical sophistication and developer experience

**Target Audience:**
- Creative agencies looking to modernize their CMS
- Developers building content-heavy applications
- Technical decision makers evaluating CMS solutions
- Teams interested in AI-powered content workflows

**Key Value Propositions to Highlight:**
- AI-native content operations
- Real-time visual editing
- Type-safe content modeling
- Modern tech stack (Next.js 16, React 19, Sanity v6)
- Developer-first experience
- Performance optimized with Cache Components
```

## Wireframe Generation Prompt

```
Create wireframes for Project Neo - an AI-native Agency Platform CMS.

**Design System:**
- Dark theme with deep charcoal backgrounds (#07080a base)
- Single accent color: Red (#ff5757) used sparingly for CTAs only
- Hairline borders (#242728) instead of drop shadows
- Inter font with clean, editorial typography
- Generous whitespace (96px section rhythm)
- 8px base spacing scale
- Card-based layouts with subtle elevation via color ladder
- Command palette-style search interfaces

**Page Components:**

**Home Page:**
- Hero: Large headline "AI-Native Agency Platform" with subheadline, single red CTA button, dark background
- Features Grid: 3-column grid showing key features with icons and descriptions
- Tech Stack: Horizontal scroll or grid showing logos (Next.js, React, Sanity, Tailwind)
- Pricing Preview: Simple 3-card pricing comparison
- Footer: Minimal with navigation links and social icons

**Features Page:**
- Hero: "Features" heading with description
- Category Navigation: Sticky sidebar with feature categories
- Feature Sections: Alternating layouts (text-left/image-right, image-left/text-right)
- Interactive Demos: Code snippets or UI mockups embedded
- CTA Section: "Ready to get started?" with red button

**Developers Page:**
- Hero: "Built for Developers" heading
- Quick Start: Step-by-step guide with code blocks
- API Reference: Searchable documentation with syntax highlighting
- Integration Examples: Code snippets for common integrations
- Community: Links to GitHub, Discord, Twitter

**Pricing Page:**
- Hero: "Simple, transparent pricing"
- Pricing Cards: 3 cards (Free, Pro, Enterprise) with feature lists
- FAQ Section: Accordion-style FAQ
- Enterprise CTA: "Need custom solution?" with contact form

**Blog Page:**
- Hero: "Blog" heading with search bar
- Article Grid: Card-based layout with featured images, titles, excerpts, dates
- Categories: Filter pills for blog categories
- Newsletter Signup: Simple form with red CTA

**Contact Page:**
- Hero: "Get in touch" heading
- Contact Form: Clean form with labels and red submit button
- Contact Info: Email, phone, address in card
- Map: Embedded map placeholder
- Social Links: Social media icons

**Dashboard (Authenticated):**
- Sidebar: Navigation with user profile
- Main Content: Content overview with stats cards
- Quick Actions: "Create Page", "Create Post", "Upload Media" buttons
- Recent Activity: List of recent content changes
- AI Assistant: Chat interface for AI-powered content help

**Common Patterns:**
- Navigation: Minimal top nav with logo, links, and red "Get Started" button
- Cards: Dark background (#121212), hairline border, subtle hover state
- Buttons: Red filled for primary, transparent with red text for secondary
- Inputs: Dark background with hairline border, red focus state
- Typography: Large headings (48-60px), body text (16px), muted text (14px)
- Spacing: 96px between major sections, 24-32px between elements
```

## Component Library Prompt

```
Create a component library for Project Neo following this design system:

**Color Tokens:**
- Canvas: #07080a (main background)
- Surface: #0d0d0d (cards, panels)
- Surface Elevated: #101111 (hover states)
- Surface Card: #121212 (card backgrounds)
- Text Primary: #ffffff (headings, body)
- Text Secondary: rgba(255,255,255,0.55) (descriptions, metadata)
- Text Tertiary: rgba(255,255,255,0.3) (disabled states)
- Accent: #ff5757 (CTAs, links, interactive elements)
- Border: #242728 (hairline borders)
- Success: #48bb78
- Warning: #f6ad55
- Error: #f56565

**Typography:**
- Font Family: Inter
- Font Features: calt, kern, liga, ss03 (single-story g)
- Scale: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px, 60px
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Spacing:**
- Base: 8px
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px
- Section Rhythm: 96px

**Border Radius:**
- Scale: 0px, 4px, 8px, 12px, 16px, 24px, 9999px
- Buttons: 8px
- Cards: 12px
- Inputs: 8px

**Shadows:**
- No drop shadows
- Elevation via color ladder only
- Heavy shadows for dark surfaces when needed

**Components to Create:**
1. Button (primary red, secondary transparent, ghost)
2. Input (with focus state)
3. Card (with hover state)
4. Navigation (minimal top nav)
5. Hero (large heading with CTA)
6. Feature Card (icon + title + description)
7. Pricing Card (with feature list)
8. Blog Card (image + title + excerpt + date)
9. Footer (minimal with links)
10. Command Palette (search interface)

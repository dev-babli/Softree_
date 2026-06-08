# Softree Web Design System

**Audience:** Engineers and designers building new pages, sections, or marketing surfaces in this Next.js repo.

**Goal:** One coherent visual language across homepage, About, services, careers, contact, and future pages—without inventing new colors, motion curves, or layout patterns per page.

**Source of truth (code):**

| Topic | Location |
| --- | --- |
| Motion tokens | `src/lib/motion.ts` |
| CSS theme variables | `src/app/globals.css` |
| Section headers | `src/components/homepage-light/SectionHeader.tsx` |
| About reference page | `src/app/about-us/page.tsx` |
| Homepage composition | `src/app/home-page.tsx` |
| Deep spec (homepage ↔ About parity) | `.kiro/specs/homepage-about-design-language/design.md` |

---

## 1. Brand feel

Softree is an **enterprise offshore engineering partner** (Microsoft, AI, data, modern web). The UI should feel:

- **Editorial and light-first** on marketing pages—generous whitespace, crisp type, restrained color.
- **Confident, not flashy**—accents are sparse; most of the page is neutral canvas + `#0a0a1a` text.
- **Motion with purpose**—reveals on scroll, marquees, and hero moments use shared tokens; respect `prefers-reduced-motion`.

The homepage hero (`TransferredSoftreeHero`) is currently a **dark, GSAP-pinned** exception. New **content sections below the hero** should follow the **light design language** used on About Us unless product explicitly asks for a dark band.

---

## 2. Color tokens

### Canvas surfaces (section backgrounds)

Use **exactly one** of these per `<section>`. Do not invent new page backgrounds.

| Token | Hex | When to use |
| --- | --- | --- |
| White | `#FFFFFF` | Default marketing sections, cards on white |
| Cool light | `#F8F9FC` | Alternate bands; about bento; cool editorial blocks |
| Warm cream | `#F3F0EE` | Warm break sections (team, FAQ-adjacent, tech stack band, sticky services) |

**Alternate surfaces** across long pages (white → cool → white → cream) so the scroll rhythm does not feel flat.

### Text

| Role | Value |
| --- | --- |
| Primary on light | `#0a0a1a` |
| Muted body | `#0a0a1a` at **55–70% opacity** (e.g. `text-[#0a0a1a]/60`) |
| Primary on dark | `#ffffff` |
| Muted on dark | `rgba(255,255,255,0.55)` or Tailwind `text-white/55` |

### Accent palette (strict — only three)

| Name | Hex | Use for |
| --- | --- | --- |
| Hero orange | `#FF6B00` | Hero badge dot, primary CTA fills |
| Brand orange | `#FF5812` | Team warmth, secondary emphasis, FAQ cards |
| Brand blue | `#1852FF` | Stats, badges, links, Microsoft/enterprise emphasis |

**Do not** use random oranges/blues (`#f97316`, `#3b82f6`, etc.) on new work. Register new colors in `globals.css` first if leadership approves an extension.

### Dark surfaces (hero, footer, contact closing band)

| Token | Hex | Notes |
| --- | --- | --- |
| Primary dark | `#0a0a0a` | Page shell, contact section skeleton, footer adjacency |
| Deeper dark | `#050505` | Footer |
| Hero dark (legacy pin hero) | `#1a2a3a` / `#fafaf9` transitions | Only inside `TransferredSoftreeHero` |

### CSS variables (`globals.css`)

Prefer `--softree-*` when adding global styles:

- `--softree-accent` / hover / soft tints for orange UI
- `--softree-fg-on-light`, `--softree-fg-on-dark`, borders

---

## 3. Typography

| Rule | Value |
| --- | --- |
| Font family | **Inter** only (`--font-sans` in `globals.css`) |
| Do not add | Bebas Neue, DM Sans, or extra display families without design sign-off |
| Badge labels | `text-[11px]` · `font-semibold` · `uppercase` · `tracking-[0.18em]` to `tracking-[0.22em]` |
| Section H2 | `font-semibold` · `leading-[0.9]` · `tracking-[-0.04em]` · `clamp(32px, 4.5vw, 56px)` |
| Hero H1 | Same weight/tracking · `clamp(48px, 8vw, 110px)` |
| Body | `text-base` · `leading-relaxed` · max width ~`640px` for prose |
| Stats / numbers | `tabular-nums` · bold display size · accent color on the number only |

Use proper typographic punctuation in copy (curly quotes, em dashes where appropriate).

---

## 4. Layout

### Page shell

```tsx
<div className="flex min-h-screen flex-col overflow-x-clip">
  <NavigationClient />
  <main className="flex-grow overflow-x-clip">
    {/* sections */}
  </main>
  <Footer />
</div>
```

About Us uses `pt-[100px]` on the outer wrapper to clear the fixed nav—match that on new top-level pages if content sits under the nav.

### Section container

```tsx
<section
  data-section="your-slug"
  className="relative w-full bg-[#F8F9FC] py-16 md:py-24 lg:py-28"
  aria-labelledby="your-heading-id"
>
  <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
    {/* content */}
  </div>
</section>
```

| Token | Value |
| --- | --- |
| Max content width | `1400px` (most sections); hero may use `1440px` where `AvooraHero` does |
| Horizontal padding | `px-4 sm:px-6 lg:px-12` or `px-6 lg:px-12` |
| Vertical rhythm | `py-16 md:py-24 lg:py-28` (tighten only with good reason) |

### Grids

- Prefer **12-column** mental model: `grid grid-cols-12 gap-3 sm:gap-4`.
- Bento blocks: `rounded-2xl` · `border border-[#0a0a1a]/[0.07]` or `/10` · white fill · soft shadow:

  `shadow-[0_8px_32px_-20px_rgba(10,10,26,0.14)]`

---

## 5. Section header pattern

Every new marketing section should start with **`SectionHeader`** (badge → headline → body). Do not reorder.

```tsx
import { SectionHeader } from "@/components/homepage-light/SectionHeader";

<SectionHeader
  badge="Capabilities"
  accent="#1852FF"
  headline={<span id="capabilities-heading">Title here</span>}
  body="Optional supporting sentence."
/>
```

| Prop | Rule |
| --- | --- |
| `badge` | Short, UPPERCASE |
| `accent` | One of `#FF6B00` \| `#FF5812` \| `#1852FF` |
| `as` | `"h1"` only once per page (hero); otherwise default `"h2"` |

---

## 6. Components to reuse (do not restyle duplicates)

Import these instead of copying markup/CSS.

| Pattern | Component | Path |
| --- | --- | --- |
| About hero (light, video, cycling words) | `AvooraHero` | `src/components/qc/homepage-light/AvooraHero.tsx` |
| About story + stats bento | `LightAboutMerged` | `src/components/qc/homepage-light/LightAboutMerged.tsx` |
| Homepage about bento + gallery | `InfinityScrollAnimation` | `src/components/infinity-scroll-animation/InfinityScrollAnimation.tsx` |
| Client logo marquee | `AboutClientLogos` | `src/components/qc/homepage-light/AboutClientLogos.tsx` |
| Engagement accordion | `LightEngagementModels` | `src/components/qc/homepage-light/LightEngagementModels.tsx` |
| FAQ (cream cards, orange/blue) | `LightFAQExact` | `src/components/homepage-light/LightFAQExact.tsx` |
| Contact + offices | `LightContactSection` | `src/components/qc/homepage-light/LightContactSection.tsx` |
| Office addresses data | `softree-offices` | `src/data/softree-offices.ts` |
| “Pay Us A Visit” gallery | `Gallery` | `src/components/Gallery/Gallery.tsx` |
| Photo marquee | `AnimatedPhotoGallery` | `src/components/Gallery/AnimatedPhotoGallery.tsx` |
| Testimonials globe (light) | `OffshoreTestimonialsGlobe` | `variant="light"` · `src/components/sections/OffshoreTestimonialsGlobe.tsx` |
| Cursor glow cards | `SpotlightCard` | `src/components/qc/shared/SpotlightCard.tsx` |
| Gradient mesh cards | `Grainient` | `src/components/qc/homepage-light/Grainient.tsx` |
| Nav / footer | `NavigationClient`, `Footer` | `src/components/sections/` |

**Parallax service gallery (inside about bento):** `ParallaxGalleryCard` + `infinity-scroll-home.css` in `src/components/infinity-scroll-animation/`.

---

## 7. CTAs and buttons

| Type | Style |
| --- | --- |
| Primary | Orange fill `#FF5812` or `#FF6B00` · `rounded-full` · uppercase micro-label optional · white text |
| Secondary on light | `rounded-full` · `border border-[#0a0a1a]/14` · hover tint toward orange or blue |
| Secondary on dark | Glass: `border-white/20` · `bg-white/10` · `backdrop-blur-md` |
| Text link | Inline with `ArrowUpRight` (lucide) · hover shift on icon |

Always use real `href` targets (`/contact`, `/about-us`, `/case-studies`, `/services`)—no dead `#` buttons.

---

## 8. Motion

**Import from `@/lib/motion` only**—no inline `cubic-bezier(...)` or random `duration: 0.87` in new files.

| Token group | Examples |
| --- | --- |
| `EASE` / `EASE_T` | `silk` (cinematic), `out` (entrances) |
| `DUR` | `card` 0.32s, `section` 0.9s, `cinematic` 1.4s |
| `STAGGER` | `default` 0.06, `loose` 0.12 |
| `REVEAL` | `up`, `fade`, `scale` for Framer `initial`/`animate` |
| `VIEWPORT` | `default` for `whileInView` |
| `prefersReducedMotion()` | Short-circuit GSAP timelines and infinite loops |

### Reduced motion

When `prefers-reduced-motion: reduce`:

- No scrubbed ScrollTrigger pinning for long distances
- Marquees static (single row of items)
- Cycling headline words frozen on first word
- Reveals become instant (opacity only, minimal translation)

### GSAP

- Register `ScrollTrigger` where needed; clean up on unmount (`gsap.context` / `useGSAP`).
- Prefer **transform + opacity** only for performance.

---

## 9. Imagery and media

- Use `next/image` with sensible `sizes`.
- Service imagery: `public/service_image/` (`ai.jpg`, `microsoft.jpg`, `data.jpg`, `web.jpg`).
- Workspace / culture photos: `public/Gallery/`.
- Hero video pattern: follow `AvooraHero` (poster fallback, load after hydration).

---

## 10. New page checklist

Before opening a PR for a new page:

1. **Structure:** `NavigationClient` → `<main>` sections → `Footer`.
2. **Surfaces:** Only `#FFFFFF`, `#F8F9FC`, `#F3F0EE` for light sections; document any dark band.
3. **Header:** `SectionHeader` with one of the three accents.
4. **Container:** `max-w-[1400px]` + standard horizontal padding.
5. **Motion:** Tokens from `src/lib/motion.ts`; reduced-motion path tested.
6. **Reuse:** Prefer shared components in §6 over new clones.
7. **Accessibility:** One `h1` per page; section `aria-labelledby`; focusable controls; alt text on images.
8. **SEO:** Metadata in `src/app/<route>/page.tsx` (title, description, OG)—do not strip existing metadata on edits.
9. **Lazy loading:** Match skeleton **background color** to the section’s real surface (see `home-page.tsx` dynamic imports).
10. **No AI-slop:** Avoid purple gradients, generic Inter-only card grids, and random accent colors.

---

## 11. Page templates

### A. Marketing page (like About Us)

1. Light hero (`AvooraHero` or approved variant)
2. Story / stats (`LightAboutMerged` or `InfinityScrollAnimation`)
3. Logos / proof (`AboutClientLogos`, marquees)
4. Deeper content sections with `SectionHeader`
5. `LightFAQExact` + `LightContactSection` optional closer
6. `Gallery` / `AnimatedPhotoGallery` when showing offices or culture

**Reference:** `src/app/about-us/page.tsx`

### B. Homepage section (insert in `home-page.tsx`)

- Keep section order documented in comments when adding blocks.
- Use `next/dynamic` for heavy below-the-fold sections.
- Skeleton `min-h-*` and `bg-[#…]` must match loaded section.

### C. Dark hero + light body (current homepage)

- Hero: `TransferredSoftreeHero` (dark pin)—do not change without GSAP review.
- Everything after hero: light tokens above.

---

## 12. Anti-patterns

| Avoid | Do instead |
| --- | --- |
| New hex accents per section | One of `#FF6B00`, `#FF5812`, `#1852FF` |
| Full-bleed purple/blue gradients on light pages | White/cream surfaces + accent on badges/CTAs only |
| Copy-pasting About CSS into new files | Import shared components |
| `container` class (1280px) for marketing bands | `max-w-[1400px]` pattern |
| Hardcoded animation curves in components | `@/lib/motion` |
| Cards inside cards inside cards | Flat bento grid, one border radius level |
| Empty submodule folders for components | Commit real files in `src/components/…` |

---

## 13. Environment (content / Studio)

Not visual design, but relevant when teammates ship CMS features:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` / `GOOGLE_GENAI_API_KEY` | Sanity AI Image Studio — Gemini models |
| `NVIDIA_API_KEY` / `NVAPI_API_KEY` | Sanity AI Image Studio — NVIDIA NIM models |

Studio tool: **AI Images** in Sanity (`src/sanity/plugins/geminiImageTool/`).

**Provider fallback:** When Provider is **Google Gemini**, the API tries Gemini first. On any failure (including quota `429`), it automatically retries with **NVIDIA FLUX.1 schnell** if `NVIDIA_API_KEY` is set. The JSON response may include `fallbackUsed: true` and `primaryError` with the Gemini message.

---

## 14. Questions or changes

- **Small visual tweaks** on an existing shared component: coordinate with whoever owns About/homepage parity; prefer editing the shared file once.
- **New brand color or font:** update this `design.md`, `globals.css`, and `.kiro/specs/homepage-about-design-language/design.md` together.
- **Full homepage redesign:** read the Kiro design spec end-to-end before restructuring `home-page.tsx`.

---

*Last aligned with repo layout: homepage `TransferredSoftreeHero` + light sections, About `AvooraHero` stack, `InfinityScrollAnimation` about bento, FAQ cream `#F3F0EE` / blue `#1852FF` / orange `#FF5812`.*

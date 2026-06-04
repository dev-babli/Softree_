"use client";

/**
 * Technology stack marquee for Engineering Solutions.
 * Brand-colored icons: Simple Icons CDN + inline Microsoft marks (CDN slugs 404).
 */

import LogoLoop, { type LogoItem } from "@/components/features/LogoLoop";
import {
  PowerAppsLogo,
  PowerAutomateLogo,
  SharePointLogo,
} from "@/components/case-studies/layouts/shared/PowerPlatformLogos";

const DEFAULT_SURFACE = "#F3F0EE";

const SIMPLE_ICONS = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

const MS_ICON =
  "h-[var(--logoloop-logoHeight)] w-[var(--logoloop-logoHeight)] shrink-0";

/** slug + hex (no #) — official Simple Icons brand colors */
const CDN_TECH = [
  { name: "React", slug: "react", color: "61DAFB", href: "https://react.dev" },
  { name: "Next.js", slug: "nextdotjs", color: "000000", href: "https://nextjs.org" },
  {
    name: "TypeScript",
    slug: "typescript",
    color: "3178C6",
    href: "https://www.typescriptlang.org",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    color: "06B6D4",
    href: "https://tailwindcss.com",
  },
  { name: "Node.js", slug: "nodedotjs", color: "339933", href: "https://nodejs.org" },
  { name: "Python", slug: "python", color: "3776AB", href: "https://www.python.org" },
  { name: ".NET", slug: "dotnet", color: "512BD4", href: "https://dotnet.microsoft.com" },
  { name: "GraphQL", slug: "graphql", color: "E10098", href: "https://graphql.org" },
  { name: "Vue.js", slug: "vuedotjs", color: "42B883", href: "https://vuejs.org" },
] as const;

const MS_TECH = [
  {
    name: "SharePoint",
    node: <SharePointLogo className={MS_ICON} />,
    href: "https://www.microsoft.com/en-us/microsoft-365/sharepoint",
  },
  {
    name: "Power Apps",
    node: <PowerAppsLogo className={MS_ICON} />,
    href: "https://www.microsoft.com/en-us/power-platform/products/power-apps",
  },
  {
    name: "Power Automate",
    node: <PowerAutomateLogo className={MS_ICON} />,
    href: "https://www.microsoft.com/en-us/power-platform/products/power-automate",
  },
] as const;

export const TECH_STACK_LOGOS: LogoItem[] = [
  ...CDN_TECH.map((tech) => ({
    src: SIMPLE_ICONS(tech.slug, tech.color),
    alt: tech.name,
    title: tech.name,
    href: tech.href,
  })),
  ...MS_TECH.map((tech) => ({
    node: tech.node,
    title: tech.name,
    href: tech.href,
    ariaLabel: tech.name,
  })),
];

export type LogoLoopTechStackProps = {
  fadeOutColor?: string;
  className?: string;
  ariaLabel?: string;
  logoHeight?: number;
  gap?: number;
  speed?: number;
  direction?: "left" | "right";
  scaleOnHover?: boolean;
  logos?: LogoItem[];
};

export default function LogoLoopTechStack({
  fadeOutColor = DEFAULT_SURFACE,
  className = "",
  ariaLabel = "Engineering technology stack",
  logoHeight = 36,
  gap = 40,
  speed = 80,
  direction = "left",
  scaleOnHover = true,
  logos = TECH_STACK_LOGOS,
}: LogoLoopTechStackProps) {
  return (
    <div
      className={`relative h-[48px] w-full min-w-0 sm:h-[52px] ${className}`.trim()}
    >
      <LogoLoop
        logos={logos}
        speed={speed}
        direction={direction}
        width="100%"
        gap={gap}
        logoHeight={logoHeight}
        hoverSpeed={0}
        fadeOut
        fadeOutColor={fadeOutColor}
        scaleOnHover={scaleOnHover}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

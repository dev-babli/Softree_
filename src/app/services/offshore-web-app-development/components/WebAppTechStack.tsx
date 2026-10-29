"use client";

import React, { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Layout,
  Server,
  ArrowRightLeft,
  Database,
  Cloud,
  GitBranch,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

/* -------------------------------------------------------------------------- */
/*  Logo map                                                                  */
/* -------------------------------------------------------------------------- */
const techToImgUrl: Record<string, string> = {
  // Frontend
  "React.js": "https://cdn.simpleicons.org/react/FF5812",
  React: "https://cdn.simpleicons.org/react/FF5812",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/FF5812",
  "Vue.js": "https://cdn.simpleicons.org/vuedotjs/FF5812",
  Angular: "https://cdn.simpleicons.org/angular/FF5812",
  TypeScript: "https://cdn.simpleicons.org/typescript/FF5812",
  JavaScript: "https://cdn.simpleicons.org/javascript/FF5812",
  HTML5: "https://cdn.simpleicons.org/html5/FF5812",
  CSS3: "https://cdn.simpleicons.org/css3/FF5812",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/FF5812",

  // Backend
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/FF5812",
  "Express.js": "https://cdn.simpleicons.org/express/FF5812",
  Python: "https://cdn.simpleicons.org/python/FF5812",
  ".NET": "https://cdn.simpleicons.org/dotnet/FF5812",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  PHP: "https://cdn.simpleicons.org/php/FF5812",
  NestJS: "https://cdn.simpleicons.org/nestjs/FF5812",
  Django: "https://cdn.simpleicons.org/django/FF5812",

  // APIs & Integration
  "REST APIs": "https://cdn.simpleicons.org/postman/FF5812",
  GraphQL: "https://cdn.simpleicons.org/graphql/FF5812",
  Webhooks: "https://cdn.simpleicons.org/webhook/FF5812",
  "Swagger / OpenAPI": "https://cdn.simpleicons.org/swagger/FF5812",
  Postman: "https://cdn.simpleicons.org/postman/FF5812",
  "OAuth 2.0": "https://cdn.simpleicons.org/auth0/FF5812",
  JSON: "https://cdn.simpleicons.org/json/FF5812",
  "API Gateway": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",

  // Databases & Storage
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/FF5812",
  MySQL: "https://cdn.simpleicons.org/mysql/FF5812",
  "Microsoft SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
  MongoDB: "https://cdn.simpleicons.org/mongodb/FF5812",
  Redis: "https://cdn.simpleicons.org/redis/FF5812",
  Firebase: "https://cdn.simpleicons.org/firebase/FF5812",
  "Amazon DynamoDB": "https://cdn.simpleicons.org/amazondynamodb/FF5812",

  // Cloud & Infrastructure
  "Microsoft Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Amazon Web Services (AWS)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Google Cloud Platform (GCP)": "https://cdn.simpleicons.org/googlecloud/FF5812",
  "Azure App Service": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "AWS Lambda": "https://cdn.simpleicons.org/awslambda/FF5812",
  Docker: "https://cdn.simpleicons.org/docker/FF5812",
  Kubernetes: "https://cdn.simpleicons.org/kubernetes/FF5812",
  Terraform: "https://cdn.simpleicons.org/terraform/FF5812",

  // DevOps & CI/CD
  Git: "https://cdn.simpleicons.org/git/FF5812",
  GitHub: "https://cdn.simpleicons.org/github/FF5812",
  GitLab: "https://cdn.simpleicons.org/gitlab/FF5812",
  "Azure DevOps": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg",
  "GitHub Actions": "https://cdn.simpleicons.org/githubactions/FF5812",
  Jenkins: "https://cdn.simpleicons.org/jenkins/FF5812",
  "CI/CD Pipelines": "https://cdn.simpleicons.org/githubactions/FF5812",
  "Infrastructure as Code": "https://cdn.simpleicons.org/terraform/FF5812",

  // Testing & Quality
  Jest: "https://cdn.simpleicons.org/jest/FF5812",
  "React Testing Library": "https://cdn.simpleicons.org/testinglibrary/FF5812",
  Cypress: "https://cdn.simpleicons.org/cypress/FF5812",
  Playwright: "https://cdn.simpleicons.org/playwright/FF5812",
  Selenium: "https://cdn.simpleicons.org/selenium/FF5812",
  "Unit Testing": "https://cdn.simpleicons.org/jest/FF5812",
  "Integration Testing": "https://cdn.simpleicons.org/cypress/FF5812",

  // Security & Monitoring
  "OpenID Connect": "https://cdn.simpleicons.org/openid/FF5812",
  "Role-Based Access Control (RBAC)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "OWASP Security Practices": "https://cdn.simpleicons.org/owasp/FF5812",
  SonarQube: "https://cdn.simpleicons.org/sonarqube/FF5812",
  Sentry: "https://cdn.simpleicons.org/sentry/FF5812",
  "Azure Monitor": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "AWS CloudWatch": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
};

interface TechCategoryDef {
  id: string;
  label: string;
  icon: LucideIcon;
  items: string[];
}

const webAppTechCategories: TechCategoryDef[] = [
  {
    id: "frontend",
    label: "Frontend Development",
    icon: Layout,
    items: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    icon: Server,
    items: [
      "Node.js",
      "Express.js",
      "Python",
      ".NET",
      "Java",
      "PHP",
      "NestJS",
      "Django",
    ],
  },
  {
    id: "apis-integration",
    label: "APIs & Integration",
    icon: ArrowRightLeft,
    items: [
      "REST APIs",
      "GraphQL",
      "Webhooks",
      "Swagger / OpenAPI",
      "Postman",
      "OAuth 2.0",
      "JSON",
      "API Gateway",
    ],
  },
  {
    id: "databases",
    label: "Databases & Data Storage",
    icon: Database,
    items: [
      "PostgreSQL",
      "MySQL",
      "Microsoft SQL Server",
      "MongoDB",
      "Redis",
      "Firebase",
      "Amazon DynamoDB",
    ],
  },
  {
    id: "cloud-infrastructure",
    label: "Cloud & Infrastructure",
    icon: Cloud,
    items: [
      "Microsoft Azure",
      "Amazon Web Services (AWS)",
      "Google Cloud Platform (GCP)",
      "Azure App Service",
      "AWS Lambda",
      "Docker",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    id: "devops-cicd",
    label: "DevOps & CI/CD",
    icon: GitBranch,
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Azure DevOps",
      "GitHub Actions",
      "Jenkins",
      "CI/CD Pipelines",
      "Infrastructure as Code",
    ],
  },
  {
    id: "testing-quality",
    label: "Testing & Quality Engineering",
    icon: CheckCircle2,
    items: [
      "Jest",
      "React Testing Library",
      "Cypress",
      "Playwright",
      "Selenium",
      "Postman",
      "Unit Testing",
      "Integration Testing",
    ],
  },
  {
    id: "security-monitoring",
    label: "Security & Monitoring",
    icon: ShieldCheck,
    items: [
      "OAuth 2.0",
      "OpenID Connect",
      "Role-Based Access Control (RBAC)",
      "OWASP Security Practices",
      "SonarQube",
      "Sentry",
      "Azure Monitor",
      "AWS CloudWatch",
    ],
  },
];

type Tech = {
  name: string;
  category: string;
  categoryIcon?: LucideIcon | React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  imgUrl: string | null;
};

/* -------------------------------------------------------------------------- */
/*  Single tech tile                                                          */
/* -------------------------------------------------------------------------- */
function TechTile({ tech }: { tech: Tech }) {
  const [failed, setFailed] = useState(false);
  const Icon = tech.categoryIcon;
  const showImg = Boolean(tech.imgUrl && !failed);

  return (
    <div className="tech-tile group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/80 py-2.5 pl-2.5 pr-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF5812]/60 hover:bg-white hover:shadow-[0_10px_30px_-10px_rgba(255,88,18,0.35)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-50 ring-1 ring-inset ring-zinc-200 transition-colors duration-300 group-hover:bg-orange-50 group-hover:ring-[#FF5812]/30">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tech.imgUrl || ""}
            alt={`${tech.name} logo for web application development`}
            width={24}
            height={24}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-6 w-6 object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : Icon ? (
          <Icon className="h-5 w-5 text-[#FF5812]" strokeWidth={1.5} />
        ) : (
          <span className="text-sm font-semibold text-[#FF5812]">
            {tech.name.charAt(0)}
          </span>
        )}
      </span>

      <span className="flex flex-col leading-tight">
        <span className="whitespace-nowrap text-sm font-semibold text-zinc-900">
          {tech.name}
        </span>
        <span className="whitespace-nowrap text-xs text-zinc-500">
          {tech.category}
        </span>
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee row                                                               */
/* -------------------------------------------------------------------------- */
function MarqueeRow({
  items,
  reverse = false,
  duration,
}: {
  items: Tech[];
  reverse?: boolean;
  duration: number;
}) {
  const repeated = useMemo(() => {
    if (items.length === 0) return [];
    let list = [...items];
    while (list.length < 14) {
      list = [...list, ...items];
    }
    return list;
  }, [items]);

  if (repeated.length === 0) return null;

  return (
    <div className="group/row relative flex w-full overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`marquee-track flex shrink-0 items-center gap-3 py-1.5 will-change-transform group-hover/row:[animation-play-state:paused] ${reverse ? "direction-reverse" : ""
          }`}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((tech, i) => (
          <TechTile key={`a-${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
      <div
        aria-hidden
        className={`marquee-track flex shrink-0 items-center gap-3 py-1.5 will-change-transform group-hover/row:[animation-play-state:paused] ${reverse ? "direction-reverse" : ""
          }`}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((tech, i) => (
          <TechTile key={`b-${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */
export function WebAppTechStack() {
  const [active, setActive] = useState<string>("All");

  const categories = webAppTechCategories;

  const allTechs = useMemo<Tech[]>(() => {
    const list: Tech[] = [];
    categories.forEach((cat) => {
      cat.items.forEach((itemName) => {
        list.push({
          name: itemName,
          category: cat.label,
          categoryIcon: cat.icon,
          imgUrl: techToImgUrl[itemName] ?? null,
        });
      });
    });
    return list;
  }, [categories]);

  const tabs = useMemo(() => ["All", ...categories.map((c) => c.label)], [categories]);

  const filtered = useMemo<Tech[]>(() => {
    if (active === "All") return allTechs;
    return allTechs.filter((t) => t.category === active);
  }, [active, allTechs]);

  const rows = useMemo<[Tech[], Tech[]]>(() => {
    const half = Math.ceil(filtered.length / 2);
    return [filtered.slice(0, half), filtered.slice(half)];
  }, [filtered]);

  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-white py-12 text-slate-900 md:py-20">
      {/* Backdrop: soft glow + dotted grid fading out toward the edges */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-orange-500/[0.06] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #e4e4e7 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        {/* ============================ HEADER ============================ */}
        <div className="mb-10 grid grid-cols-1 items-end gap-x-24 gap-y-6 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-medium text-[#FF5812]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5812] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
              </span>
              TECHNOLOGY STACK
            </span>

            <h2 className="typo-heading-2 text-slate-900 lg:pr-12">
              Technology Stack for{" "}
              <span className="bg-gradient-to-r from-[#FF5812] to-amber-500 bg-clip-text text-transparent">
                Web Application Development
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="typo-description w-full text-slate-500 lg:max-w-xl">
              Explore the technologies behind custom web applications, including modern frontend frameworks, backend platforms, databases, APIs, and cloud infrastructure for scalable business solutions.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              Explore technologies across{" "}
              <span className="font-semibold text-zinc-900">
                {categories.length}
              </span>{" "}
              categories of the web development stack. (
              <span className="font-semibold text-zinc-900">
                {allTechs.length}
              </span>{" "}
              tools)
            </p>
          </div>
        </div>

        {/* ========================= CATEGORY FILTER ====================== */}
        <div
          role="tablist"
          aria-label="Filter technologies by category"
          className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2 ${isActive
                  ? "border-[#FF5812] bg-[#FF5812] text-white shadow-[0_8px_20px_-8px_rgba(255,88,18,0.7)]"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-[#FF5812]/50 hover:text-[#FF5812]"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ======================== DUAL MARQUEE (contained) =============== */}
        <div key={active} className="marquee-fade-in flex flex-col gap-2.5 overflow-hidden">
          {rows.map((row, i) => (
            <MarqueeRow
              key={i}
              items={row}
              reverse={i === 1}
              duration={Math.max(30, row.length * 4.5)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation-name: marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 0.75rem));
          }
        }
        .marquee-fade-in {
          animation: marquee-fade 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes marquee-fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default WebAppTechStack;


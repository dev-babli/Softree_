import type { ComponentType } from "react"

/** Simplified Microsoft product marks for architecture / tech stack rows */

export function PowerAppsLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="8" fill="#742774" />
      <path
        d="M14 32V16h8.5c4.2 0 7 2.6 7 6.2 0 2.4-1.2 4.2-3.2 5.1L30 32h-5.2l-3.4-4.4H19v4.4H14zm5-8.6h3.2c1.5 0 2.4-.8 2.4-2.1s-.9-2.1-2.4-2.1H19v4.2z"
        fill="#fff"
      />
    </svg>
  )
}

export function DataverseLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="8" fill="#088142" />
      <ellipse cx="24" cy="20" rx="10" ry="6" fill="#fff" opacity="0.9" />
      <path d="M12 28c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="none" stroke="#fff" strokeWidth="3" />
      <ellipse cx="24" cy="30" rx="10" ry="5" fill="#fff" opacity="0.55" />
    </svg>
  )
}

export function PowerAutomateLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="8" fill="#0066FF" />
      <path
        d="M16 24c0-4.4 3.6-8 8-8h8v4h-8c-2.2 0-4 1.8-4 4s1.8 4 4 4h4v8h-4c-4.4 0-8-3.6-8-8z"
        fill="#fff"
      />
      <circle cx="32" cy="20" r="3" fill="#7FBAFF" />
    </svg>
  )
}

export function PowerBILogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="8" fill="#F2C811" />
      <rect x="14" y="26" width="5" height="10" rx="1" fill="#1a1a1a" />
      <rect x="21" y="20" width="5" height="16" rx="1" fill="#1a1a1a" />
      <rect x="28" y="14" width="5" height="22" rx="1" fill="#1a1a1a" />
    </svg>
  )
}

export function SharePointLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <circle cx="18" cy="18" r="10" fill="#036C70" />
      <circle cx="30" cy="30" r="12" fill="#1A9BA1" />
      <circle cx="32" cy="14" r="7" fill="#37C6D0" />
      <text x="24" y="42" textAnchor="middle" fill="#fff" fontSize="0" />
    </svg>
  )
}

export function AzureLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path d="M8 36L22 8l6 14 12-6L28 40H8z" fill="#0089D6" />
      <path d="M28 40l10-24 6 12-8 12H28z" fill="#50E6FF" opacity="0.85" />
    </svg>
  )
}

const TECH_LOGO_MAP: Record<string, ComponentType<{ className?: string }>> = {
  "Power Apps": PowerAppsLogo,
  Dataverse: DataverseLogo,
  "Power Automate": PowerAutomateLogo,
  "Power BI": PowerBILogo,
  SharePoint: SharePointLogo,
  Azure: AzureLogo,
}

export function TechLogo({
  name,
  className,
  variant = "dark",
}: {
  name: string
  className?: string
  variant?: "dark" | "light"
}) {
  const Logo = TECH_LOGO_MAP[name]
  if (Logo) return <Logo className={className} />
  const fallbackBg = variant === "light" ? "rgba(255,122,47,0.12)" : "#FF7A2F"
  const fallbackText = variant === "light" ? "#FF7A2F" : "#0a0a0a"
  return (
    <div
      className={`flex items-center justify-center rounded-lg text-xs font-bold ${className || "h-10 w-10"}`}
      style={{ backgroundColor: fallbackBg, color: fallbackText }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

export const ARCHITECTURE_NODES = [
  { key: "users", title: "Users", subtitle: "Plant & HQ Teams", logo: null as null },
  {
    key: "power-apps",
    title: "Power Apps",
    subtitle: "Portals & Apps",
    logo: "Power Apps" as const,
  },
  {
    key: "dataverse",
    title: "Dataverse",
    subtitle: "Secure Data Layer",
    logo: "Dataverse" as const,
  },
  {
    key: "power-automate",
    title: "Power Automate",
    subtitle: "Workflows",
    logo: "Power Automate" as const,
  },
  {
    key: "power-bi",
    title: "Power BI",
    subtitle: "Analytics & Insights",
    logo: "Power BI" as const,
  },
] as const

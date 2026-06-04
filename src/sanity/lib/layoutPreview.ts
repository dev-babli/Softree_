export function getSiteOrigin(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

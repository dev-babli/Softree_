/** Same-origin internal paths eligible for Barba transitions. */

export function isInternalLink(href: string, origin = typeof window !== "undefined" ? window.location.origin : ""): boolean {

  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {

    return false

  }

  try {

    const url = new URL(href, origin || "http://localhost")

    if (origin && url.origin !== origin) return false

    return url.pathname.startsWith("/")

  } catch {

    return href.startsWith("/")

  }

}



export function pathnameToNamespace(pathname: string): string {

  const clean = pathname.replace(/^\/+|\/+$/g, "") || "home"

  return clean.replace(/\//g, "-")

}



/** Human-readable page title for transition UI. */

export function pathnameToLabel(pathname: string): string {

  const clean = pathname.replace(/^\/+|\/+$/g, "")

  if (!clean) return "Home"



  const last = clean.split("/").pop() ?? clean

  return last

    .split("-")

    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))

    .join(" ")

}



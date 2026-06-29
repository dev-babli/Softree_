export const DEFAULT_CALENDLY_URL =
  "https://calendly.com/shradhabhagat/new-meeting";

export type CalendlyPageTheme = "cream" | "light" | "dark";

export const CALENDLY_PAGE_SETTINGS: Record<
  CalendlyPageTheme,
  { backgroundColor: string; textColor: string; primaryColor: string }
> = {
  cream: {
    backgroundColor: "fafaf8",
    textColor: "1a1a1a",
    primaryColor: "ff5812",
  },
  light: {
    backgroundColor: "ffffff",
    textColor: "1a1a1a",
    primaryColor: "ff5812",
  },
  dark: {
    backgroundColor: "09090d",
    textColor: "ffffff",
    primaryColor: "ff5812",
  },
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        pageSettings?: {
          backgroundColor?: string;
          textColor?: string;
          primaryColor?: string;
        };
      }) => void;
    };
  }
}

/** Strip Calendly chrome so our frame owns the header/design. */
export function buildCalendlyUrl(base: string) {
  try {
    const url = new URL(base);
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("hide_landing_page_details", "1");
    url.searchParams.set("hide_event_type_details", "1");
    return url.toString();
  } catch {
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1`;
  }
}

export function loadCalendlyAssets() {
  if (typeof window === "undefined") return Promise.resolve();

  return new Promise<void>((resolve) => {
    if (window.Calendly) {
      resolve();
      return;
    }

    if (!document.getElementById("calendly-stylesheet")) {
      const link = document.createElement("link");
      link.id = "calendly-stylesheet";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById("calendly-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

export function openCalendlyPopup(url: string) {
  return loadCalendlyAssets().then(() => {
    window.Calendly?.initPopupWidget({ url: buildCalendlyUrl(url) });
  });
}

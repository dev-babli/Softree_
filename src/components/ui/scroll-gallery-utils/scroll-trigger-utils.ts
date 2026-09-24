/**
 * ScrollTrigger utility helpers for ScrollGallery
 */

export function isWindowScroller(scroller: Element | Window): boolean {
  if (typeof window === "undefined") return true;
  return (
    scroller === window ||
    scroller === document.documentElement ||
    scroller === document.body
  );
}

export function observeWindowResize(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback, { passive: true });
  return () => {
    window.removeEventListener("resize", callback);
  };
}

export function waitForScrollerReady(scroller?: Element | Window): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    if (document.readyState === "complete" || document.readyState === "interactive") {
      requestAnimationFrame(() => resolve());
    } else {
      const onLoad = () => {
        window.removeEventListener("DOMContentLoaded", onLoad);
        window.removeEventListener("load", onLoad);
        requestAnimationFrame(() => resolve());
      };
      window.addEventListener("DOMContentLoaded", onLoad);
      window.addEventListener("load", onLoad);
    }
  });
}

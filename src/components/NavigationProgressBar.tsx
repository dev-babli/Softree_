"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentUrlRef = useRef("");

  const startProgress = () => {
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    setVisible(true);
    setProgress(15);

    // Trickle progress up to 85%
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 85;
        }
        // Step dynamically: faster at start, slower near 85
        const step = Math.max(1, (85 - prev) * 0.15);
        return Math.min(85, prev + step);
      });
    }, 150);
  };

  const completeProgress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setProgress(100);

    finishTimerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  };

  // Complete progress on route change
  useEffect(() => {
    const fullUrl = `${pathname}?${searchParams.toString()}`;
    if (currentUrlRef.current && currentUrlRef.current !== fullUrl) {
      completeProgress();
    }
    currentUrlRef.current = fullUrl;
  }, [pathname, searchParams]);

  // Intercept internal link clicks and back/forward navigation
  useEffect(() => {
    const isInternalLink = (url: URL) => {
      return (
        url.origin === window.location.origin &&
        !url.pathname.startsWith("/api") &&
        !url.pathname.startsWith("/studio")
      );
    };

    const handleClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as Element | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
      if (anchor.getAttribute("target") === "_blank" || anchor.hasAttribute("download")) return;

      try {
        const targetUrl = new URL(anchor.href, window.location.origin);
        if (!isInternalLink(targetUrl)) return;

        // Same page link click (ignoring hash)
        if (
          targetUrl.pathname === window.location.pathname &&
          targetUrl.search === window.location.search
        ) {
          return;
        }

        startProgress();
      } catch {
        // invalid URL, ignore
      }
    };

    const handlePopState = () => {
      startProgress();
    };

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      if (timerRef.current) clearInterval(timerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 pointer-events-none z-[999999]"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease-out",
      }}
    >
      <div
        className="h-[3px] bg-gradient-to-r from-[#FF5812] via-[#FF7A3D] to-[#FFA070] shadow-[0_0_12px_rgba(255,88,18,0.7),0_0_4px_rgba(255,88,18,0.9)]"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 200ms ease-out" : "width 180ms ease-out",
        }}
      />
    </div>
  );
}

export default function NavigationProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarInner />
    </Suspense>
  );
}

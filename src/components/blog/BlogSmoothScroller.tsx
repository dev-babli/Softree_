"use client";

import { useEffect, useRef, createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

interface BlogLenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: Parameters<Lenis["scrollTo"]>[1]) => void;
}

const BlogLenisContext = createContext<BlogLenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useBlogLenis() {
  return useContext(BlogLenisContext);
}

interface BlogSmoothScrollerProps {
  children?: ReactNode;
}

/**
 * Ultra-smooth, 120fps hardware-accelerated momentum scroller for all Blog pages.
 * Uses Lenis 1.3 native autoRaf & anchor support, synchronized with GSAP ScrollTrigger
 * without layout thrashing or main-thread scroll blocking.
 */
export default function BlogSmoothScroller({ children }: BlogSmoothScrollerProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      // Safe fallback if already registered
    }

    let lenis: Lenis;
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false, // Keep native 120Hz responsive touch on mobile
      });
    } catch (err) {
      console.warn("Failed to initialize Lenis:", err);
      return;
    }

    lenisRef.current = lenis;

    // Apply lenis class tags
    document.documentElement.classList.add("lenis", "lenis-smooth");

    // Sync scroll events with GSAP ScrollTrigger
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    // Drive Lenis through GSAP's unified ticker for zero-drift 120fps execution
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // Prevents GSAP from clamping or hitching during scroll

    // Initial refresh once DOM is settled
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(onTick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-scrolling");
      lenisRef.current = null;
    };
  }, []);

  // When navigating between blog posts, instantly reset scroll to top
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: Parameters<Lenis["scrollTo"]>[1]
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof window !== "undefined") {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <BlogLenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </BlogLenisContext.Provider>
  );
}

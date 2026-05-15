"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import ThemeToggle from "./components/ThemeToggle";
import ContactHero from "./components/ContactHero";
import ContactFooter from "./components/ContactFooter";

const Orb = dynamic(() => import("./components/Orb"), { ssr: false });

export default function ContactPage() {
  const [dark, setDark] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const toggleTheme = useCallback(() => setDark((d) => !d), []);

  // Apply theme class to html element
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("contact-theme");
    if (dark) html.classList.add("dark");
    else html.classList.remove("dark");
    return () => {
      html.classList.remove("contact-theme", "dark");
    };
  }, [dark]);

  // Lenis smooth scroll (dynamic import to avoid SSR issues)
  useEffect(() => {
    if (!loaded) return;
    let cleanup: (() => void) | undefined;
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      cleanup = () => { lenis.destroy(); cancelAnimationFrame(rafId); };
    });
    return () => { cleanup?.(); };
  }, [loaded]);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <CustomCursor />
          <Orb />
          <ThemeToggle dark={dark} onToggle={toggleTheme} />
          <main className="relative z-10 min-h-screen">
            <ContactHero />
            <ContactFooter />
          </main>
        </>
      )}
    </>
  );
}

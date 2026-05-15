"use client";

import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import Orb from "./components/Orb";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import ThemeToggle from "./components/ThemeToggle";
import ContactHero from "./components/ContactHero";
import ContactFooter from "./components/ContactFooter";

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

  // Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
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

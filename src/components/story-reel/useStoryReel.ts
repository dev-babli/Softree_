"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type TouchEvent,
} from "react";

const DEFAULT_INTERVAL = 5000;

export function useStoryReel(
  storyCount: number,
  autoPlayInterval = DEFAULT_INTERVAL,
  onStoryChange?: (index: number) => void,
  enableKeyboard = true,
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const goTo = useCallback(
    (index: number, direction?: number) => {
      if (storyCount === 0) return;
      const clamped = Math.max(0, Math.min(index, storyCount - 1));
      const prev = activeIndexRef.current;
      const dir =
        direction ??
        (clamped === prev
          ? 1
          : clamped > prev || (prev === storyCount - 1 && clamped === 0)
            ? 1
            : -1);
      setSlideDirection(dir);
      setActiveIndex(clamped);
      setProgress(0);
      onStoryChange?.(clamped);
    },
    [storyCount, onStoryChange],
  );

  const goNext = useCallback(() => {
    const next = (activeIndexRef.current + 1) % storyCount;
    goTo(next, 1);
  }, [storyCount, goTo]);

  const goPrev = useCallback(() => {
    const next = (activeIndexRef.current - 1 + storyCount) % storyCount;
    goTo(next, -1);
  }, [storyCount, goTo]);

  useEffect(() => {
    if (storyCount === 0 || isPaused) return;

    let rafId = 0;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / autoPlayInterval) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        const next = (activeIndexRef.current + 1) % storyCount;
        goTo(next, 1);
        return;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [activeIndex, isPaused, autoPlayInterval, storyCount, goTo]);

  useEffect(() => {
    if (!enableKeyboard) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboard, goPrev, goNext]);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].screenX;
      const threshold = 50;
      if (diff > threshold) goNext();
      if (diff < -threshold) goPrev();
      touchStartX.current = null;
    },
    [goNext, goPrev],
  );

  const jumpTo = useCallback(
    (index: number) => {
      if (index === activeIndexRef.current) return;
      const dir =
        index > activeIndexRef.current ||
        (activeIndexRef.current === storyCount - 1 && index === 0)
          ? 1
          : -1;
      goTo(index, dir);
    },
    [storyCount, goTo],
  );

  return {
    activeIndex,
    isPaused,
    progress,
    slideDirection,
    setIsPaused,
    goNext,
    goPrev,
    goTo,
    jumpTo,
    handleTouchStart,
    handleTouchEnd,
  };
}

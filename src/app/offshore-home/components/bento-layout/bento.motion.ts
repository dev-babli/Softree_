/** Motion tokens — opacity + transform only; short durations for 60fps scroll. */

export const BENTO_EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const BENTO_VIEWPORT = {
  once: true,
  margin: "-60px" as const,
  amount: 0.12 as const,
};

export const BENTO_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 34,
  mass: 0.8,
};

export function scrollReveal(
  reduced: boolean,
  options?: { delay?: number; y?: number; x?: number },
) {
  const delay = options?.delay ?? 0;
  const y = options?.y ?? 14;
  const x = options?.x ?? 0;

  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.15, delay } },
    };
  }

  return {
    hidden: { opacity: 0, y, x },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.45, ease: BENTO_EASE_OUT, delay },
    },
  };
}

export function panelReveal(reduced: boolean, delay = 0) {
  if (reduced) {
    return scrollReveal(reduced, { delay });
  }

  return {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: BENTO_EASE_OUT, delay },
    },
  };
}

/** Crossfade only — no scale on full-bleed photos (avoids jank). */
export function previewSwap(reduced: boolean) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.12 },
    };
  }

  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.32, ease: BENTO_EASE_OUT },
  };
}

export function captionStagger(reduced: boolean) {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.12 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.32, ease: BENTO_EASE_OUT },
    },
  };
}

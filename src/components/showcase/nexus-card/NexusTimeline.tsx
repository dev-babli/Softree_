"use client";

const TICK_COUNT = 62;
const MAIN_STEPS = [22, 42, 61] as const;

export function NexusTimeline({ activeStep }: { activeStep: number }) {
  return (
    <div className="nexus-timeline" aria-hidden>
      <div className="nexus-timeline__chart">
        {Array.from({ length: TICK_COUNT }).map((_, i) => {
          const stepIndex = MAIN_STEPS.indexOf(i as (typeof MAIN_STEPS)[number]);
          const isMain = stepIndex >= 0;
          const isActive = isMain && activeStep === stepIndex;
          const scaleY = isActive ? 1 : isMain ? 0.66 : 0.5;

          return (
            <span
              key={i}
              className={`nexus-timeline__tick${isMain ? " nexus-timeline__tick--main" : ""}${isActive ? " nexus-timeline__tick--active" : ""}`}
              style={{ transform: `scaleY(${scaleY})` }}
            >
              {isMain ? (
                <span
                  className={`nexus-timeline__step-label${isActive ? " nexus-timeline__step-label--active" : ""}`}
                >
                  Step&nbsp;{stepIndex + 1}
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}

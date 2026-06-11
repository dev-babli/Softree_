"use client";

const TICKS = 58;
/** Step marker positions (tick index) — matches follow.art spacing */
const STEP_TICKS = [14, 30, 52] as const;

export function NexusTimeline({
  activeStep,
  hidden,
}: {
  activeStep: number;
  hidden?: boolean;
}) {
  if (hidden) return null;

  return (
    <div className="nexus-timeline">
      <div className="nexus-timeline__chart">
        {Array.from({ length: TICKS }).map((_, i) => {
          const stepIdx = STEP_TICKS.indexOf(i as (typeof STEP_TICKS)[number]);
          const isMarker = stepIdx >= 0;
          const isActive = stepIdx === activeStep;

          return (
            <span
              key={i}
              className={[
                "nexus-timeline__tick",
                isMarker ? "nexus-timeline__tick--marker" : "",
                isActive ? "nexus-timeline__tick--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isMarker ? (
                <span
                  className={[
                    "nexus-timeline__step",
                    isActive ? "nexus-timeline__step--active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  Step&nbsp;{stepIdx + 1}
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}

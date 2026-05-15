import Image from "next/image"

export function ReactBeforeAfterScroll() {
  return (
    <section className="rw-comparison" id="transformation" aria-labelledby="react-web-transform-title">
      <div className="rw-comparison-grid">
        <div className="rw-reveal">
          <p className="rw-eyebrow">Scroll transformation</p>
          <h2 className="rw-heading" id="react-web-transform-title">
            From a static page to a React system with a reason to move.
          </h2>
          <p className="rw-copy">
            The downloaded image-comparison component becomes a service story: before is unclear,
            fragile, and slow to change; after is structured, componentized, and ready to launch.
          </p>
        </div>

        <div className="rw-comparison-window" aria-label="Before and after React build comparison">
          <div className="rw-compare-panel rw-before-panel">
            <div className="rw-before-grid">
              <div>
                <h3>Before</h3>
                <p>Unclear offer, weak visual hierarchy, scattered proof, and no reusable system.</p>
              </div>
              <div className="rw-asset-card">
                <Image
                  src="/web-development-story/story-discovery.svg"
                  alt="Discovery illustration for unclear website structure"
                  width={520}
                  height={360}
                />
              </div>
            </div>
          </div>

          <div className="rw-compare-panel rw-after-shell">
            <div className="rw-after-inner">
              <div className="rw-after-grid">
                <div>
                  <h3>After</h3>
                  <p>React sections, fast assets, sharp CTA logic, and a page system ready to reuse.</p>
                </div>
                <div className="rw-asset-card">
                  <Image
                    src="/web-development-story/story-launch.svg"
                    alt="Launch illustration for optimized React website system"
                    width={520}
                    height={360}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rw-compare-handle" aria-hidden />
        </div>
      </div>
    </section>
  )
}

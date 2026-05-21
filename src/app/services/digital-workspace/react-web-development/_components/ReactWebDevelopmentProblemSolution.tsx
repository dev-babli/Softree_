import { painPoints } from "./react-web-development-data"

export function ReactWebDevelopmentProblemSolution() {
  return (
    <section className="rw-section" aria-labelledby="react-web-problem-title">
      <div className="rw-container rw-split">
        <div className="rw-reveal">
          <p className="rw-eyebrow">Why this page exists</p>
          <h2 className="rw-heading" id="react-web-problem-title">
            Most service websites explain the work. The best ones make the buyer feel the change.
          </h2>
          <p className="rw-copy">
            This React page should not look like another agency template. It should prove that
            Softree can turn a technical service into a sales interface.
          </p>
        </div>
        <div className="rw-pain-list rw-reveal">
          {painPoints.map((point) => (
            <article className="rw-pain-card" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

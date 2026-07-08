'use client'

const STEPS = [
  {
    title: 'Create',
    text: 'Use New case study or New blog post — one path each, no template maze.',
  },
  {
    title: 'Fill & build',
    text: 'Story tab first, then Page sections. The in-doc guide tracks your progress.',
  },
  {
    title: 'Preview & publish',
    text: 'Open Presentation or Live preview, then Publish when readiness hits 100%.',
  },
] as const

export function DashboardGettingStarted() {
  return (
    <section className="softree-dash__panel softree-dash__onboarding">
      <div className="softree-dash__panel-head">
        <h2 className="softree-dash__panel-title softree-dash__panel-title--friendly">How it works</h2>
      </div>
      <ol className="softree-dash__onboarding-steps">
        {STEPS.map((step, index) => (
          <li key={step.title} className="softree-dash__onboarding-step">
            <span className="softree-dash__onboarding-num">{index + 1}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

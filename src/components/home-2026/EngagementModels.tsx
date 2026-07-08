/**
 * EngagementModels — three ways in. Story-spec §8. SERVER COMPONENT.
 * Asymmetric 12-col grid (5/4/3) — explicitly NOT a uniform bento.
 * content-visibility: auto allowed here (truly static section; intrinsic
 * size approximates rendered height to keep ScrollTriggers below stable).
 */
import ModelCard, { type EngagementModel } from "./ModelCard";
import Reveal from "./lib/Reveal";

// TODO(verify): align terms with real /services + /contact copy before ship.
const MODELS: EngagementModel[] = [
  {
    tag: "MODEL A — DEDICATED POD",
    title: "A senior team of 4–8, yours end-to-end.",
    copy: "Interview once, start in two weeks. The pod runs your roadmap with its own delivery lead, measured on your dashboards.",
    href: "/services",
    span: "lg:col-span-5",
  },
  {
    tag: "MODEL B — EMBEDDED ENGINEERS",
    title: "Seniors who join your standups.",
    copy: "Your repos, your rituals, your on-call. Individual senior engineers embedded directly into existing squads.",
    href: "/services",
    span: "lg:col-span-4",
  },
  {
    tag: "MODEL C — AI DELIVERY SPRINT",
    title: "Use-case to deployed AI, fixed scope.",
    copy: "A focused sprint from problem framing to a deployed AI workflow — priced fixed, shipped with evals.",
    href: "/services/offshore-ai-development",
    span: "lg:col-span-3",
  },
];

export default function EngagementModels() {
  return (
    <section
      id="models"
      aria-labelledby="models-heading"
      className="hairline-t px-6 py-28 sm:px-10 lg:px-24"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 720px" }}
    >
      <Reveal as="h2" className="font-mono-meta text-white/55">
        <span id="models-heading">Three ways in.</span>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        {MODELS.map((m, i) => (
          <ModelCard key={m.tag} model={m} index={i} />
        ))}
      </div>
    </section>
  );
}

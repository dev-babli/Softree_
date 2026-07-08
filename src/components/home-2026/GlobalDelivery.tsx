/**
 * GlobalDelivery — the model, mapped honestly. Story-spec §7. SERVER COMPONENT.
 * Stats + industry line SSR'd; map/markers/clocks live in the client leaf.
 */
import GlobalDeliveryClient from "./GlobalDeliveryClient";
import Reveal from "./lib/Reveal";

// TODO(verify): confirm stat claims against live site content before ship.
const STATS = [
  { value: "140+", label: "ENGINEERS" },
  { value: "12h", label: "OVERLAP GUARANTEED" },
  { value: "4", label: "CONTINENTS SERVED" },
] as const;

const INDUSTRY_LINE = "FINTECH / RETAIL / MANUFACTURING / HEALTHCARE / EDTECH / ENTERPRISE IT";

export default function GlobalDelivery() {
  return (
    <section id="global" aria-labelledby="global-heading" className="hairline-t px-6 py-28 sm:px-10 lg:px-24">
      <Reveal as="h2" className="font-mono-meta text-white/55">
        <span id="global-heading">One delivery hub. Your timezone covered.</span>
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="hairline-t pt-4">
            <div
              className="font-semibold text-white"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
            >
              {s.value}
            </div>
            <div className="font-mono-meta mt-2 text-white/35">{s.label}</div>
          </div>
        ))}
      </div>

      <GlobalDeliveryClient />

      <p className="font-mono-meta mt-8 text-white/35">{INDUSTRY_LINE}</p>
    </section>
  );
}

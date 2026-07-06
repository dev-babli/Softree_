/**
 * Manifesto — the thesis. Story-spec §3. SERVER COMPONENT.
 * Header reveals via the shared client <Reveal>; everything else renders instantly.
 */
import Reveal from "./lib/Reveal";

const NOTES = [
  "NO BODYSHOPS",
  "SENIOR-ONLY PODS",
  "YOUR TOOLS, YOUR REPOS",
  "MEASURED ON YOUR DASHBOARDS",
] as const;

export default function Manifesto() {
  return (
    <section id="manifesto" aria-labelledby="manifesto-heading" className="px-6 py-28 sm:px-10 lg:px-24 lg:py-40">
      <Reveal as="h2" className="font-mono-meta text-white/55">
        <span id="manifesto-heading">Offshore has a trust problem. We fixed it with proof.</span>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <p
          className="max-w-[60ch] font-semibold text-white lg:col-span-8"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
        >
          Most offshore vendors sell resumes. We sell running teams — senior pods you interview
          once, who ship from week two, measured on the same dashboards you use.
        </p>

        <ul className="font-mono-meta flex flex-row flex-wrap gap-x-8 gap-y-3 self-end text-white/35 lg:col-span-4 lg:flex-col lg:gap-4">
          {NOTES.map((n) => (
            <li key={n} className="hairline-b pb-2 lg:pb-3">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

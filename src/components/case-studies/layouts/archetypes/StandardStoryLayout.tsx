"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import CaseStudyDownloadButton from "@/components/case-studies/CaseStudyDownloadButton";
import { buildCaseStudyJsonLd } from "@/lib/structured-data";
import { sharedPortableTextTypes } from "@/components/portable-text/contentBlockTypes";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type SanityImage = { asset?: { url?: string } | null; alt?: string; caption?: string } | null;
type PTBlock = { _type: string; style?: string; children?: Array<{ text?: string }>; _key?: string; listItem?: string; level?: number };
type Metric = { label?: string; value?: string; description?: string };
type RelatedStudy = { _id: string; title: string; slug: { current: string }; industry?: string; excerpt?: string; client?: string; mainImage?: SanityImage; mainImageUrl?: string };

type StudyData = {
  _id: string; _updatedAt?: string; title: string; slug: { current: string }; headerTitle?: string; excerpt?: string; industry?: string; useCase?: string; client?: string; location?: string; clientDetails?: string; companySize?: string; employees?: string; scaleOfOperation?: string; projectDuration?: string; duration?: string; teamSize?: string; technologies?: string[]; highlights?: Array<{ value: string; label: string }>; metrics?: Metric[]; keyResults?: Array<{ value: string; label: string }>; mainImage?: SanityImage; mainImageUrl?: string; heroImage?: SanityImage; clientLogo?: SanityImage; pdfUrl?: string; liveUrl?: string; challengeSummary?: string; challenge?: PTBlock[] | string; challengeContent?: PTBlock[]; approachSummary?: string; approach?: PTBlock[] | string; solution?: PTBlock[] | string; approachContent?: PTBlock[]; outcomeSummary?: string; outcome?: PTBlock[] | string; result?: string; outcomeContent?: PTBlock[]; body?: PTBlock[]; rawResults?: string[] | Metric[]; testimonial?: { quote?: string; name?: string; role?: string; avatar?: { asset?: { url?: string } } | null; headshot?: { asset?: { url?: string } } | null } | null; gallery?: Array<{ asset?: { url?: string }; alt?: string; caption?: string }>; galleryUrls?: Array<{ url?: string; alt?: string; caption?: string }>; pullQuoteImage?: SanityImage; publishedAt?: string;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function slugify(input: string): string { return input.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80); }
function getHeadingText(block: PTBlock): string { return (block.children || []).map((c) => c?.text || "").join(" ").trim(); }
function asPT(input: unknown): PTBlock[] { if (typeof input === "string" && input.trim()) return [{ _type: "block", style: "normal", children: [{ text: input }] }]; if (Array.isArray(input)) return input as PTBlock[]; if (input && typeof input === "object") return [input as PTBlock]; return []; }

/* ------------------------------------------------------------------ */
/* Subcomponents                                                      */
/* ------------------------------------------------------------------ */

function HeroHighlight({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-[clamp(2rem,3vw,2.6rem)] font-bold leading-none tracking-[-0.02em] text-white">{value}</div>
      <div className="max-w-[16ch] text-[0.95rem] leading-[1.4] text-white/75">{label}</div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6b7694]">{label}</div>
      <div className="text-[1rem] font-medium leading-[1.4] text-[#0d0a23]">{value || "—"}</div>
    </div>
  );
}

function RelatedCard({ study }: { study: RelatedStudy }) {
  const img = study.mainImage?.asset?.url || study.mainImageUrl;
  const display = study.client || study.title;
  return (
    <Link href={`/case-studies/${study.slug.current}`} className="group flex h-full flex-col gap-5 rounded-[18px] bg-white p-5 transition-transform duration-200 ease-out hover:-translate-y-0.75">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[14px] bg-[#efeae0]">
        {img ? <Image src={img} alt={study.mainImage?.alt || display} fill unoptimized sizes="400px" className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" /> : <div className="absolute inset-0 flex items-center justify-center text-[#6b7694]">{display}</div>}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
        <div className="text-[13px] font-semibold text-[#1852ff]">{study.industry || "Customer Story"}</div>
        <h3 className="text-[1.55rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#171717]">{display}</h3>
        {study.excerpt ? <p className="line-clamp-3 text-[15px] leading-[1.55] text-[#4c5366]">{study.excerpt}</p> : null}
        <div className="mt-auto pt-3">
          <span className="inline-flex items-center rounded-full border border-[#191919] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#191919] transition-colors duration-200 group-hover:bg-[#191919] group-hover:text-white">read case study</span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function StandardStoryLayout({
  study,
  related,
  slug,
}: {
  study: StudyData;
  related: RelatedStudy[];
  slug: string;
}) {
  const clientName = study.client || study.title;
  const headerTitle = study.headerTitle || (study.client && study.client !== study.title ? study.title : "");
  const excerptText = study.excerpt || "";
  const downloadUrl = study.pdfUrl;
  const heroImageUrl = study.mainImage?.asset?.url || study.mainImageUrl;

  const clientDetailsText = useMemo(() => {
    const details = study.clientDetails || study.location;
    const studyTitle = study.title || "AI-driven analytics and automation";
    const studyRegion = study.region || "multiple international markets";

    const rawText = (() => {
      if (details && details.trim()) return details;
      const size = (study.companySize || "enterprise").toLowerCase();
      const sizeDesc = size === "startup" ? "A startup" : size === "mid-market" ? "A mid-market enterprise" : "A global enterprise";
      return `${sizeDesc} in the IT services sector, operating across ${studyRegion} and managing a complex IT environment. The client partnered with Softree Technology to leverage ${studyTitle} for improved IT service management and operational efficiency.`;
    })();

    const escapeRegExp = (str: string) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const searchTerms = [studyRegion, studyTitle].filter((t) => t && t.trim() !== "");
    if (searchTerms.length === 0) return rawText;

    const pattern = `(${searchTerms.map(escapeRegExp).join("|")})`;
    const regex = new RegExp(pattern, "gi");
    const parts = rawText.split(regex);

    return (
      <>
        {parts.map((part, idx) => {
          const isMatch = searchTerms.some((t) => t.toLowerCase() === part.toLowerCase());
          if (isMatch) {
            return (
              <span key={idx} className="font-bold text-[#5a17ee]" style={{ color: "#5a17ee" }}>
                {part}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  }, [study.clientDetails, study.location, study.title, study.region, study.companySize]);

  const challenge = asPT(study.challengeContent ?? study.challenge);
  const approach = asPT(study.approachContent ?? study.approach ?? study.solution);
  const outcome = asPT(study.outcomeContent ?? study.outcome ?? study.result);
  const extra = asPT(study.body);
  const legacyResults = useMemo(
    () => (Array.isArray(study.rawResults) ? (study.rawResults as Array<string | Metric>).filter((r): r is string => typeof r === "string") : []),
    [study.rawResults]
  );

  const articleBody = useMemo(() => {
    const body: PTBlock[] = [];
    const pushH2 = (k: string, t: string) => body.push({ _type: "block", _key: k, style: "h2", children: [{ text: t }] });

    const hasChallenge = challenge.length > 0 || !!study.challengeSummary;
    const hasSolution = approach.length > 0 || !!study.approachSummary;
    const hasResults = outcome.length > 0 || !!study.outcomeSummary;

    if (hasChallenge || hasSolution || hasResults || legacyResults.length > 0) {
      if (hasChallenge) { pushH2("h2-challenge", "The Challenge"); if (study.challengeSummary) body.push({ _type: "block", _key: "p-cs", style: "normal", children: [{ text: study.challengeSummary }] }); body.push(...challenge); }
      if (hasSolution) { pushH2("h2-solution", "The Solution"); if (study.approachSummary) body.push({ _type: "block", _key: "p-as", style: "normal", children: [{ text: study.approachSummary }] }); body.push(...approach); }
      if (hasResults || legacyResults.length > 0) { pushH2("h2-results", "The Results"); if (study.outcomeSummary) body.push({ _type: "block", _key: "p-os", style: "normal", children: [{ text: study.outcomeSummary }] }); body.push(...outcome); if (!hasResults && legacyResults.length > 0) legacyResults.forEach((line, i) => body.push({ _type: "block", _key: `lr-${i}`, style: "normal", listItem: "bullet", level: 1, children: [{ text: line }] })); }
      if (extra.length > 0) body.push(...extra);
    } else if (extra.length > 0) body.push(...extra);
    return body;
  }, [challenge, approach, outcome, extra, study.challengeSummary, study.approachSummary, study.outcomeSummary, legacyResults]);

  const headings = useMemo(() => {
    const h: { id: string; text: string }[] = [];
    articleBody.forEach((b) => { if (b && b._type === "block" && b.style === "h2") { const t = getHeadingText(b); if (t) { const id = slugify(t); if (!h.find((x) => x.id === id)) h.push({ id, text: t }); } } });
    return h;
  }, [articleBody]);

  const ptComponents = {
    block: {
      h1: ({ children }: { children?: React.ReactNode }) => <h1 className="mt-12 mb-6 text-[2rem] md:text-[2.4rem] font-bold tracking-[-0.03em] text-[#0d0a23]">{children}</h1>,
      h2: ({ children, value }: { children?: React.ReactNode; value?: PTBlock | unknown }) => { const t = getHeadingText((value as PTBlock | undefined) || { _type: "block" }); const id = slugify(t || "section"); return <h2 id={id} className="scroll-mt-32 mt-14 mb-5 text-[1.75rem] md:text-[2.1rem] font-bold tracking-[-0.02em] text-[#0d0a23]">{children}</h2>; },
      h3: ({ children }: { children?: React.ReactNode }) => <h3 className="mt-10 mb-3 text-[1.25rem] md:text-[1.45rem] font-bold tracking-tight text-[#0d0a23]">{children}</h3>,
      normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-6 text-[1.02rem] md:text-[1.06rem] leading-[1.75] text-[#37354a]">{children}</p>,
      blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="my-8 rounded-[14px] border border-[#e6e1f2] bg-[#f3eefe] px-6 py-5 text-[1.05rem] leading-[1.7] text-[#2a1f82]">{children}</blockquote>,
    },
    list: { bullet: ({ children }: { children?: React.ReactNode }) => <ul className="mb-7 list-disc space-y-2.5 pl-6 text-[1.02rem] leading-[1.75] text-[#37354a] marker:text-[#5a17ee]">{children}</ul>, number: ({ children }: { children?: React.ReactNode }) => <ol className="mb-7 list-decimal space-y-2.5 pl-6 text-[1.02rem] leading-[1.75] text-[#37354a] marker:text-[#5a17ee]">{children}</ol> },
    marks: { strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold text-[#0d0a23]">{children}</strong>, link: ({ value, children }: { value?: { href?: string; blank?: boolean }; children?: React.ReactNode }) => <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noopener noreferrer" : undefined} className="font-medium text-[#5a17ee] underline underline-offset-4 decoration-[#5a17ee]/40 transition-colors hover:decoration-[#5a17ee]">{children}</a> },
    types: { ...sharedPortableTextTypes, image: ({ value }: { value?: SanityImage }) => { const url = value?.asset?.url; if (!url) return null; return (<figure className="my-10 overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-white shadow-sm"><div className="relative w-full aspect-video"><Image src={url} alt={value?.alt || "Illustration"} fill unoptimized className="object-cover" sizes="760px" /></div>{value?.caption ? <figcaption className="px-4 py-3 text-center text-xs font-medium text-[#6b7694]">{value.caption}</figcaption> : null}</figure>); } },
  };

  let heroHighlights = Array.isArray(study.highlights) ? study.highlights : [];
  if (heroHighlights.length === 0 && Array.isArray(study.metrics)) heroHighlights = study.metrics.slice(0, 3).map((m) => ({ value: m.value || "", label: m.label || m.description || "" })).filter((h) => h.value);
  if (heroHighlights.length === 0 && Array.isArray(study.keyResults)) heroHighlights = study.keyResults.slice(0, 3).map((r) => ({ value: r.value, label: r.label })).filter((h) => h.value);
  if (heroHighlights.length === 0 && legacyResults.length > 0) heroHighlights = legacyResults.slice(0, 3).map((r) => { const m = r.match(/^([^\s]+(?:\s*[%x])?)\s+(.+)$/); if (m) return { value: m[1], label: m[2] }; return { value: r, label: "" }; });

  const galleryItems = [
    ...(study.gallery || []).filter((g) => g?.asset?.url).map((g) => ({ url: g.asset!.url!, alt: g.alt, caption: g.caption })),
    ...(study.galleryUrls || []).filter((g) => g?.url).map((g) => ({ url: g.url!, alt: g.alt, caption: g.caption })),
  ];

  return (
    <div className="min-h-screen bg-white text-[#0d0a23]">
      <NavigationClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCaseStudyJsonLd({ headline: study.title, description: excerptText, url: `https://www.softreetechnology.com/case-studies/${slug}`, datePublished: study.publishedAt, dateModified: study._updatedAt, image: heroImageUrl, clientName: study.client })) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d0a23] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[54px_54px]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_bottom,rgba(91,79,233,0.32)_0%,transparent_65%)]" />
        <div className="relative mx-auto w-full max-w-310 px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-36 lg:pt-40">
          <h1 className="text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white">{clientName}</h1>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:items-stretch lg:gap-12">
            <div className="relative min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl ring-1 ring-white/10">
              {heroImageUrl ? <Image src={heroImageUrl} alt={study.mainImage?.alt || clientName} fill unoptimized priority sizes="650px" className="object-cover object-top" /> : <div className="absolute inset-0 flex items-center justify-center text-white/50">No hero image</div>}
            </div>
            <div className="flex flex-col justify-center">
              {headerTitle ? <h2 className="text-[clamp(1.55rem,2.5vw,2.05rem)] font-bold leading-[1.18] tracking-[-0.02em] text-white">{headerTitle}</h2> : null}
              <div className="mt-7 h-px w-full bg-white/15" />
              {heroHighlights.length > 0 ? <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-3">{heroHighlights.slice(0, 3).map((h, i) => (<HeroHighlight key={`${h.label}-${i}`} value={h.value} label={h.label} />))}</div> : null}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-310 px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">Table of Contents</div>
              <nav className="mt-4 flex flex-col gap-2.5 text-[0.94rem]">{headings.length > 0 ? headings.map((h) => <a key={h.id} href={`#${h.id}`} className="text-[#37354a] transition-colors hover:text-[#5a17ee]">{h.text}</a>) : <span className="text-[#6b7694]">No sections yet.</span>}</nav>
            </aside>
            <div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-7 border-b border-[#e6e1f2] pb-10 md:grid-cols-3 lg:grid-cols-5">
                <SummaryItem label="Industry" value={study.industry || ""} />
                <SummaryItem label="Employees" value={study.employees || ""} />
                <SummaryItem label="Duration" value={study.duration || study.projectDuration || ""} />
                <SummaryItem label="Team size" value={study.teamSize || ""} />
                <SummaryItem label="Scale" value={study.scaleOfOperation || (clientName ? `Trusted by ${clientName}` : "")} />
              </div>
              <div className="mt-10 rounded-2xl border border-[#e6e1f2] bg-[#f9f8fc] p-6 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5a17ee]" />
                <h4 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5a17ee]" />
                  Client Profile
                </h4>
                <p className="mt-4 text-[1.06rem] leading-[1.75] text-[#37354a] font-normal">
                  {clientDetailsText}
                </p>
              </div>
              {excerptText ? <p className="mt-10 text-[1.18rem] font-medium leading-[1.55] text-[#0d0a23] md:text-[1.28rem]">{excerptText}</p> : null}
              <article className="mt-2">
                {articleBody.length > 0 ? <PortableText value={articleBody} components={ptComponents} /> : null}
                {study.pullQuoteImage?.asset?.url ? (
                  <figure className="my-12 overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-white">
                    <div className="relative w-full aspect-video"><Image src={study.pullQuoteImage.asset.url} alt={study.pullQuoteImage.alt || "Highlight"} fill unoptimized className="object-cover" sizes="760px" /></div>
                    {study.pullQuoteImage.caption ? <figcaption className="px-4 py-3 text-center text-xs font-medium text-[#6b7694]">{study.pullQuoteImage.caption}</figcaption> : null}
                  </figure>
                ) : null}
                {Array.isArray(study.metrics) && study.metrics.length > 0 && heroHighlights.length === 0 ? (
                  <div className="my-12 grid grid-cols-1 gap-5 sm:grid-cols-3">{study.metrics.map((m, i) => (
                    <div key={`m-${i}`} className="rounded-[14px] border border-[#e6e1f2] bg-white p-5">
                      <div className="text-[1.7rem] font-bold leading-none tracking-[-0.02em] text-[#0d0a23]">{m.value}</div>
                      <div className="mt-3 text-[0.95rem] font-semibold text-[#0d0a23]">{m.label}</div>
                      {m.description ? <div className="mt-1.5 text-[0.85rem] leading-snug text-[#6b7694]">{m.description}</div> : null}
                    </div>
                  ))}</div>
                ) : null}
              </article>

              {study.testimonial?.quote ? (
                <div className="mt-14 rounded-[14px] border border-[#e6e1f2] bg-[#f3eefe] p-6 md:p-8">
                  <p className="text-[1.1rem] font-medium leading-[1.6] text-[#2a1f82] md:text-[1.18rem]">&ldquo;{study.testimonial.quote}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    {(study.testimonial.headshot?.asset?.url || study.testimonial.avatar?.asset?.url) ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-full"><Image src={(study.testimonial.headshot?.asset?.url || study.testimonial.avatar?.asset?.url)!} alt={study.testimonial.name || "Client"} fill unoptimized className="object-cover" sizes="40px" /></div>
                    ) : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5a17ee]/15 text-[0.75rem] font-bold text-[#5a17ee]">{(study.testimonial.name || "C").charAt(0)}</div>}
                    <div><div className="text-[0.95rem] font-bold text-[#0d0a23]">{study.testimonial.name || "Client"}</div>{study.testimonial.role ? <div className="text-[0.85rem] text-[#6b7694]">{study.testimonial.role}</div> : null}</div>
                  </div>
                </div>
              ) : null}

              {galleryItems.length > 0 ? (
                <div className="mt-14">
                  <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">Project gallery</h3>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">{galleryItems.map((item, i) => (
                    <figure key={`${item.url}-${i}`} className="overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-white">
                      <div className="relative aspect-video w-full"><Image src={item.url} alt={item.alt || `Image ${i + 1}`} fill unoptimized className="object-cover" sizes="400px" /></div>
                      {item.caption ? <figcaption className="px-4 py-3 text-center text-xs font-medium text-[#6b7694]">{item.caption}</figcaption> : null}
                    </figure>
                  ))}</div>
                </div>
              ) : null}

              {study.technologies && study.technologies.length > 0 ? (
                <div className="mt-14">
                  <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">Technologies</h3>
                  <div className="mt-4 flex flex-wrap gap-2">{study.technologies.map((t) => <span key={t} className="rounded-full border border-[#e6e1f2] bg-[#f8f4ea] px-3 py-1.5 text-[13px] font-medium text-[#37354a]">{t}</span>)}</div>
                </div>
              ) : null}

              <div className="mt-14 flex flex-wrap items-center gap-4">
                {downloadUrl ? (
                  <CaseStudyDownloadButton href={downloadUrl} slug={slug} title={study.title} client={study.client} className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#4FC3F7] via-[#2196F3] to-[#5B4FE9] px-12 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_15px_rgba(91,79,233,0.3)] transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(91,79,233,0.4)]">Download Customer Story</CaseStudyDownloadButton>
                ) : <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#4FC3F7] via-[#2196F3] to-[#5B4FE9] px-12 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_15px_rgba(91,79,233,0.3)] transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(91,79,233,0.4)]">Talk to our team</Link>}
                {study.liveUrl ? <Link href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#5a17ee] px-8 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-[#5a17ee] transition-colors hover:bg-[#5a17ee] hover:text-white">View live project</Link> : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="bg-[#f8f4ea] py-20 md:py-28">
          <div className="mx-auto w-full max-w-310 px-5 md:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-[clamp(1.85rem,3.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0d0a23]">More Customer Stories</h2>
              <Link href="/case-studies" className="hidden md:inline-flex items-center rounded-full border border-[#191919] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#191919] transition-colors duration-200 hover:bg-[#191919] hover:text-white">View all</Link>
            </div>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">{related.map((item) => <RelatedCard key={item._id} study={item} />)}</div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-310 px-5 md:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-[#0d0a23] px-6 py-14 text-white md:px-14 md:py-20 lg:px-20 lg:py-24">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_85%_30%,rgba(91,79,233,0.55)_0%,transparent_55%),radial-gradient(circle_at_15%_85%,rgba(255,88,18,0.35)_0%,transparent_60%)]" />
            <div className="relative max-w-2xl">
              <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.05] tracking-tight">Build your next AI agent with Softree</h2>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-[1.65] text-white/70 md:text-[1.15rem]">Power every conversation, workflow, and decision with enterprise-grade tools that keep your teams in control.</p>
              <div className="mt-9">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0d0a23] transition-colors duration-200 hover:bg-[#ff5812] hover:text-white">Get a demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

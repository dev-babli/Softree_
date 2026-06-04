"use client";

import Link from "next/link";
import Image from "next/image";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import CaseStudyDownloadButton from "@/components/case-studies/CaseStudyDownloadButton";
import { buildCaseStudyJsonLd } from "@/lib/structured-data";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type SanityImage = { asset?: { url?: string } | null; alt?: string; caption?: string } | null;
type Metric = { label?: string; value?: string; description?: string };
type RelatedStudy = { _id: string; title: string; slug: { current: string }; industry?: string; excerpt?: string; client?: string; mainImage?: SanityImage; mainImageUrl?: string };

type StudyData = {
  _id: string; _updatedAt?: string; title: string; slug: { current: string }; headerTitle?: string; excerpt?: string; industry?: string; useCase?: string; client?: string; location?: string; employees?: string; scaleOfOperation?: string; projectDuration?: string; duration?: string; teamSize?: string; technologies?: string[]; highlights?: Array<{ value: string; label: string }>; metrics?: Metric[]; keyResults?: Array<{ value: string; label: string }>; mainImage?: SanityImage; mainImageUrl?: string; heroImage?: SanityImage; clientLogo?: SanityImage; pdfUrl?: string; liveUrl?: string; challengeSummary?: string; approachSummary?: string; outcomeSummary?: string; result?: string; body?: Array<{ _type: string; style?: string; children?: Array<{ text?: string }> }>; rawResults?: string[] | Metric[]; testimonial?: { quote?: string; name?: string; role?: string; avatar?: { asset?: { url?: string } } | null; headshot?: { asset?: { url?: string } } | null } | null; gallery?: Array<{ asset?: { url?: string }; alt?: string; caption?: string }>; galleryUrls?: Array<{ url?: string; alt?: string; caption?: string }>; publishedAt?: string;
};

/* ------------------------------------------------------------------ */
/* Subcomponents                                                      */
/* ------------------------------------------------------------------ */

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

export default function TransformationEpicLayout({
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

  const legacyResults: string[] = Array.isArray(study.rawResults) ? (study.rawResults as Array<string | Metric>).filter((r): r is string => typeof r === "string") : [];
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

      {/* Hero — Split-screen magazine layout */}
      <section className="relative overflow-hidden bg-[#0d0a23] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[54px_54px]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_bottom,rgba(91,79,233,0.32)_0%,transparent_65%)]" />
        <div className="relative mx-auto w-full max-w-310 px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-36 lg:pt-40">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ff5812]">Transformation Epic</div>
              <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white">{clientName}</h1>
              {headerTitle ? <p className="mt-6 text-[1.2rem] font-medium leading-[1.5] text-white/80">{headerTitle}</p> : null}
              {excerptText ? <p className="mt-4 text-[1.05rem] leading-[1.65] text-white/70">{excerptText}</p> : null}
              {heroHighlights.length > 0 ? (
                <div className="mt-10 grid grid-cols-3 gap-6">
                  {heroHighlights.slice(0, 3).map((h, i) => (
                    <div key={`${h.label}-${i}`} className="flex flex-col gap-2">
                      <div className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold leading-none tracking-[-0.02em] text-white">{h.value}</div>
                      <div className="text-[0.85rem] leading-[1.4] text-white/75">{h.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-[14px] bg-white/5 ring-1 ring-white/10 lg:aspect-auto lg:h-full lg:min-h-[400px]">
              {heroImageUrl ? <Image src={heroImageUrl} alt={study.mainImage?.alt || clientName} fill unoptimized priority sizes="600px" className="object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-white/50">No hero image</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Before / After transformation strip */}
      <section className="border-b border-[#e6e1f2] bg-[#f8f4ea] py-16 md:py-24">
        <div className="mx-auto w-full max-w-310 px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">Before</h2>
              <p className="mt-4 text-[1.18rem] font-medium leading-[1.55] text-[#0d0a23] md:text-[1.28rem]">{study.challengeSummary || "Legacy systems and manual processes created bottlenecks and limited scale."}</p>
            </div>
            <div>
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#1852ff]">After</h2>
              <p className="mt-4 text-[1.18rem] font-medium leading-[1.55] text-[#0d0a23] md:text-[1.28rem]">{study.outcomeSummary || study.approachSummary || "A modern platform built for speed, reliability, and growth."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-310 px-5 md:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-7 border-b border-[#e6e1f2] pb-10 md:grid-cols-3 lg:grid-cols-6">
            <div className="flex flex-col gap-1.5"><div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6b7694]">Industry</div><div className="text-[1rem] font-medium leading-[1.4] text-[#0d0a23]">{study.industry || "—"}</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6b7694]">Location</div><div className="text-[1rem] font-medium leading-[1.4] text-[#0d0a23]">{study.location || "—"}</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6b7694]">Duration</div><div className="text-[1rem] font-medium leading-[1.4] text-[#0d0a23]">{study.duration || study.projectDuration || "—"}</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6b7694]">Team size</div><div className="text-[1rem] font-medium leading-[1.4] text-[#0d0a23]">{study.teamSize || "—"}</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6b7694]">Employees</div><div className="text-[1rem] font-medium leading-[1.4] text-[#0d0a23]">{study.employees || "—"}</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6b7694]">Scale</div><div className="text-[1rem] font-medium leading-[1.4] text-[#0d0a23]">{study.scaleOfOperation || (clientName ? `Trusted by ${clientName}` : "—")}</div></div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {study.testimonial?.quote ? (
        <section className="bg-[#0d0a23] py-16 md:py-24">
          <div className="mx-auto w-full max-w-2xl px-5 text-center md:px-8">
            <p className="text-[1.35rem] font-medium leading-[1.55] text-white md:text-[1.55rem]">&ldquo;{study.testimonial.quote}&rdquo;</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              {(study.testimonial.headshot?.asset?.url || study.testimonial.avatar?.asset?.url) ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-full"><Image src={(study.testimonial.headshot?.asset?.url || study.testimonial.avatar?.asset?.url)!} alt={study.testimonial.name || "Client"} fill unoptimized className="object-cover" sizes="48px" /></div>
              ) : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5a17ee]/15 text-[0.8rem] font-bold text-[#5a17ee]">{(study.testimonial.name || "C").charAt(0)}</div>}
              <div className="text-left">
                <div className="text-[0.95rem] font-bold text-white">{study.testimonial.name || "Client"}</div>
                {study.testimonial.role ? <div className="text-[0.85rem] text-white/60">{study.testimonial.role}</div> : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Gallery */}
      {galleryItems.length > 0 ? (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto w-full max-w-310 px-5 md:px-8">
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">Project gallery</h3>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">{galleryItems.map((item, i) => (
              <figure key={`${item.url}-${i}`} className="overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-white">
                <div className="relative aspect-video w-full"><Image src={item.url} alt={item.alt || `Image ${i + 1}`} fill unoptimized className="object-cover" sizes="400px" /></div>
                {item.caption ? <figcaption className="px-4 py-3 text-center text-xs font-medium text-[#6b7694]">{item.caption}</figcaption> : null}
              </figure>
            ))}</div>
          </div>
        </section>
      ) : null}

      {/* Tech stack */}
      {study.technologies && study.technologies.length > 0 ? (
        <section className="bg-[#f8f4ea] py-16 md:py-24">
          <div className="mx-auto w-full max-w-310 px-5 md:px-8">
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">Technologies</h3>
            <div className="mt-4 flex flex-wrap gap-2">{study.technologies.map((t) => <span key={t} className="rounded-full border border-[#e6e1f2] bg-white px-3 py-1.5 text-[13px] font-medium text-[#37354a]">{t}</span>)}</div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-310 px-5 md:px-8">
          <div className="mt-14 flex flex-wrap items-center gap-4">
            {downloadUrl ? (
              <CaseStudyDownloadButton href={downloadUrl} slug={slug} title={study.title} client={study.client} className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#4FC3F7] via-[#2196F3] to-[#5B4FE9] px-12 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_15px_rgba(91,79,233,0.3)] transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(91,79,233,0.4)]">Download Customer Story</CaseStudyDownloadButton>
            ) : <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#4FC3F7] via-[#2196F3] to-[#5B4FE9] px-12 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_15px_rgba(91,79,233,0.3)] transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(91,79,233,0.4)]">Talk to our team</Link>}
            {study.liveUrl ? <Link href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#5a17ee] px-8 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-[#5a17ee] transition-colors hover:bg-[#5a17ee] hover:text-white">View live project</Link> : null}
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

      <Footer />
    </div>
  );
}

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

export default function ProductShowcaseLayout({
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
  const logoUrl = study.clientLogo?.asset?.url;

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

      {/* Hero — Full-bleed product screenshot with centered text */}
      <section className="relative overflow-hidden bg-[#f8f4ea]">
        <div className="relative mx-auto w-full max-w-310 px-5 pt-32 pb-12 md:px-8 md:pt-36 md:pb-16 lg:pt-40">
          <div className="text-center">
            {logoUrl ? <div className="mx-auto mb-6 h-12 w-auto"><Image src={logoUrl} alt={`${clientName} logo`} width={120} height={48} unoptimized className="h-full w-auto object-contain" /></div> : null}
            <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#1852ff]">Product Showcase</div>
            <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[#0d0a23]">{clientName}</h1>
            {headerTitle ? <p className="mx-auto mt-6 max-w-2xl text-[1.2rem] font-medium leading-[1.5] text-[#37354a]">{headerTitle}</p> : null}
            {excerptText ? <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-[1.65] text-[#4c5366]">{excerptText}</p> : null}
            {heroHighlights.length > 0 ? (
              <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-6">
                {heroHighlights.slice(0, 3).map((h, i) => (
                  <div key={`${h.label}-${i}`} className="flex flex-col items-center gap-2">
                    <div className="text-[1.6rem] font-bold leading-none tracking-[-0.02em] text-[#0d0a23]">{h.value}</div>
                    <div className="text-[0.85rem] leading-[1.4] text-[#6b7694]">{h.label}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-310 px-5 pb-20 md:px-8 md:pb-28">
          <div className="relative aspect-video w-full overflow-hidden rounded-[18px] border border-[#e6e1f2] bg-white shadow-lg">
            {heroImageUrl ? <Image src={heroImageUrl} alt={study.mainImage?.alt || clientName} fill unoptimized priority sizes="1200px" className="object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-[#6b7694]">No hero image</div>}
          </div>
        </div>
      </section>

      {/* Feature callouts */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-310 px-5 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-[14px] border border-[#e6e1f2] bg-[#f8f4ea] p-6">
              <h3 className="text-[1.1rem] font-bold text-[#0d0a23]">{study.challengeSummary ? "Challenge" : "The Problem"}</h3>
              <p className="mt-3 text-[0.95rem] leading-[1.6] text-[#37354a]">{study.challengeSummary || "Complex workflows and fragmented tooling slowed delivery and created risk."}</p>
            </div>
            <div className="rounded-[14px] border border-[#e6e1f2] bg-[#f8f4ea] p-6">
              <h3 className="text-[1.1rem] font-bold text-[#0d0a23]">{study.approachSummary ? "Approach" : "The Solution"}</h3>
              <p className="mt-3 text-[0.95rem] leading-[1.6] text-[#37354a]">{study.approachSummary || "A unified platform engineered for performance, security, and scale."}</p>
            </div>
            <div className="rounded-[14px] border border-[#e6e1f2] bg-[#f8f4ea] p-6">
              <h3 className="text-[1.1rem] font-bold text-[#0d0a23]">{study.outcomeSummary ? "Outcome" : "Results"}</h3>
              <p className="mt-3 text-[0.95rem] leading-[1.6] text-[#37354a]">{study.outcomeSummary || "Faster releases, higher uptime, and measurable cost savings."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      {Array.isArray(study.metrics) && study.metrics.length > 0 ? (
        <section className="bg-[#0d0a23] py-16 md:py-24">
          <div className="mx-auto w-full max-w-310 px-5 md:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {study.metrics.map((m, i) => (
                <div key={`m-${i}`} className="text-center">
                  <div className="text-[clamp(2.2rem,4vw,3.2rem)] font-bold leading-none tracking-[-0.02em] text-white">{m.value}</div>
                  <div className="mt-3 text-[0.95rem] font-semibold text-white">{m.label}</div>
                  {m.description ? <div className="mt-1.5 text-[0.85rem] leading-snug text-white/60">{m.description}</div> : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Tech stack */}
      {study.technologies && study.technologies.length > 0 ? (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto w-full max-w-310 px-5 md:px-8">
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">{study.technologies.map((t) => <span key={t} className="rounded-full border border-[#e6e1f2] bg-[#f8f4ea] px-3 py-1.5 text-[13px] font-medium text-[#37354a]">{t}</span>)}</div>
          </div>
        </section>
      ) : null}

      {/* Gallery */}
      {galleryItems.length > 0 ? (
        <section className="bg-[#f8f4ea] py-16 md:py-24">
          <div className="mx-auto w-full max-w-310 px-5 md:px-8">
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">Screenshots</h3>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">{galleryItems.map((item, i) => (
              <figure key={`${item.url}-${i}`} className="overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-white">
                <div className="relative aspect-video w-full"><Image src={item.url} alt={item.alt || `Image ${i + 1}`} fill unoptimized className="object-cover" sizes="400px" /></div>
                {item.caption ? <figcaption className="px-4 py-3 text-center text-xs font-medium text-[#6b7694]">{item.caption}</figcaption> : null}
              </figure>
            ))}</div>
          </div>
        </section>
      ) : null}

      {/* Testimonial */}
      {study.testimonial?.quote ? (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto w-full max-w-2xl px-5 text-center md:px-8">
            <p className="text-[1.25rem] font-medium leading-[1.55] text-[#0d0a23] md:text-[1.45rem]">&ldquo;{study.testimonial.quote}&rdquo;</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              {(study.testimonial.headshot?.asset?.url || study.testimonial.avatar?.asset?.url) ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-full"><Image src={(study.testimonial.headshot?.asset?.url || study.testimonial.avatar?.asset?.url)!} alt={study.testimonial.name || "Client"} fill unoptimized className="object-cover" sizes="48px" /></div>
              ) : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5a17ee]/15 text-[0.8rem] font-bold text-[#5a17ee]">{(study.testimonial.name || "C").charAt(0)}</div>}
              <div className="text-left">
                <div className="text-[0.95rem] font-bold text-[#0d0a23]">{study.testimonial.name || "Client"}</div>
                {study.testimonial.role ? <div className="text-[0.85rem] text-[#6b7694]">{study.testimonial.role}</div> : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="bg-[#0d0a23] py-16 md:py-24">
        <div className="mx-auto w-full max-w-310 px-5 md:px-8">
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            {downloadUrl ? (
              <CaseStudyDownloadButton href={downloadUrl} slug={slug} title={study.title} client={study.client} className="inline-flex items-center justify-center rounded-full bg-white px-12 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-[#0d0a23] shadow-[0_4px_15px_rgba(255,255,255,0.15)] transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)]">Download Customer Story</CaseStudyDownloadButton>
            ) : <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-12 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-[#0d0a23] shadow-[0_4px_15px_rgba(255,255,255,0.15)] transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)]">Talk to our team</Link>}
            {study.liveUrl ? <Link href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white px-8 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-[#0d0a23]">View live project</Link> : null}
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

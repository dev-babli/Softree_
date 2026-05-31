import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

/**
 * Careers — dynamic SEO metadata
 *
 * Reads the singleton `careersPage` document for `metaTitle` and
 * `metaDescription`. Falls back to hand-tuned defaults whenever the
 * doc or fields are missing so the page is always crawlable.
 */
const seoQuery = groq`*[_type == "careersPage"][0]{ metaTitle, metaDescription }`;

const FALLBACK_TITLE =
  "Careers | Softree Technology — Join Our Team";
const FALLBACK_DESCRIPTION =
  "Explore career opportunities at Softree Technology. Join 200+ engineers building AI, Power Platform, and enterprise web solutions for global clients.";

export async function generateMetadata(): Promise<Metadata> {
  let metaTitle: string | undefined;
  let metaDescription: string | undefined;
  try {
    const doc = await client.fetch<{
      metaTitle?: string;
      metaDescription?: string;
    } | null>(seoQuery);
    metaTitle = doc?.metaTitle;
    metaDescription = doc?.metaDescription;
  } catch {
    /* studio doc not yet created — use fallbacks */
  }

  const title = metaTitle?.trim() || FALLBACK_TITLE;
  const description = metaDescription?.trim() || FALLBACK_DESCRIPTION;

  return {
    title,
    description,
    alternates: {
      canonical: "https://www.softreetechnology.com/careers",
    },
    openGraph: {
      title,
      description,
      url: "https://www.softreetechnology.com/careers",
      siteName: "Softree Technology",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Softree Technology Careers",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

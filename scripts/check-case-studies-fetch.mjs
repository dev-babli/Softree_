import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1zmh4sfw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-21",
  useCdn: true,
});

const featuredQ = `*[_type == "caseStudy" && coalesce(status, "published") == "published" && featuredRank > 0 && defined(slug.current)] | order(featuredRank asc)[0...6]{ title, "slug": slug.current }`;
const navQ = `*[_type == "caseStudy" && coalesce(status, "published") == "published" && defined(slug.current)][0...5]{ title, "slug": slug.current, featuredRank }`;

try {
  const [featured, nav] = await Promise.all([client.fetch(featuredQ), client.fetch(navQ)]);
  console.log("featured count:", featured?.length ?? 0, featured);
  console.log("nav count:", nav?.length ?? 0, nav);
} catch (e) {
  console.error("fetch failed:", e.message);
}

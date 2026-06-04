/**
 * Upsert seed case studies from scripts/seed-sanity-content.ts data
 * without duplicating documents that already exist (matched by slug).
 *
 * Usage: npm run sanity:seed-case-studies
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1zmh4sfw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-21",
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type SeedStudy = {
  _type: "caseStudy";
  title: string;
  slug: { current: string };
  client?: string;
  industry?: string;
  category: string;
  excerpt?: string;
  description?: string;
  mainImageUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
  featured?: boolean;
  status?: "published" | "archived";
  publishedAt?: string;
  results?: string[];
};

// Minimal high-value seed set — extend from seed-sanity-content.ts as needed
const studies: SeedStudy[] = [
  {
    _type: "caseStudy",
    title: "AI-Powered E-Commerce Recommendation Engine",
    slug: { current: "ai-ecommerce-recommendation-engine" },
    client: "Retail Client",
    industry: "Retail",
    category: "ai",
    excerpt:
      "A machine learning recommendation system that personalizes product discovery and boosts conversion rates.",
    mainImageUrl: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Shopping-E-Commerce.webp",
    pdfUrl: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf",
    featured: true,
    status: "published",
    publishedAt: "2024-12-01T10:00:00.000Z",
  },
  {
    _type: "caseStudy",
    title: "Employee Details Tracking System",
    slug: { current: "employee-details-tracking-system" },
    client: "Enterprise HR Team",
    industry: "Human Resources",
    category: "power-platform",
    excerpt: "Power Apps solution for employee tracking integrated with Dataverse.",
    pdfUrl:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf",
    status: "published",
    publishedAt: "2024-12-05T10:00:00.000Z",
  },
  {
    _type: "caseStudy",
    title: "Education Mobile App",
    slug: { current: "education-mobile-app" },
    client: "EdTech",
    industry: "Education",
    category: "mobile",
    excerpt: "Student-focused mobile app for courses, learning material, and assessments.",
    mainImageUrl: "/images/case-study/mobile/education.png",
    pdfUrl: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Education-App.pdf",
    status: "published",
    publishedAt: "2024-09-15T10:00:00.000Z",
  },
  {
    _type: "caseStudy",
    title: "Custom Copy Move Panel SPFx",
    slug: { current: "custom-copy-move-panel-spfx" },
    client: "Enterprise Intranet",
    industry: "SharePoint",
    category: "sharepoint",
    excerpt: "SPFx panel improving SharePoint list management with Fluent UI.",
    pdfUrl:
      "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
    status: "published",
    publishedAt: "2025-03-01T10:00:00.000Z",
  },
  {
    _type: "caseStudy",
    title: "Public Blogging Website MERN Stack",
    slug: { current: "public-blogging-website-mern" },
    client: "Media Publisher",
    industry: "Publishing",
    category: "web",
    excerpt: "Scalable MERN blogging platform with SEO-ready architecture.",
    pdfUrl:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    status: "published",
    publishedAt: "2024-11-10T10:00:00.000Z",
  },
];

async function upsertStudies() {
  if (!process.env.SANITY_API_WRITE_TOKEN && !process.env.SANITY_API_TOKEN) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN");
  }

  let created = 0;
  let skipped = 0;

  for (const study of studies) {
    const slug = study.slug.current;
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "caseStudy" && slug.current == $slug][0]{ _id }`,
      { slug },
    );

    if (existing?._id) {
      skipped += 1;
      console.log(`↷ Skipped (exists): ${slug}`);
      continue;
    }

    await client.create({
      ...study,
      description: study.excerpt,
      imageUrl: study.mainImageUrl,
    });
    created += 1;
    console.log(`✓ Created: ${slug}`);
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}.`);
}

upsertStudies().catch((error) => {
  console.error(error);
  process.exit(1);
});

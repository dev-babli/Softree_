import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { CASE_STUDY_CATEGORY_KEYS } from "@/app/case-studies/categoryConfig";
import { notifyPublish } from "@/sanity/lib/notifyPublish";

/**
 * Sanity Webhook → On-demand Revalidation + optional publish notifications
 *
 * Setup in Sanity:
 *   Webhook URL: https://www.softreetechnology.com/api/revalidate
 *   Secret: SANITY_REVALIDATE_SECRET
 *   Trigger on: Create, Update, Delete
 *   Filter: _type in ["post", "caseStudy", "category", "marketingPage", "homepageCaseStudySlider", "globalSettings"]
 *
 * Optional notification env vars (see src/sanity/lib/notifyPublish.ts):
 *   SLACK_WEBHOOK_URL — Slack incoming webhook for publish alerts
 *   NEXT_PUBLIC_SITE_URL — public site origin for Presentation links
 *   SANITY_STUDIO_URL — Studio base URL override (defaults to {site}/studio)
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret =
      request.headers.get("x-sanity-secret") ||
      request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const { _type, slug, category } = body;
    const paths: string[] = [];

    if (_type === "post") {
      paths.push("/blog", "/");
      if (slug?.current) paths.push(`/blog/${slug.current}`);
    }

    if (_type === "category") {
      paths.push("/blog", "/");
    }

    if (_type === "caseStudy") {
      paths.push("/case-studies", "/");
      if (slug?.current) paths.push(`/case-studies/${slug.current}`);

      const categorySlug = category
      if (categorySlug && CASE_STUDY_CATEGORY_KEYS.includes(categorySlug)) {
        paths.push(`/case-studies/${categorySlug}`);
      }

      for (const key of CASE_STUDY_CATEGORY_KEYS) {
        paths.push(`/case-studies/${key}`);
      }
    }

    if (_type === "marketingPage") {
      if (slug?.current) paths.push(`/p/${slug.current}`);
    }

    if (_type === "homepageCaseStudySlider") {
      paths.push("/");
    }

    if (_type === "globalSettings") {
      paths.push("/", "/sitemap.xml");
    }

    paths.push("/sitemap.xml");

    for (const path of [...new Set(paths)]) {
      revalidatePath(path, "page");
    }

    try {
      await notifyPublish(body);
    } catch (notifyError) {
      console.error("Publish notification failed:", notifyError);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      slug: slug?.current,
      paths: [...new Set(paths)],
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: (err as Error).message },
      { status: 500 },
    );
  }
}

import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { CASE_STUDY_CATEGORY_KEYS } from "@/app/case-studies/categoryConfig";
import { notifyPublish } from "@/cms/lib/notifyPublish";

/**
 * Sanity Webhook → On-demand Revalidation + optional publish notifications
 * (Force redeploy to load new SANITY_REVALIDATE_SECRET)
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

import { createHmac } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    const secretHeader = request.headers.get("x-sanity-secret");
    const signatureHeader = request.headers.get("x-sanity-signature");
    const secretQuery = request.nextUrl.searchParams.get("secret");

    const localSecret = process.env.SANITY_REVALIDATE_SECRET?.trim();

    let isValid = false;

    if (localSecret) {
      // 1. Check custom plain-text header or query param
      if (secretHeader === localSecret || secretQuery === localSecret) {
        isValid = true;
      }

      // 2. Check secure HMAC signature from Sanity
      if (!isValid && signatureHeader) {
        const computedSignature = createHmac("sha256", localSecret)
          .update(rawBody)
          .digest("hex");
        if (computedSignature === signatureHeader) {
          isValid = true;
        }
      }
    }

    console.log("Revalidation Validation Debug:", {
      isValid,
      hasSecretHeader: !!secretHeader,
      hasSignatureHeader: !!signatureHeader,
      hasSecretQuery: !!secretQuery,
      localSecretLength: localSecret?.length ?? 0
    });

    if (!isValid) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const { _type, slug } = body;
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
      for (const category of CASE_STUDY_CATEGORY_KEYS) {
        paths.push(`/case-studies/${category}`);
      }
      if (slug?.current) paths.push(`/case-studies/${slug.current}`);
      revalidatePath("/case-studies", "layout");
    }

    if (_type === "marketingPage") {
      if (slug?.current) paths.push(`/p/${slug.current}`);
    }

    if (_type === "homepageCaseStudySlider") {
      paths.push("/");
    }

    if (_type === "globalSettings") {
      paths.push("/", "/sitemap.xml", "/blog", "/case-studies");
      revalidatePath("/", "layout");
      revalidatePath("/blog", "layout");
      revalidatePath("/case-studies", "layout");
    }

    paths.push("/sitemap.xml");

    for (const path of [...new Set(paths)]) {
      revalidatePath(path, "page");
    }

    // Clear tag-based caches for defineLive/sanityFetch
    revalidateTag("sanity", { expire: 0 });
    if (_type) {
      revalidateTag(`sanity:${_type}`, { expire: 0 });
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

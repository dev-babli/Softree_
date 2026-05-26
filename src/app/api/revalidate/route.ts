import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Sanity Webhook → On-demand Revalidation
 *
 * When content is published/updated in Sanity Studio (embedded or hosted),
 * this endpoint purges the Next.js cache so fresh content is served.
 *
 * Setup in Sanity:
 *   Webhook URL: https://www.softreetechnology.com/api/revalidate
 *   Secret: (set SANITY_REVALIDATE_SECRET in .env)
 *   Trigger on: Create, Update, Delete
 *   Filter: _type == "post"
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = request.headers.get("x-sanity-secret") || request.nextUrl.searchParams.get("secret");

    // Validate secret
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const { _type, slug } = body;

    // Revalidate blog pages
    if (_type === "post") {
      revalidatePath("/blog", "page");
      if (slug?.current) {
        revalidatePath(`/blog/${slug.current}`, "page");
      }
      revalidatePath("/sitemap.xml");
    }

    // Revalidate case study pages
    if (_type === "caseStudy") {
      revalidatePath("/case-studies", "page");
      if (slug?.current) {
        revalidatePath(`/case-studies/${slug.current}`, "page");
      }
      revalidatePath("/sitemap.xml");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      slug: slug?.current,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: (err as Error).message },
      { status: 500 }
    );
  }
}

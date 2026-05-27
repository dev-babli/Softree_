import { groq } from "next-sanity";

/**
 * Fetch latest blog posts for the homepage blog section.
 * Returns the 4 most recent published posts.
 */
export const latestBlogsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    categories[]->{ title, slug },
    mainImage { asset->{ url }, alt }
  }
`;

/**
 * Fetch blog posts grouped by category for the navbar dropdown.
 * Returns the 3 most recent posts per category (up to 4 categories).
 */
export const navBlogsQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt
    }
  }
`;

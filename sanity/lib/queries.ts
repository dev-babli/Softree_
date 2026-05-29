import { defineQuery } from 'next-sanity'

/**
 * Sanity GROQ Queries
 * 
 * Using defineQuery enables TypeGen to automatically generate TypeScript types.
 * Run `npm run sanity:typegen` to regenerate types when schemas change.
 * 
 * @see https://www.sanity.io/docs/sanity-typegen
 */

// =============================================================================
// SERVICE QUERIES
// =============================================================================

export const allServicesQuery = defineQuery(`
  *[_type == "service" && isActive == true] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    serviceCategory,
    subCategory,
    heroHeadline,
    heroSubheadline,
    heroImage,
    features,
    benefits,
    isFeatured,
    publishedAt
  }
`)

export const featuredServicesQuery = defineQuery(`
  *[_type == "service" && isActive == true && isFeatured == true] | order(order asc) {
    _id,
    title,
    slug,
    serviceCategory,
    heroHeadline,
    heroImage,
    features[0...3]
  }
`)

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    slug,
    serviceCategory,
    subCategory,
    heroHeadline,
    heroSubheadline,
    heroImage,
    overview,
    features,
    benefits,
    faqs[]->,
    metaTitle,
    metaDescription,
    keywords,
    ogImage,
    publishedAt
  }
`)

export const servicesByCategoryQuery = defineQuery(`
  *[_type == "service" && serviceCategory == $category && isActive == true] | order(order asc) {
    _id,
    title,
    slug,
    heroHeadline,
    heroImage,
    features[0...3]
  }
`)

// =============================================================================
// CASE STUDY QUERIES
// =============================================================================

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && coalesce(status, "published") == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    industry,
    client,
    excerpt,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    technologies,
    metrics[] { label, value, description },
    featured,
    publishedAt
  }
`)

export const featuredCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && featured == true && coalesce(status, "published") == "published"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    category,
    client,
    industry,
    excerpt,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    metrics[0...3] { label, value, description },
    testimonial { quote, name, role }
  }
`)

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug && coalesce(status, "published") == "published"][0] {
    _id,
    _updatedAt,
    title,
    slug,
    headerTitle,
    "excerpt": coalesce(excerpt, description),
    category,
    industry,
    client,
    location,
    employees,
    scaleOfOperation,
    projectDuration,
    teamSize,
    accentColor,
    mainImage { asset->{ url, metadata }, alt },
    "mainImageUrl": coalesce(mainImageUrl, imageUrl),
    pdfUrl,
    liveUrl,
    technologies,
    highlights[] { value, label },
    "rawResults": results,
    pullQuoteImage { asset->{ url, metadata }, alt, caption },
    challengeSummary,
    challenge,
    approachSummary,
    approach,
    outcomeSummary,
    outcome,
    body,
    metrics[] { label, value, description },
    testimonial {
      quote,
      name,
      role,
      avatar { asset->{ url } }
    },
    gallery[] {
      asset->{ url, metadata },
      alt,
      caption
    },
    galleryUrls[] { url, alt, caption },
    relatedCaseStudies[]-> {
      _id,
      title,
      slug,
      category,
      industry,
      "excerpt": coalesce(excerpt, description),
      mainImage { asset->{ url } },
      "mainImageUrl": coalesce(mainImageUrl, imageUrl),
      client
    },
    metaTitle,
    metaDescription,
    publishedAt
  }
`)

export const relatedCaseStudiesFallbackQuery = defineQuery(`
  *[_type == "caseStudy"
    && slug.current != $slug
    && defined(slug.current)
    && coalesce(status, "published") == "published"
  ] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    category,
    industry,
    "excerpt": coalesce(excerpt, description),
    mainImage { asset->{ url } },
    "mainImageUrl": coalesce(mainImageUrl, imageUrl),
    client
  }
`)

export const allCaseStudySlugsQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current) && coalesce(status, "published") == "published"][].slug.current
`)

// =============================================================================
// BLOG QUERIES
// =============================================================================

export const allPostsQuery = defineQuery(`
  *[_type == "blogPost" && isDraft == false] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    author-> {
      name,
      avatar,
      role
    },
    coAuthors[]-> {
      name,
      avatar
    },
    featuredImage,
    category->,
    tags[]->,
    publishedAt,
    readingTime,
    isFeatured
  }
`)

export const featuredPostsQuery = defineQuery(`
  *[_type == "blogPost" && isDraft == false && isFeatured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    author-> {
      name,
      avatar
    },
    featuredImage,
    category-> {
      title,
      slug
    },
    publishedAt,
    readingTime
  }
`)

export const postBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug && isDraft == false][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    author-> {
      name,
      avatar,
      bio,
      role,
      social
    },
    coAuthors[]-> {
      name,
      avatar,
      bio
    },
    featuredImage,
    category->,
    tags[]->,
    publishedAt,
    updatedAt,
    readingTime,
    metaTitle,
    metaDescription,
    ogImage,
    canonicalUrl
  }
`)

export const postsByCategoryQuery = defineQuery(`
  *[_type == "blogPost" && isDraft == false && category->slug.current == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    author-> {
      name,
      avatar
    },
    featuredImage,
    publishedAt,
    readingTime
  }
`)

export const postsByTagQuery = defineQuery(`
  *[_type == "blogPost" && isDraft == false && $tag in tags[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    author-> {
      name,
      avatar
    },
    featuredImage,
    publishedAt,
    readingTime
  }
`)

// =============================================================================
// TESTIMONIAL QUERIES
// =============================================================================

export const allTestimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    authorTitle,
    authorImage,
    company,
    companyLogo,
    rating,
    category,
    isFeatured
  }
`)

export const featuredTestimonialsQuery = defineQuery(`
  *[_type == "testimonial" && isFeatured == true] | order(order asc) {
    _id,
    quote,
    author,
    authorTitle,
    authorImage,
    company,
    rating,
    category
  }
`)

export const testimonialsByCategoryQuery = defineQuery(`
  *[_type == "testimonial" && category == $category] | order(order asc) {
    _id,
    quote,
    author,
    authorTitle,
    authorImage,
    company,
    rating
  }
`)

// =============================================================================
// FAQ QUERIES
// =============================================================================

export const allFaqsQuery = defineQuery(`
  *[_type == "faq" && isActive == true] | order(order asc) {
    _id,
    question,
    answer,
    category,
    relatedServices[]-> {
      _id,
      title,
      slug
    }
  }
`)

export const faqsByCategoryQuery = defineQuery(`
  *[_type == "faq" && isActive == true && category == $category] | order(order asc) {
    _id,
    question,
    answer
  }
`)

export const faqsByServiceQuery = defineQuery(`
  *[_type == "faq" && isActive == true && $serviceId in relatedServices[]._ref] | order(order asc) {
    _id,
    question,
    answer
  }
`)

// =============================================================================
// TEAM QUERIES
// =============================================================================

export const allTeamMembersQuery = defineQuery(`
  *[_type == "teamMember" && isActive == true] | order(order asc) {
    _id,
    name,
    slug,
    role,
    department,
    photo,
    bio,
    expertise,
    socialLinks,
    email
  }
`)

export const teamByDepartmentQuery = defineQuery(`
  *[_type == "teamMember" && isActive == true && department == $department] | order(order asc) {
    _id,
    name,
    role,
    photo,
    expertise,
    socialLinks
  }
`)

// =============================================================================
// GLOBAL SETTINGS QUERY
// =============================================================================

export const globalSettingsQuery = defineQuery(`
  *[_type == "globalSettings"][0] {
    _id,
    siteName,
    siteUrl,
    logo,
    defaultMetaTitle,
    defaultMetaDescription,
    socialLinks,
    contactInfo,
    analytics
  }
`)

// =============================================================================
// NAVIGATION & CATEGORIES
// =============================================================================

export const allCategoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`)

export const allTagsQuery = defineQuery(`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug
  }
`)

// =============================================================================
// RELATED CONTENT QUERIES
// =============================================================================

export const relatedServicesQuery = defineQuery(`
  *[_type == "service" && isActive == true && serviceCategory == $category && _id != $currentId] | order(order asc)[0...3] {
    _id,
    title,
    slug,
    heroHeadline,
    heroImage
  }
`)

export const relatedPostsQuery = defineQuery(`
  *[_type == "blogPost" && isDraft == false && category._ref == $categoryId && _id != $currentId] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime
  }
`)

import { groq } from "next-sanity";

/**
 * Fetch latest blog posts for the homepage blog section.
 * Returns the 4 most recent published posts.
 */
export const latestBlogsQuery = groq`
  *[_type == "post" && coalesce(status, "published") == "published"] | order(publishedAt desc)[0...4] {
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
    "posts": *[_type == "post" && references(^._id) && coalesce(status, "published") == "published"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt
    }
  }
`;

/**
 * Fetch published case studies for the navbar dropdown.
 * Grouped by category on the client via buildCaseStudyNavCategories().
 */
export const navCaseStudiesQuery = groq`
  *[_type == "caseStudy" && coalesce(status, "published") == "published" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    client,
    slug,
    excerpt,
    category,
    industry,
    mainImage { asset->{ url }, alt },
    mainImageUrl
  }
`;

/** Featured case studies for homepage and promos (max 6). */
export const featuredCaseStudiesNavQuery = groq`
  *[_type == "caseStudy" && coalesce(status, "published") == "published" && featured == true && defined(slug.current)] | order(publishedAt desc)[0...6] {
    _id,
    title,
    client,
    slug,
    excerpt,
    category,
    industry,
    mainImage { asset->{ url }, alt },
    mainImageUrl
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug && ($preview == true || coalesce(status, "published") == "published")][0] {
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
    detailLayout,
    projectType,
    region,
    endUsers,
    videoUrl,
    challengeCards[] { title, description },
    solutionArchitecture[] { title, description },
    deliverables[] { title, description },
    myRole,
    servicesProvided,
    solutionSummary,
    solutionFeatures,
    approachSteps[] { title, description },
    beforeAfter[] { metric, before, after },
    ctaHeadline,
    ctaSubtext,
    ctaButtonText,
    faqs[] { question, answer },
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
    challengeContent,
    approachSummary,
    approach,
    approachContent,
    outcomeSummary,
    outcome,
    outcomeContent,
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
    ogImage { asset->{ url } },
    publishedAt
  }
`;

export const relatedCaseStudiesFallbackQuery = groq`
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
`;

export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current) && coalesce(status, "published") == "published"][].slug.current
`;

export const marketingPageBySlugQuery = groq`
  *[_type == "marketingPage" && slug.current == $slug && ($preview == true || status == "published")][0] {
    _id,
    title,
    slug,
    status,
    sections[] {
      _type,
      _key,
      eyebrow,
      headline,
      subheadline,
      primaryCta { label, href },
      image { asset->{ url }, alt },
      heading,
      features[] { title, description, icon },
      content,
      quote,
      name,
      role,
      avatar { asset->{ url } },
      body,
      buttonLabel,
      buttonHref
    },
    metaTitle,
    metaDescription
  }
`;

export const marketingPageSlugsQuery = groq`
  *[_type == "marketingPage" && status == "published" && defined(slug.current)].slug.current
`;

export const homepageCaseStudySliderQuery = groq`
  *[_type == "homepageCaseStudySlider"][0] {
    sectionEnabled,
    slides[] {
      company,
      eyebrow,
      title,
      description,
      ctaText,
      ctaHref,
      image { asset->{ url }, alt },
      badgeImage { asset->{ url }, alt },
      stats[] { value, label },
      caseStudy-> {
        client,
        heroHeadline,
        heroEyebrow,
        headerTitle,
        excerpt,
        "slug": slug.current,
        mainImage { asset->{ url }, alt },
        highlights[] { value, label },
        metrics[] { value, label }
      }
    }
  }
`;

export const globalSettingsQuery = groq`
  *[_type == "globalSettings"][0] {
    siteName,
    siteUrl,
    logo { asset->{ url }, alt },
    defaultMetaTitle,
    defaultMetaDescription,
    socialLinks { linkedin, twitter, github, clutch },
    contactInfo { email, phone, address },
    analytics { gtmId, gaId, posthogKey }
  }
`;


/**
 * Fetch the singleton Careers page document. The /careers route reads
 * this once at request time and falls back to defaults whenever a
 * field is missing, so editors can launch with partial content.
 */
export const careersPageQuery = groq`
  *[_type == "careersPage"][0] {
    _id,
    title,
    heroEyebrow,
    heroHeadline,
    heroHeadlineItalic,
    heroSubline,
    heroCyclingRoles,
    heroGallery[]{
      "url": asset->url,
      alt,
      caption
    },
    introBadge,
    introHeading,
    introHighlight,
    introBody,
    introStats,
    introPillars,
    jobsHeading,
    jobsSubheading,
    jobsCategories,
    jobs[]{
      title,
      category,
      location,
      type,
      experience,
      salary,
      badge,
      description,
      tags
    },
    processHeading,
    processSubheading,
    processSteps,
    perksHeading,
    perksSubheading,
    perks,
    cultureHeading,
    cultureSubheading,
    cultureGallery[]{
      "url": asset->url,
      alt,
      caption
    },
    culturePillars,
    talentHeading,
    talentBody,
    talentEmail,
    faqs,
    metaTitle,
    metaDescription
  }
`;

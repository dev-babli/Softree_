export type SanityBlogPost = {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    publishedAt: string;
    categories?: { title: string; slug: { current: string } }[];
    mainImage?: { asset: { url: string }; alt?: string };
};

export type SanityNavCategory = {
    _id: string;
    title: string;
    slug: { current: string };
    posts: {
        _id: string;
        title: string;
        slug: { current: string };
        excerpt?: string;
    }[];
};

export type SanityNavCaseStudy = {
    _id: string;
    title: string;
    client?: string;
    slug: { current: string };
    excerpt?: string;
    category?: string;
    industry?: string;
    mainImage?: { asset?: { url?: string }; alt?: string };
    mainImageUrl?: string;
};

export type SanityNavCaseStudyCategory = {
    key: string;
    title: string;
    description: string;
    image?: string;
    viewAllUrl: string;
    caseStudies: SanityNavCaseStudy[];
};

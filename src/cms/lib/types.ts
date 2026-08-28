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
    useCase?: string;
    industry?: string;
    mainImage?: { asset?: { url?: string }; alt?: string };
    mainImageUrl?: string;
    clientDetails?: string;
    challenge?: string;
    approach?: string;
    outcome?: string;
    location?: string;
    employees?: string;
    region?: string;
    testimonial?: {
        quote?: string;
        name?: string;
        role?: string;
    };
    highlights?: Array<{ value: string; label: string }>;
};

export type SanityNavCaseStudyLink = {
    key: string;
    label: string;
    description: string;
    href: string;
};

export type SanityNavCaseStudyCategory = {
    key: string;
    title: string;
    description: string;
    links: SanityNavCaseStudyLink[];
};
